import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { StartupStage, StartupStatus } from '../../common/enums';

export type StartupDocument = Startup & Document;

// Separate sub-schema for sector tags (flat, not deeply nested)
@Schema({ _id: false })
class SectorInfo {
  @Prop({ required: true })
  primary: string;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

@Schema({ timestamps: true, collection: 'startups' })
export class Startup {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: SectorInfo, required: true })
  sector: SectorInfo;

  @Prop({ required: true, enum: StartupStage, index: true })
  stage: StartupStage;

  // References to Founders collection — avoid embedding to prevent doc growth
  @Prop({ type: [Types.ObjectId], ref: 'Founder', default: [] })
  founderIds: Types.ObjectId[];

  // References to Users with investor role
  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  assignedInvestorIds: Types.ObjectId[];

  @Prop({ required: true, enum: StartupStatus, default: StartupStatus.ACTIVE, index: true })
  status: StartupStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  createdBy: Types.ObjectId;

  // Cohort year for grouping (e.g. 2024, 2025)
  @Prop({ required: true, index: true })
  cohortYear: number;

  // Reference to the specific Cohort document the startup applied through
  @Prop({ type: Types.ObjectId, ref: 'Cohort', index: true })
  cohortId: Types.ObjectId;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  website: string;

  // Cached latest score — updated by intelligence service, avoids heavy aggregation
  @Prop({ type: Number, default: 0 })
  latestScore: number;

  @Prop({ type: Boolean, default: false })
  isFlagged: boolean;

  @Prop({ type: String })
  flagReason: string;

  // Extended founder-submitted fields
  @Prop({ type: String })
  schemeName: string;

  @Prop({ type: String })
  pitchDeckLink: string;

  @Prop({ type: Date })
  incorporationDate: Date;

  @Prop({ type: String, trim: true })
  cinNumber: string;

  @Prop({ type: Number, min: 0, default: 0 })
  fundingSecured: number;

  @Prop({ type: String })
  fundingScheme: string;

  @Prop({ type: Date })
  dateOfRelease: Date;
}

export const StartupSchema = SchemaFactory.createForClass(Startup);

// Indexes for common query patterns
StartupSchema.index({ status: 1, cohortYear: 1 });
StartupSchema.index({ cohortId: 1 });
StartupSchema.index({ 'sector.primary': 1 });
StartupSchema.index({ latestScore: -1 }); // for ranked listings
StartupSchema.index({ assignedInvestorIds: 1 });
StartupSchema.index({ createdAt: -1 });
