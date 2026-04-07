import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FounderDocument = Founder & Document;

@Schema({ timestamps: true, collection: 'founders' })
export class Founder {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  // Flat array of skill strings — no nesting needed here
  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop({ type: Number, default: 0 })
  yearsOfExperience: number;

  @Prop({ type: String })
  linkedinUrl: string;

  @Prop({ type: String })
  bio: string;

  // Reference to startup — one founder can be in one active startup
  @Prop({ type: Types.ObjectId, ref: 'Startup', index: true })
  startupId: Types.ObjectId;

  @Prop({ type: String })
  contact: string; // phone number

  // Link to User account if founder has platform login
  @Prop({ type: Types.ObjectId, ref: 'User', sparse: true })
  userId: Types.ObjectId;

  // Education as flat fields (no nesting, avoids complex queries)
  @Prop({ type: String })
  educationDegree: string;

  @Prop({ type: String })
  educationInstitution: string;

  @Prop({ type: Number })
  educationYear: number;
}

export const FounderSchema = SchemaFactory.createForClass(Founder);

FounderSchema.index({ startupId: 1 });
FounderSchema.index({ email: 1 });
