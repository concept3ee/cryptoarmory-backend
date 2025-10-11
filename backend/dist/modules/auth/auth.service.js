"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const otp_service_1 = require("./otp.service");
let AuthService = class AuthService {
    constructor(userModel, investmentModel, planConfigModel, jwt, otp) {
        this.userModel = userModel;
        this.investmentModel = investmentModel;
        this.planConfigModel = planConfigModel;
        this.jwt = jwt;
        this.otp = otp;
        this.otpStore = new Map();
    }
    async signup(dto) {
        const existing = await this.userModel.findOne({ email: dto.email });
        if (existing)
            throw new common_1.BadRequestException('Email already in use');
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
    async login(dto) {
        const user = await this.userModel.findOne({ email: dto.email });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const ok = await bcrypt.compare(dto.password, user.passwordHash);
        if (!ok)
            throw new common_1.UnauthorizedException('Invalid credentials');
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
    async sendOtp(email) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        this.otpStore.set(email, code);
        await this.otp.send(email, code);
        const devMode = process.env.OTP_DEV === 'true' || !process.env.SMTP_HOST;
        return { sent: true, ...(devMode ? { devOtp: code } : {}) };
    }
    async verifyOtp(email, otp) {
        const code = this.otpStore.get(email);
        if (!code || code !== otp)
            throw new common_1.BadRequestException('Invalid code');
        await this.userModel.updateOne({ email }, { $set: { emailVerified: true } });
        this.otpStore.delete(email);
        return { verified: true };
    }
    async me(userId) {
        const user = await this.userModel.findById(userId).lean();
        if (!user)
            return {};
        const [itemsRaw, plans] = await Promise.all([
            this.investmentModel.find({ userId }).lean(),
            this.planConfigModel.find().lean(),
        ]);
        const planById = new Map(plans.map((p) => [p.planId, p]));
        const compute = (inv) => {
            const plan = planById.get(inv.planId);
            if (!plan || inv.status !== 'confirmed')
                return { profit: 0 };
            const start = inv.confirmedAt ? new Date(inv.confirmedAt).getTime() : Date.now();
            const now = Date.now();
            const ms = now - start;
            const periodMs = plan.rate === 'daily' ? 24 * 60 * 60 * 1000 : plan.rate === 'weekly' ? 7 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
            const periods = Math.max(0, Math.floor(ms / periodMs));
            const profit = (inv.amount * (plan.percent / 100)) * periods;
            return { profit };
        };
        const items = itemsRaw.map((i) => ({ ...i, ...compute(i) }));
        const totalInvested = items.reduce((s, i) => s + i.amount, 0);
        const activeInvestments = items.filter((i) => i.status === 'confirmed').length;
        const totalProfit = items.reduce((s, i) => s + (i.profit || 0), 0);
        return {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            walletBalance: user.walletBalance || 0,
            totalInvested,
            totalProfit,
            activeInvestments,
            joinDate: user.createdAt,
        };
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const ok = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!ok)
            throw new common_1.UnauthorizedException('Current password is incorrect');
        user.passwordHash = await bcrypt.hash(newPassword, 10);
        await user.save();
        return { changed: true };
    }
    async updateProfile(userId, firstName, lastName) {
        await this.userModel.updateOne({ _id: userId }, { $set: { firstName, lastName } });
        return { updated: true };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)('Investment')),
    __param(2, (0, mongoose_1.InjectModel)('PlanConfig')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        otp_service_1.OtpService])
], AuthService);
//# sourceMappingURL=auth.service.js.map