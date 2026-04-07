import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IntelligenceService } from './intelligence.service';
import { IntelligenceController } from './intelligence.controller';
import { Startup, StartupSchema } from '../startups/startup.schema';
import { Evaluation, EvaluationSchema } from '../evaluations/evaluation.schema';
import { Milestone, MilestoneSchema } from '../milestones/milestone.schema';
import { Financial, FinancialSchema } from '../financials/financial.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Startup.name, schema: StartupSchema },
      { name: Evaluation.name, schema: EvaluationSchema },
      { name: Milestone.name, schema: MilestoneSchema },
      { name: Financial.name, schema: FinancialSchema },
    ]),
  ],
  controllers: [IntelligenceController],
  providers: [IntelligenceService],
  exports: [IntelligenceService],
})
export class IntelligenceModule {}
