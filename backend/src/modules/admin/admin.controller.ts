import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import { AssignRoleDto, CreditWalletDto, SetDepositWalletDto } from './dto';

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
}


