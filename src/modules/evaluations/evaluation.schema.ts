import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EvaluationDocument = Evaluation & Document;

/**
 * 7 evaluation parameters — stored as flat object, not array of sub-docs.
 * This avoids positional array queries and keeps scoring lookups O(1).
 */
@Schema({ _id: false })
class EvaluationScores {
  @Prop({ required: true, min: 0, max: 10 })
  sector: number; // market sector relevance

  @Prop({ required: true, min: 0, max: 10 })
  stage: number; // startup stage appropriateness

  @Prop({ required: true, min: 0, max: 10 })
  founderStrength: number; // team quality

  @Prop({ required: true, min: 0, max: 10 })
  incorporation: number; // legal/structural readiness

  @Prop({ required: true, min: 0, max: 10 })
  problemMarket: number; // problem-market fit clarity

  @Prop({ required: true, min: 0, max: 10 })
  gtm: number; // go-to-market strategy

  @Prop({ required: true, min: 0, max: 10 })
  marketValidation: number; // validation evidence
}

@Schema({ timestamps: true, collection: 'evaluations' })
export class Evaluation {
  @Prop({ type: Types.ObjectId, ref: 'Startup', required: true, index: true })
  startupId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  reviewerId: Types.ObjectId;

  @Prop({ type: EvaluationScores, required: true })
  scores: EvaluationScores;

  // Computed total — stored to avoid recalculation on every read
  @Prop({ required: true, min: 0, max: 70 })
  totalScore: number;

  @Prop({ type: String, maxlength: 2000 })
  notes: string;

  // Reviewer's recommendation
  @Prop({ type: String, enum: ['strongly_recommend', 'recommend', 'neutral', 'not_recommend'] })
  recommendation: string;

  // Version to support re-evaluations over time
  @Prop({ type: Number, default: 1 })
  version: number;
}

export const EvaluationSchema = SchemaFactory.createForClass(Evaluation);

EvaluationSchema.index({ startupId: 1, reviewerId: 1 });
EvaluationSchema.index({ startupId: 1, createdAt: -1 });
EvaluationSchema.index({ totalScore: -1 }); // for leaderboards
// Prevent a reviewer from submitting duplicate evals for same startup+version
EvaluationSchema.index({ startupId: 1, reviewerId: 1, version: 1 }, { unique: true });
