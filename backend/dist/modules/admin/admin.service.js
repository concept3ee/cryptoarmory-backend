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
var AdminService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../auth/schemas/user.schema");
const notification_service_1 = require("../notification/notification.service");
let AdminService = AdminService_1 = class AdminService {
    constructor(userModel, notifications) {
        this.userModel = userModel;
        this.notifications = notifications;
    }
    async creditWallet(admin, userId, amount) {
        if (admin?.role !== 'admin')
            throw new common_1.ForbiddenException('Admin only');
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.ForbiddenException('User not found');
        user.walletBalance = (user.walletBalance || 0) + Math.max(0, amount);
        await user.save();
        await this.notifications.create(user.id, 'Wallet credited', `Your wallet has been credited with $${amount}.`, 'success');
        return { userId: user.id, walletBalance: user.walletBalance };
    }
    async assignRole(admin, userId, role) {
        if (admin?.role !== 'admin')
            throw new common_1.ForbiddenException('Admin only');
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.ForbiddenException('User not found');
        user.role = role;
        await user.save();
        return { userId: user.id, role: user.role };
    }
    async setDepositWallet(admin, walletText) {
        if (admin?.role !== 'admin')
            throw new common_1.ForbiddenException('Admin only');
        AdminService_1.systemConfig.depositWalletText = walletText;
        return { walletText };
    }
    getDepositWallet() {
        return { walletText: AdminService_1.systemConfig.depositWalletText || '' };
    }
};
exports.AdminService = AdminService;
AdminService.systemConfig = {};
exports.AdminService = AdminService = AdminService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notification_service_1.NotificationService])
], AdminService);
//# sourceMappingURL=admin.service.js.map