import { Controller, Post, Get, Patch, Body, Param, Query } from '@nestjs/common';
import { FinancialsService } from './financials.service';
import { CreateFinancialDto, UpdateFinancialStatusDto } from './dto/financial.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/enums';

@Controller('financials')
export class FinancialsController {
  constructor(private financialsService: FinancialsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.FINANCE)
  create(@Body() dto: CreateFinancialDto, @CurrentUser('_id') userId: string) {
    return this.financialsService.create(dto, userId);
  }

  @Get('funded-startups')
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.FINANCE)
  getFundedStartups() {
    return this.financialsService.getFundedStartups();
  }

  @Get('startup/:startupId')
  findByStartup(
    @Param('startupId') startupId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.financialsService.findByStartup(startupId, +page, +limit);
  }

  @Get('startup/:startupId/summary')
  getSummary(@Param('startupId') startupId: string) {
    return this.financialsService.getStartupFinancialSummary(startupId);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.FINANCE)
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateFinancialStatusDto,
    @CurrentUser('_id') userId: string,
    @CurrentUser('role') userRole: UserRole,
  ) {
    return this.financialsService.updateStatus(id, dto, userId, userRole);
  }
}
