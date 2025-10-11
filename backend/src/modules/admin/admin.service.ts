import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private notifications: NotificationService,
  ) {}

  async creditWallet(admin: { sub: string; role?: string }, userId: string, amount: number) {
    if (admin?.role !== 'admin') throw new ForbiddenException('Admin only');
    const user = await this.userModel.findById(userId);
    if (!user) throw new ForbiddenException('User not found');
    user.walletBalance = (user.walletBalance || 0) + Math.max(0, amount);
    await user.save();
    await this.notifications.create(user.id, 'Wallet credited', `Your wallet has been credited with $${amount}.`, 'success');
    return { userId: user.id, walletBalance: user.walletBalance };
  }

  async assignRole(admin: { sub: string; role?: string }, userId: string, role: 'admin' | 'user') {
    if (admin?.role !== 'admin') throw new ForbiddenException('Admin only');
    const user = await this.userModel.findById(userId);
    if (!user) throw new ForbiddenException('User not found');
    user.role = role;
    await user.save();
    return { userId: user.id, role: user.role };
  }

  private static systemConfig: { depositWalletText?: string } = {};

  async setDepositWallet(admin: { sub: string; role?: string }, walletText: string) {
    if (admin?.role !== 'admin') throw new ForbiddenException('Admin only');
    AdminService.systemConfig.depositWalletText = walletText;
    return { walletText };
  }

  getDepositWallet() {
    return { walletText: AdminService.systemConfig.depositWalletText || '' };
  }
}


