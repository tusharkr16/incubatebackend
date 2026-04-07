import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { DisbursementStatus } from '../../common/enums';

export type FinancialDocument = Financial & Document;

/**
 * Each disbursement = ONE document. No nesting, no arrays of transactions.
 * This follows the design rule: avoid embedding large arrays, keep documents small.
 * Enables atomic updates, partial failures don't corrupt the record, and
 * we can paginate/filter individual transactions efficiently.
 */
@Schema({ timestamps: true, collection: 'financials' })
export class Financial {
  @Prop({ type: Types.ObjectId, ref: 'Startup', required: true, index: true })
  startupId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string; // e.g. "Seed Disbursement - Q1 2025"

  @Prop({ required: true, type: Number, min: 0 })
  amount: number;

  @Prop({ required: true, type: String, default: 'INR' })
  currency: string;

  @Prop({ required: true, type: Date, index: true })
  disbursementDate: Date;

  @Prop({ required: true, enum: DisbursementStatus, default: DisbursementStatus.PENDING, index: true })
  status: DisbursementStatus;

  // Who approved this disbursement
  @Prop({ type: Types.ObjectId, ref: 'User' })
  approvedBy: Types.ObjectId;

  @Prop({ type: Date })
  approvedAt: Date;

  // Finance officer who initiated
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  createdBy: Types.ObjectId;

  @Prop({ type: String, maxlength: 500 })
  notes: string;

  // Reference to associated document (e.g. invoice, agreement)
  @Prop({ type: Types.ObjectId, ref: 'Document' })
  documentId: Types.ObjectId;

  // Fund source category for reporting
  @Prop({ type: String, enum: ['government_grant', 'institutional', 'private', 'cohort_fund', 'other'] })
  fundSource: string;
}

export const FinancialSchema = SchemaFactory.createForClass(Financial);

FinancialSchema.index({ startupId: 1, status: 1 });
FinancialSchema.index({ disbursementDate: -1 });
FinancialSchema.index({ startupId: 1, disbursementDate: -1 });
FinancialSchema.index({ createdBy: 1 });
