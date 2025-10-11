import { AuthService } from './auth.service';
import { LoginDto, SignupDto, SendOtpDto, VerifyOtpDto, ChangePasswordDto, UpdateProfileDto } from './dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly auth;
    private jwt;
    constructor(auth: AuthService, jwt: JwtService);
    signup(dto: SignupDto): Promise<any>;
    login(dto: LoginDto): Promise<any>;
    sendOtp(dto: SendOtpDto): Promise<{
        devOtp?: string | undefined;
        sent: boolean;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        verified: boolean;
    }>;
    me(req: any): Promise<{
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
    changePassword(req: any, dto: ChangePasswordDto): Promise<{
        changed: boolean;
    }>;
    updateProfile(req: any, dto: UpdateProfileDto): Promise<{
        updated: boolean;
    }>;
}
