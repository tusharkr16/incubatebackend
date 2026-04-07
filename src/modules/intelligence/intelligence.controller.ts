import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@Controller('intelligence')
export class IntelligenceController {
  constructor(private intelligenceService: IntelligenceService) {}

  @Get('startup/:id/score')
  getScore(@Param('id') id: string) {
    return this.intelligenceService.calculateStartupScore(id);
  }

  @Get('startup/:id/recommendations')
  getRecommendations(@Param('id') id: string) {
    return this.intelligenceService.generateRecommendations(id);
  }

  @Get('cohort-report')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  getCohortReport(@Query('year') year: string) {
    return this.intelligenceService.getCohortReport(+year);
  }

  @Post('risk-scan')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  runRiskScan() {
    return this.intelligenceService.runRiskScan();
  }
}
