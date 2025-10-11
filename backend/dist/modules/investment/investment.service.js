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
exports.InvestmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const investment_schema_1 = require("./schemas/investment.schema");
const planConfig_schema_1 = require("./schemas/planConfig.schema");
const user_schema_1 = require("../auth/schemas/user.schema");
const notification_service_1 = require("../notification/notification.service");
let InvestmentService = class InvestmentService {
    constructor(model, planModel, userModel, notifications) {
        this.model = model;
        this.planModel = planModel;
        this.userModel = userModel;
        this.notifications = notifications;
    }
    async create(userId, planId, amount) {
        const walletUrl = `crypto-wallet://pay/${Math.random().toString(36).slice(2, 11)}`;
        return this.model.create({ userId, planId, amount, status: 'pending', walletUrl });
    }
    async list(userId) {
        const [items, plans] = await Promise.all([
            this.model.find({ userId }).sort({ createdAt: -1 }).lean(),
            this.planModel.find().lean(),
        ]);
        const planById = new Map(plans.map(p => [p.planId, p]));
        return items.map(i => ({ ...i, ...this.computeDerived(i, planById.get(i.planId)) }));
    }
    async approve(id) {
        const inv = await this.model.findByIdAndUpdate(id, { $set: { status: 'confirmed', confirmedAt: new Date() } }, { new: true });
        if (!inv)
            return null;
        const user = await this.userModel.findById(inv.userId);
        if (user) {
            user.walletBalance = (user.walletBalance || 0) + inv.amount;
            await user.save();
            await this.notifications.create(user.id, 'Investment approved', `Your investment of $${inv.amount} has been approved and credited.`, 'success');
        }
        return inv.toObject();
    }
    async upsertPlan(planId, rate, percent) {
        return this.planModel.findOneAndUpdate({ planId }, { $set: { rate, percent } }, { new: true, upsert: true }).lean();
    }
    async getPlans() {
        return this.planModel.find().lean();
    }
    async computeUserSummary(userId) {
        const [itemsRaw, plans] = await Promise.all([
            this.model.find({ userId }).lean(),
            this.planModel.find().lean(),
        ]);
        const planById = new Map(plans.map(p => [p.planId, p]));
        const items = itemsRaw.map(i => ({ ...i, ...this.computeDerived(i, planById.get(i.planId)) }));
        const active = items.filter(i => i.status === 'confirmed');
        const totalInvested = items.reduce((s, i) => s + i.amount, 0);
        const totalProfit = items.reduce((s, i) => s + (i.profit || 0), 0);
        return {
            walletBalance: undefined,
            totalInvested,
            totalProfit,
            activeInvestments: active.length,
            investments: items,
        };
    }
    computeDerived(investment, plan) {
        if (!plan || investment.status !== 'confirmed')
            return { currentValue: investment.amount, profit: 0 };
        const start = investment.confirmedAt ? new Date(investment.confirmedAt).getTime() : Date.now();
        const now = Date.now();
        const ms = now - start;
        const periodMs = plan.rate === 'daily' ? 24 * 60 * 60 * 1000 : plan.rate === 'weekly' ? 7 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
        const periods = Math.max(0, Math.floor(ms / periodMs));
        const autoProfit = (investment.amount * (plan.percent / 100)) * periods;
        const manual = investment.manualProfit || 0;
        const profit = autoProfit + manual;
        const currentValue = investment.amount + profit;
        return { profit, currentValue };
    }
    async attachProof(id, dataUrl) {
        return this.model.findByIdAndUpdate(id, { $set: { proofUrl: dataUrl, status: 'pending' } }, { new: true }).lean();
    }
    async addManualProfit(id, amount) {
        const inv = await this.model.findById(id);
        if (!inv)
            return null;
        inv.manualProfit = (inv.manualProfit || 0) + Math.max(0, amount);
        await inv.save();
        const user = await this.userModel.findById(inv.userId);
        if (user) {
            user.walletBalance = (user.walletBalance || 0) + Math.max(0, amount);
            await user.save();
            await this.notifications.create(user.id, 'Profit credited', `An additional profit of $${amount} was credited to your wallet.`, 'success');
        }
        return inv.toObject();
    }
};
exports.InvestmentService = InvestmentService;
exports.InvestmentService = InvestmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(investment_schema_1.Investment.name)),
    __param(1, (0, mongoose_1.InjectModel)(planConfig_schema_1.PlanConfig.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notification_service_1.NotificationService])
], InvestmentService);
//# sourceMappingURL=investment.service.js.map