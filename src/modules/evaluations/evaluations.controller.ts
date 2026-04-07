import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/evaluation.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/enums';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private evaluationsService: EvaluationsService) {}

  @Post()
  @Roles(UserRole.INVESTOR, UserRole.CEO, UserRole.ADMIN)
  create(@Body() dto: CreateEvaluationDto, @CurrentUser('_id') reviewerId: string) {
    return this.evaluationsService.create(dto, reviewerId);
  }

  @Get('startup/:startupId')
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.INVESTOR, UserRole.FOUNDER)
  findByStartup(@Param('startupId') startupId: string) {
    return this.evaluationsService.findByStartup(startupId);
  }

  @Get('startup/:startupId/aggregate')
  getAggregate(@Param('startupId') startupId: string) {
    return this.evaluationsService.getStartupAggregateScore(startupId);
  }
}
