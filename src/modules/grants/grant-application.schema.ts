import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GrantApplicationStatus } from '../../common/enums';

export type GrantApplicationDocument = GrantApplication & Document;

@Schema({ _id: false })
class GrantStep {
  @Prop({ required: true })
  label: string;

  @Prop({ type: Boolean, default: false })
  completed: boolean;

  @Prop({ type: Date })
  completedAt: Date;
}

@Schema({ timestamps: true, collection: 'grant_applications' })
export class GrantApplication {
  @Prop({ type: Types.ObjectId, ref: 'Startup', required: true, index: true })
  startupId: Types.ObjectId;

  /** Static grant identifier matching frontend GRANTS data */
  @Prop({ required: true, trim: true })
  grantId: string;

  @Prop({ required: true })
  grantName: string;

  @Prop({
    required: true,
    enum: GrantApplicationStatus,
    default: GrantApplicationStatus.INTERESTED,
    index: true,
  })
  status: GrantApplicationStatus;

  @Prop({ type: [GrantStep], default: [] })
  steps: GrantStep[];

  @Prop({ type: String, maxlength: 2000 })
  notes: string;

  @Prop({ type: Date })
  submittedAt: Date;
}

export const GrantApplicationSchema = SchemaFactory.createForClass(GrantApplication);
GrantApplicationSchema.index({ startupId: 1, grantId: 1 }, { unique: true });
GrantApplicationSchema.index({ startupId: 1, createdAt: -1 });
