import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { NotificationService } from '../notification/notification.service';
import { Investment, InvestmentDocument } from '../investment/schemas/investment.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Investment.name) private investmentModel: Model<InvestmentDocument>,
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

  async getPendingInvestments(admin: { sub: string; role?: string }) {
    if (admin?.role !== 'admin') throw new ForbiddenException('Admin only');
    return this.investmentModel.find({ status: 'pending' }).populate('userId', 'email firstName lastName').lean();
  }

  async approveInvestment(admin: { sub: string; role?: string }, investmentId: string) {
    if (admin?.role !== 'admin') throw new ForbiddenException('Admin only');
    
    const investment = await this.investmentModel.findById(investmentId).populate('userId');
    if (!investment) throw new ForbiddenException('Investment not found');
    
    // Update investment status
    investment.status = 'active';
    await investment.save();
    
    // Credit user's wallet
    const user = await this.userModel.findById(investment.userId);
    if (user) {
      user.walletBalance = (user.walletBalance || 0) + investment.amount;
      await user.save();
    }
    
    // Send email notification
    const userId = typeof investment.userId === 'object' ? (investment.userId as any)._id : investment.userId;
    await this.notifications.create(
      userId,
      'Payment Approved',
      `Your investment of $${investment.amount} has been approved and credited to your wallet.`,
      'success'
    );
    
    return { investmentId, status: 'approved', walletBalance: user?.walletBalance };
  }

  async rejectInvestment(admin: { sub: string; role?: string }, investmentId: string, reason?: string) {
    if (admin?.role !== 'admin') throw new ForbiddenException('Admin only');
    
    const investment = await this.investmentModel.findById(investmentId).populate('userId');
    if (!investment) throw new ForbiddenException('Investment not found');
    
    // Update investment status
    investment.status = 'rejected';
    await investment.save();
    
    // Send email notification
    const userId = typeof investment.userId === 'object' ? (investment.userId as any)._id : investment.userId;
    await this.notifications.create(
      userId,
      'Payment Rejected',
      `Your investment of $${investment.amount} has been rejected. ${reason ? `Reason: ${reason}` : ''}`,
      'warning'
    );
    
    return { investmentId, status: 'rejected' };
  }

  async getAllUsers(admin: { sub: string; role?: string }) {
    if (admin?.role !== 'admin') throw new ForbiddenException('Admin only');
    return this.userModel.find({}, 'email firstName lastName walletBalance role createdAt').lean();
  }

  async getUserDetails(admin: { sub: string; role?: string }, userId: string) {
    if (admin?.role !== 'admin') throw new ForbiddenException('Admin only');
    
    const user = await this.userModel.findById(userId).lean();
    if (!user) throw new ForbiddenException('User not found');
    
    // Get user's investments with details
    const investments = await this.investmentModel.find({ userId }).lean();
    
    // Calculate investment statistics
    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const activeInvestments = investments.filter(inv => inv.status === 'confirmed').length;
    const pendingInvestments = investments.filter(inv => inv.status === 'pending').length;
    const rejectedInvestments = investments.filter(inv => inv.status === 'rejected').length;
    const totalProfit = investments.reduce((sum, inv) => sum + (inv.profit || 0), 0);
    
    return {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        walletBalance: user.walletBalance || 0,
        role: user.role,
        emailVerified: user.emailVerified || false,
        createdAt: (user as any).createdAt,
        updatedAt: (user as any).updatedAt
      },
      investments: {
        total: investments.length,
        totalInvested,
        totalProfit,
        active: activeInvestments,
        pending: pendingInvestments,
        rejected: rejectedInvestments,
        details: investments.map(inv => ({
          id: inv._id,
          planId: inv.planId,
          amount: inv.amount,
          status: inv.status,
          profit: inv.profit || 0,
          createdAt: (inv as any).createdAt,
          confirmedAt: (inv as any).confirmedAt
        }))
      }
    };
  }

  async fundUserWallet(admin: { sub: string; role?: string }, userId: string, amount: number) {
    if (admin?.role !== 'admin') throw new ForbiddenException('Admin only');
    
    const user = await this.userModel.findById(userId);
    if (!user) throw new ForbiddenException('User not found');
    
    user.walletBalance = (user.walletBalance || 0) + amount;
    await user.save();
    
    // Send notification to user
    await this.notifications.create(
      user.id,
      'Wallet Funded',
      `Your wallet has been funded with $${amount}. New balance: $${user.walletBalance}`,
      'success'
    );
    
    return { 
      userId: user.id, 
      email: user.email,
      walletBalance: user.walletBalance,
      fundedAmount: amount
    };
  }

  async addProfitToInvestment(admin: { sub: string; role?: string }, investmentId: string, profitAmount: number) {
    if (admin?.role !== 'admin') throw new ForbiddenException('Admin only');
    
    const investment = await this.investmentModel.findById(investmentId).populate('userId');
    if (!investment) throw new ForbiddenException('Investment not found');
    
    // Add profit to investment
    investment.profit = (investment.profit || 0) + profitAmount;
    await investment.save();
    
    // Credit user's wallet with profit
    const user = await this.userModel.findById(investment.userId);
    if (user) {
      user.walletBalance = (user.walletBalance || 0) + profitAmount;
      await user.save();
    }
    
    // Send notification to user
    const userId = typeof investment.userId === 'object' ? (investment.userId as any)._id : investment.userId;
    await this.notifications.create(
      userId,
      'Investment Profit Added',
      `Profit of $${profitAmount} has been added to your investment. Total profit: $${investment.profit}`,
      'success'
    );
    
    return { 
      investmentId, 
      profitAmount, 
      totalProfit: investment.profit,
      userWalletBalance: user?.walletBalance
    };
  }
}


