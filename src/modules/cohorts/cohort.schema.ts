import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CohortDocument = Cohort & Document;

export enum CohortStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  CLOSED = 'closed',
}

@Schema({ timestamps: true, collection: 'cohorts' })
export class Cohort {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, index: true })
  year: number;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  tagline: string;

  @Prop({ type: [String], default: [] })
  sectors: string[];

  @Prop({ type: Date })
  applicationDeadline: Date;

  @Prop({ type: Number, default: 20 })
  maxStartups: number;

  @Prop({ type: String })
  googleFormUrl: string;

  @Prop({ type: String })
  googleFormId: string;

  // Maps field name → Google Forms question ID (used for response parsing)
  @Prop({ type: Map, of: String, default: {} })
  googleFormQuestionIds: Map<string, string>;

  // Tracks which Google Form response IDs have already been synced
  @Prop({ type: [String], default: [] })
  syncedResponseIds: string[];

  @Prop({ required: true, enum: CohortStatus, default: CohortStatus.OPEN })
  status: CohortStatus;

  // AI-generated poster stored on Cloudinary
  @Prop({ type: String })
  posterUrl: string;

  @Prop({ type: String })
  posterSource: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  createdBy: Types.ObjectId;
}

export const CohortSchema = SchemaFactory.createForClass(Cohort);
CohortSchema.index({ year: -1, status: 1 });
