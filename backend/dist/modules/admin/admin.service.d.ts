import { Model } from 'mongoose';
import { UserDocument } from '../auth/schemas/user.schema';
import { NotificationService } from '../notification/notification.service';
export declare class AdminService {
    private userModel;
    private notifications;
    constructor(userModel: Model<UserDocument>, notifications: NotificationService);
    creditWallet(admin: {
        sub: string;
        role?: string;
    }, userId: string, amount: number): Promise<{
        userId: any;
        walletBalance: number;
    }>;
    assignRole(admin: {
        sub: string;
        role?: string;
    }, userId: string, role: 'admin' | 'user'): Promise<{
        userId: any;
        role: string;
    }>;
    private static systemConfig;
    setDepositWallet(admin: {
        sub: string;
        role?: string;
    }, walletText: string): Promise<{
        walletText: string;
    }>;
    getDepositWallet(): {
        walletText: string;
    };
}
