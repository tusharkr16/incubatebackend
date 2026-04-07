import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Cohort, CohortSchema } from './cohort.schema';
import { Startup, StartupSchema } from '../startups/startup.schema';
import { Founder, FounderSchema } from '../founders/founder.schema';
import { CohortController } from './cohort.controller';
import { CohortService } from './cohort.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Cohort.name, schema: CohortSchema },
      { name: Startup.name, schema: StartupSchema },
      { name: Founder.name, schema: FounderSchema },
    ]),
  ],
  controllers: [CohortController],
  providers: [CohortService],
  exports: [CohortService],
})
export class CohortModule {}
