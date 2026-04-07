import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MilestoneStatus } from '../../common/enums';

export type MilestoneDocument = Milestone & Document;

@Schema({ timestamps: true, collection: 'milestones' })
export class Milestone {
  @Prop({ type: Types.ObjectId, ref: 'Startup', required: true, index: true })
  startupId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ type: String, maxlength: 1000 })
  description: string;

  @Prop({ required: true, enum: MilestoneStatus, default: MilestoneStatus.PENDING, index: true })
  status: MilestoneStatus;

  @Prop({ required: true, type: Date, index: true })
  deadline: Date;

  // 0-100 percentage (stored as int for efficiency)
  @Prop({ type: Number, default: 0, min: 0, max: 100 })
  progressPercent: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  // Last user to update this milestone
  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;

  // Flag without penalizing score — from brainstorm: non-destructive penalties
  @Prop({ type: Boolean, default: false })
  isDelayed: boolean;

  @Prop({ type: String })
  delayReason: string;

  @Prop({ type: Date })
  completedAt: Date;
}

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);

MilestoneSchema.index({ startupId: 1, status: 1 });
MilestoneSchema.index({ deadline: 1 });
MilestoneSchema.index({ startupId: 1, deadline: 1 });
