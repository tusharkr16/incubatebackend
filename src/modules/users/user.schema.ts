import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '../../common/enums';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  email: string;

  @Prop({ required: true, select: false }) // never returned in queries by default
  password: string;

  @Prop({ required: true, enum: UserRole, index: true })
  role: UserRole;

  // Reference to organization (future multi-tenant support)
  @Prop({ type: Types.ObjectId, ref: 'Organization', index: true })
  organizationId: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Date })
  lastLoginAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Compound index for org-scoped user queries
UserSchema.index({ organizationId: 1, role: 1 });
UserSchema.index({ email: 1 }, { unique: true });
