import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BudgetEntryDocument = BudgetEntry & Document;

export type BudgetCategory = 'recurring' | 'training' | 'administrative' | 'travel' | 'capax';

@Schema({ timestamps: true, collection: 'budget_entries' })
export class BudgetEntry {
  @Prop({ type: Types.ObjectId, ref: 'Startup', required: true, index: true })
  startupId: Types.ObjectId;

  /** Unique identifier for each line item within a startup (e.g. "1"–"25" for fixed items, UUID for CAPAX custom rows) */
  @Prop({ type: String, required: true, trim: true })
  itemKey: string;

  @Prop({ type: String, enum: ['recurring', 'training', 'administrative', 'travel', 'capax'], required: true, index: true })
  category: BudgetCategory;

  /** 1 | 2 | 3 — 0 for CAPAX items with no fixed year */
  @Prop({ type: Number, enum: [0, 1, 2, 3], default: 0 })
  year: number;

  @Prop({ type: String, required: true, trim: true, maxlength: 300 })
  description: string;

  @Prop({ type: Number, min: 0, default: 0 })
  budgetAmount: number;

  @Prop({ type: Number, min: 0, default: 0 })
  spentAmount: number;

  @Prop({ type: String, maxlength: 1000, default: '' })
  comment: string;

  @Prop({ type: String, maxlength: 800, default: '' })
  invoiceUrl: string;

  @Prop({ type: String, maxlength: 300, default: '' })
  invoiceFileName: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}

export const BudgetEntrySchema = SchemaFactory.createForClass(BudgetEntry);

BudgetEntrySchema.index({ startupId: 1, itemKey: 1 }, { unique: true });
BudgetEntrySchema.index({ startupId: 1, category: 1 });
