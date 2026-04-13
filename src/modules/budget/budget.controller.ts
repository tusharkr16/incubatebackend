import {
  Controller, Get, Put, Post, Delete, Body, Param,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { UpsertBudgetEntryDto, UploadInvoiceDto } from './dto/budget.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get('startup/:startupId')
  getByStartup(@Param('startupId') startupId: string) {
    return this.budgetService.getByStartup(startupId);
  }

  @Get('startup/:startupId/summary')
  getSummary(@Param('startupId') startupId: string) {
    return this.budgetService.getSummary(startupId);
  }

  @Put('startup/:startupId/:itemKey')
  upsert(
    @Param('startupId') startupId: string,
    @Param('itemKey') itemKey: string,
    @Body() dto: UpsertBudgetEntryDto,
    @CurrentUser('_id') userId: string,
  ) {
    return this.budgetService.upsert(startupId, itemKey, dto, userId);
  }

  @Post('startup/:startupId/:itemKey/invoice')
  uploadInvoice(
    @Param('startupId') startupId: string,
    @Param('itemKey') itemKey: string,
    @Body() dto: UploadInvoiceDto,
    @CurrentUser('_id') userId: string,
  ) {
    return this.budgetService.uploadInvoice(startupId, itemKey, dto, userId);
  }

  @Delete('startup/:startupId/:itemKey/invoice')
  removeInvoice(
    @Param('startupId') startupId: string,
    @Param('itemKey') itemKey: string,
    @CurrentUser('_id') userId: string,
  ) {
    return this.budgetService.removeInvoice(startupId, itemKey, userId);
  }

  @Delete('startup/:startupId/:itemKey')
  deleteEntry(
    @Param('startupId') startupId: string,
    @Param('itemKey') itemKey: string,
  ) {
    return this.budgetService.deleteEntry(startupId, itemKey);
  }
}
