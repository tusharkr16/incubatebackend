import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StartupAssignmentDocument = StartupAssignment & Document;

@Schema({ timestamps: true, collection: 'am_assignments' })
export class StartupAssignment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  accountManagerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Startup', required: true, index: true })
  startupId: Types.ObjectId;

  @Prop({ type: String, maxlength: 500 })
  notes: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const StartupAssignmentSchema = SchemaFactory.createForClass(StartupAssignment);
StartupAssignmentSchema.index({ accountManagerId: 1, startupId: 1 }, { unique: true });
