import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FundingInterest, FundingInterestSchema } from './funding-interest.schema';
import { FundingInterestsService } from './funding-interests.service';
import { FundingInterestsController } from './funding-interests.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FundingInterest.name, schema: FundingInterestSchema },
    ]),
  ],
  controllers: [FundingInterestsController],
  providers: [FundingInterestsService],
  exports: [FundingInterestsService],
})
export class FundingInterestsModule {}
