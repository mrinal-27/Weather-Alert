import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
  })
  name!: string;

  @Prop({
    required: true,
    unique: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  provider!: string;

  @Prop({
    required: true,
  })
  providerId!: string;

  @Prop({
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status!: UserStatus;

  @Prop({
    default: null,
  })
  telegramChatId?: string;

  @Prop({
    default: null,
  })
  telegramLinkCode?: string;

  @Prop({
    default: null,
  })
  telegramLinkCodeExpiry?: Date;

  @Prop({
    default: false,
  })
  isAdmin!: boolean;
}

export const UserSchema =
  SchemaFactory.createForClass(User);