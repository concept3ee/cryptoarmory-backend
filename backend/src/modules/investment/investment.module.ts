import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';
import { Investment, InvestmentSchema } from './schemas/investment.schema';
import { JwtModule } from '@nestjs/jwt';
import { PlanConfig, PlanConfigSchema } from './schemas/planConfig.schema';
import { User, UserSchema } from '../auth/schemas/user.schema';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET || 'dev-secret' }),
    MongooseModule.forFeature([
      { name: Investment.name, schema: InvestmentSchema },
      { name: PlanConfig.name, schema: PlanConfigSchema },
      { name: User.name, schema: UserSchema },
    ]),
    NotificationModule,
  ],
  controllers: [InvestmentController],
  providers: [InvestmentService],
})
export class InvestmentModule {}



