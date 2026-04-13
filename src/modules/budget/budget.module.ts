import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { BudgetEntry, BudgetEntrySchema } from './budget-entry.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: BudgetEntry.name, schema: BudgetEntrySchema }]),
  ],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
