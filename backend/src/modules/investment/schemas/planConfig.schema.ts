import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlanConfigDocument = HydratedDocument<PlanConfig>;

export type PlanId = 'starter' | 'premium' | 'elite';
export type RateType = 'daily' | 'weekly' | 'monthly';

@Schema({ timestamps: true })
export class PlanConfig {
  @Prop({ required: true, enum: ['starter', 'premium', 'elite'], unique: true })
  planId!: PlanId;

  @Prop({ required: true, enum: ['daily', 'weekly', 'monthly'] })
  rate!: RateType;

  @Prop({ required: true, min: 0 })
  percent!: number; // percent per period (simple interest)
}

export const PlanConfigSchema = SchemaFactory.createForClass(PlanConfig);


