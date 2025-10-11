import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { WithdrawDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Withdrawal, WithdrawalDocument } from './withdrawal.schema';

@ApiTags('transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private jwt: JwtService, @InjectModel(Withdrawal.name) private model: Model<WithdrawalDocument>) {}

  @Post('withdraw')
  withdraw(@Req() req: any, @Body() body: WithdrawDto) {
    const auth = req.headers.authorization || '';
    const token = auth.replace('Bearer ', '');
    const payload = this.jwt.decode(token) as any;
    return this.model.create({
      userId: payload?.sub,
      amount: body.amount,
      accountNumber: body.accountNumber,
      bankName: body.bankName,
      recipientName: body.recipientName,
      walletAddress: body.walletAddress,
      status: 'received',
    });
  }

  @Get('withdrawals')
  list(@Req() req: any) {
    const auth = req.headers.authorization || '';
    const token = auth.replace('Bearer ', '');
    const payload = this.jwt.decode(token) as any;
    return this.model.find({ userId: payload?.sub }).sort({ createdAt: -1 }).lean();
  }
}



