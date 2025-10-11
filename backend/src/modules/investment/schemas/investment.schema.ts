import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvestmentDocument = HydratedDocument<Investment>;

@Schema({ timestamps: true })
export class Investment {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  planId!: string; // starter/premium/elite/custom

  @Prop({ required: true })
  amount!: number;

  @Prop({ default: 'pending', enum: ['pending', 'confirmed', 'completed'] })
  status!: string;

  @Prop()
  confirmedAt?: Date;

  @Prop()
  walletUrl?: string;

  @Prop()
  proofUrl?: string;

  @Prop({ default: 0 })
  manualProfit?: number;
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);


