import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from './otp.service';
export declare class AuthService {
    private userModel;
    private investmentModel;
    private planConfigModel;
    private jwt;
    private otp;
    private otpStore;
    constructor(userModel: Model<UserDocument>, investmentModel: Model<any>, planConfigModel: Model<any>, jwt: JwtService, otp: OtpService);
    signup(dto: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }): Promise<{
        token: string;
        user: {
            id: any;
            email: string;
            firstName: string;
            lastName: string;
            role: string | undefined;
            walletBalance: number;
            emailVerified: boolean;
        };
    }>;
    login(dto: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        user: {
            id: any;
            email: string;
            firstName: string;
            lastName: string;
            role: string | undefined;
            walletBalance: number;
            emailVerified: boolean;
        };
    }>;
    sendOtp(email: string): Promise<{
        devOtp?: string | undefined;
        sent: boolean;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        verified: boolean;
    }>;
    me(userId: string): Promise<{
        id?: undefined;
        email?: undefined;
        firstName?: undefined;
        lastName?: undefined;
        walletBalance?: undefined;
        totalInvested?: undefined;
        totalProfit?: undefined;
        activeInvestments?: undefined;
        joinDate?: undefined;
    } | {
        id: import("mongoose").Types.ObjectId;
        email: string;
        firstName: string;
        lastName: string;
        walletBalance: number;
        totalInvested: any;
        totalProfit: any;
        activeInvestments: number;
        joinDate: any;
    }>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        changed: boolean;
    }>;
    updateProfile(userId: string, firstName: string, lastName: string): Promise<{
        updated: boolean;
    }>;
}
