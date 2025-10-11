import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Withdrawal, WithdrawalSchema } from './withdrawal.schema';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET || 'dev-secret' }),
    MongooseModule.forFeature([{ name: Withdrawal.name, schema: WithdrawalSchema }]),
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule {}



