import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WithdrawalDocument = HydratedDocument<Withdrawal>;

@Schema({ timestamps: true })
export class Withdrawal {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  amount!: number;

  @Prop({ required: true })
  accountNumber!: string;

  @Prop({ required: true })
  bankName!: string;

  @Prop({ required: true })
  recipientName!: string;

  @Prop()
  walletAddress?: string;

  @Prop({ default: 'received', enum: ['received', 'processing', 'paid', 'rejected'] })
  status!: string;
}

export const WithdrawalSchema = SchemaFactory.createForClass(Withdrawal);


