import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  passwordHash!: string;

  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ default: false })
  emailVerified!: boolean;

  @Prop({ default: 0 })
  walletBalance?: number;

  @Prop({ default: 'user', enum: ['user', 'admin'] })
  role?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);


