import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import { AssignRoleDto, CreditWalletDto, SetDepositWalletDto } from './dto';
export declare class AdminController {
    private readonly service;
    private jwt;
    constructor(service: AdminService, jwt: JwtService);
    private adminFromReq;
    credit(req: any, body: CreditWalletDto): Promise<{
        userId: any;
        walletBalance: number;
    }>;
    assign(req: any, body: AssignRoleDto): Promise<{
        userId: any;
        role: string;
    }>;
    setDepositWallet(req: any, body: SetDepositWalletDto): Promise<{
        walletText: string;
    }>;
    getDepositWallet(): {
        walletText: string;
    };
}
