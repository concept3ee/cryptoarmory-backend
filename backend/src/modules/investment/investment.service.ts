import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Investment, InvestmentDocument } from './schemas/investment.schema';
import { PlanConfig, PlanConfigDocument, RateType } from './schemas/planConfig.schema';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectModel(Investment.name) private model: Model<InvestmentDocument>,
    @InjectModel(PlanConfig.name) private planModel: Model<PlanConfigDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private notifications: NotificationService,
  ) {}

  async create(userId: string, planId: string, amount: number) {
    const walletUrl = `link.trustwallet.com/send?address=bc1quncrdcf7c2m77vmnrjgfyyv2ppljvu6wqr0t2p&asset=c0`;
    return this.model.create({ userId, planId, amount, status: 'pending', walletUrl });
  }

  async list(userId: string) {
    const [items, plans] = await Promise.all([
      this.model.find({ userId }).sort({ createdAt: -1 }).lean(),
      this.planModel.find().lean(),
    ]);
    const planById = new Map<string, { rate: RateType; percent: number }>(plans.map(p => [p.planId, p] as const));
    return items.map(i => ({ ...i, ...this.computeDerived(i, planById.get(i.planId as any)) }));
  }

  async approve(id: string) {
    const inv = await this.model.findByIdAndUpdate(
      id,
      { $set: { status: 'confirmed', confirmedAt: new Date() } },
      { new: true }
    );
    if (!inv) return null;
    const user = await this.userModel.findById(inv.userId);
    if (user) {
      user.walletBalance = (user.walletBalance || 0) + inv.amount;
      await user.save();
      await this.notifications.create(user.id, 'Investment approved', `Your investment of $${inv.amount} has been approved and credited.`, 'success');
    }
    return inv.toObject();
  }

  async upsertPlan(planId: 'starter' | 'premium' | 'elite', rate: RateType, percent: number) {
    return this.planModel.findOneAndUpdate(
      { planId },
      { $set: { rate, percent } },
      { new: true, upsert: true }
    ).lean();
  }

  async getPlans() {
    return this.planModel.find().lean();
  }

  async computeUserSummary(userId: string) {
    const [itemsRaw, plans] = await Promise.all([
      this.model.find({ userId }).lean(),
      this.planModel.find().lean(),
    ]);
    const planById = new Map<string, { rate: RateType; percent: number }>(plans.map(p => [p.planId, p] as const));
    const items = itemsRaw.map(i => ({ ...i, ...this.computeDerived(i, planById.get(i.planId as any)) }));
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

  private computeDerived(investment: any, plan?: { rate: RateType; percent: number } | undefined) {
    if (!plan || investment.status !== 'confirmed') return { currentValue: investment.amount, profit: 0 };
    const start = investment.confirmedAt ? new Date(investment.confirmedAt).getTime() : Date.now();
    const now = Date.now();
    const ms = now - start;
    const periodMs = plan.rate === 'daily' ? 24*60*60*1000 : plan.rate === 'weekly' ? 7*24*60*60*1000 : 30*24*60*60*1000;
    const periods = Math.max(0, Math.floor(ms / periodMs));
    const autoProfit = (investment.amount * (plan.percent / 100)) * periods;
    const manual = investment.manualProfit || 0;
    const profit = autoProfit + manual;
    const currentValue = investment.amount + profit;
    return { profit, currentValue };
  }

  async attachProof(id: string, dataUrl?: string) {
    return this.model.findByIdAndUpdate(id, { $set: { proofUrl: dataUrl, status: 'pending' } }, { new: true }).lean();
  }

  async addManualProfit(id: string, amount: number) {
    const inv = await this.model.findById(id);
    if (!inv) return null;
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
}



