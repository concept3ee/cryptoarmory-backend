import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  private otpStore = new Map<string, string>(); // email -> otp (in-memory)

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel('Investment') private investmentModel: Model<any>,
    @InjectModel('PlanConfig') private planConfigModel: Model<any>,
    private jwt: JwtService,
    private otp: OtpService,
  ) {}

  async signup(dto: { email: string; password: string; firstName: string; lastName: string }) {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) throw new BadRequestException('Email already in use');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({ ...dto, passwordHash });
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email, role: user.role });
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        walletBalance: user.walletBalance || 0,
        emailVerified: user.emailVerified || false,
      },
    };
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email, role: user.role });
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        walletBalance: user.walletBalance || 0,
        emailVerified: user.emailVerified || false,
      },
    };
  }

  async sendOtp(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpStore.set(email, code);
    await this.otp.send(email, code);
    const devMode = process.env.OTP_DEV === 'true' || !process.env.SMTP_HOST;
    return { sent: true, ...(devMode ? { devOtp: code } : {}) };
  }

  async verifyOtp(email: string, otp: string) {
    const code = this.otpStore.get(email);
    if (!code || code !== otp) throw new BadRequestException('Invalid code');
    await this.userModel.updateOne({ email }, { $set: { emailVerified: true } });
    this.otpStore.delete(email);
    return { verified: true };
  }

  async me(userId: string) {
    const user = await this.userModel.findById(userId).lean();
    if (!user) return {};
    // Aggregate user investments to compute totals with plan accrual
    const [itemsRaw, plans] = await Promise.all([
      this.investmentModel.find({ userId }).lean(),
      this.planConfigModel.find().lean(),
    ]);
    const planById = new Map(plans.map((p: any) => [p.planId, p] as const));
    const compute = (inv: any) => {
      const plan = planById.get(inv.planId);
      if (!plan || inv.status !== 'confirmed') return { profit: 0 };
      const start = inv.confirmedAt ? new Date(inv.confirmedAt).getTime() : Date.now();
      const now = Date.now();
      const ms = now - start;
      const periodMs = plan.rate === 'daily' ? 24*60*60*1000 : plan.rate === 'weekly' ? 7*24*60*60*1000 : 30*24*60*60*1000;
      const periods = Math.max(0, Math.floor(ms / periodMs));
      const profit = (inv.amount * (plan.percent / 100)) * periods;
      return { profit };
    };
    const items = itemsRaw.map((i: any) => ({ ...i, ...compute(i) }));
    const totalInvested = items.reduce((s: number, i: any) => s + i.amount, 0);
    const activeInvestments = items.filter((i: any) => i.status === 'confirmed').length;
    const totalProfit = items.reduce((s: number, i: any) => s + (i.profit || 0), 0);
    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      walletBalance: user.walletBalance || 0,
      totalInvested,
      totalProfit,
      activeInvestments,
      joinDate: (user as any).createdAt,
    };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    const ok = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Current password is incorrect');
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    return { changed: true };
  }

  async updateProfile(userId: string, firstName: string, lastName: string) {
    await this.userModel.updateOne({ _id: userId }, { $set: { firstName, lastName } });
    return { updated: true };
  }
}


