import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AmReviewDocument = AmReview & Document;

@Schema({ timestamps: true, collection: 'am_reviews' })
export class AmReview {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  accountManagerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Startup', required: true, index: true })
  startupId: Types.ObjectId;

  @Prop({ required: true, enum: ['insight', 'evaluation', 'recommendation', 'risk', 'general'], default: 'general' })
  category: string;

  @Prop({ required: true, maxlength: 3000 })
  content: string;

  @Prop({ type: Number, min: 1, max: 10 })
  rating: number;

  @Prop({ type: Boolean, default: true })
  visibleToFounder: boolean;
}

export const AmReviewSchema = SchemaFactory.createForClass(AmReview);
AmReviewSchema.index({ startupId: 1, createdAt: -1 });
