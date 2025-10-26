import { Body, Controller, Get, Post, Req, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import { AssignRoleDto, CreditWalletDto, SetDepositWalletDto, FundWalletDto, AddProfitDto } from './dto';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService, private jwt: JwtService) {}

  private adminFromReq(req: any) {
    const auth = req.headers.authorization || '';
    const token = auth.replace('Bearer ', '');
    const payload = this.jwt.decode(token) as any;
    return payload || {};
  }

  @Post('credit-wallet')
  credit(@Req() req: any, @Body() body: CreditWalletDto) {
    const admin = this.adminFromReq(req);
    return this.service.creditWallet(admin, body.userId, body.amount);
  }

  @Post('assign-role')
  assign(@Req() req: any, @Body() body: AssignRoleDto) {
    const admin = this.adminFromReq(req);
    return this.service.assignRole(admin, body.userId, body.role);
  }

  @Post('deposit-wallet')
  setDepositWallet(@Req() req: any, @Body() body: SetDepositWalletDto) {
    const admin = this.adminFromReq(req);
    return this.service.setDepositWallet(admin, body.walletText);
  }

  @Get('deposit-wallet')
  getDepositWallet() {
    return this.service.getDepositWallet();
  }

  @Get('pending-investments')
  getPendingInvestments(@Req() req: any) {
    const admin = this.adminFromReq(req);
    return this.service.getPendingInvestments(admin);
  }

  @Post('approve-investment')
  approveInvestment(@Req() req: any, @Body() body: { investmentId: string }) {
    const admin = this.adminFromReq(req);
    return this.service.approveInvestment(admin, body.investmentId);
  }

  @Post('reject-investment')
  rejectInvestment(@Req() req: any, @Body() body: { investmentId: string; reason?: string }) {
    const admin = this.adminFromReq(req);
    return this.service.rejectInvestment(admin, body.investmentId, body.reason);
  }

  @Get('users')
  getAllUsers(@Req() req: any) {
    const admin = this.adminFromReq(req);
    return this.service.getAllUsers(admin);
  }

  @Get('users/:userId')
  getUserDetails(@Req() req: any, @Param('userId') userId: string) {
    const admin = this.adminFromReq(req);
    return this.service.getUserDetails(admin, userId);
  }

  @Post('fund-wallet')
  fundUserWallet(@Req() req: any, @Body() body: FundWalletDto) {
    const admin = this.adminFromReq(req);
    return this.service.fundUserWallet(admin, body.userId, body.amount);
  }

  @Post('add-profit')
  addProfitToInvestment(@Req() req: any, @Body() body: AddProfitDto) {
    const admin = this.adminFromReq(req);
    return this.service.addProfitToInvestment(admin, body.investmentId, body.profitAmount);
  }
}


