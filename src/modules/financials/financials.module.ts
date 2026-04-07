import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Financial, FinancialSchema } from './financial.schema';
import { FinancialsService } from './financials.service';
import { FinancialsController } from './financials.controller';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Financial.name, schema: FinancialSchema }]),
    AuditModule,
  ],
  controllers: [FinancialsController],
  providers: [FinancialsService],
  exports: [FinancialsService],
})
export class FinancialsModule {}
