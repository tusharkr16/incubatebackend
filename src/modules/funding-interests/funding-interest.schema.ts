import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FundingInterestStatus } from '../../common/enums';

export type FundingInterestDocument = FundingInterest & Document;

@Schema({ timestamps: true, collection: 'funding_interests' })
export class FundingInterest {
  @Prop({ type: Types.ObjectId, ref: 'Startup', required: true, index: true })
  startupId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  investorId: Types.ObjectId;

  /** Amount the investor wishes to commit */
  @Prop({ required: true, type: Number, min: 1 })
  amount: number;

  @Prop({ type: String, default: 'INR' })
  currency: string;

  @Prop({ type: String, maxlength: 1000 })
  message: string;

  @Prop({
    required: true,
    enum: FundingInterestStatus,
    default: FundingInterestStatus.PENDING,
    index: true,
  })
  status: FundingInterestStatus;
}

export const FundingInterestSchema = SchemaFactory.createForClass(FundingInterest);
FundingInterestSchema.index({ startupId: 1, investorId: 1 }, { unique: true });
FundingInterestSchema.index({ investorId: 1, createdAt: -1 });
