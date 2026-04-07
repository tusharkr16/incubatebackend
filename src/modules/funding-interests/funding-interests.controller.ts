import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { FundingInterestsService } from './funding-interests.service';
import { CreateFundingInterestDto, UpdateFundingInterestDto } from './dto/funding-interest.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/enums';

@Controller('funding-interests')
export class FundingInterestsController {
  constructor(private service: FundingInterestsService) {}

  /** Investor expresses or updates interest in a startup */
  @Post()
  @Roles(UserRole.INVESTOR)
  create(
    @Body() dto: CreateFundingInterestDto,
    @CurrentUser('_id') investorId: string,
  ) {
    return this.service.create(dto, investorId);
  }

  /** Aggregated summary of all startups with investor interest — investor evaluate page */
  @Get('summary')
  @Roles(UserRole.INVESTOR, UserRole.ADMIN, UserRole.CEO)
  getSummary() {
    return this.service.getSummaryByStartup();
  }

  /** All interests submitted by the calling investor */
  @Get('my')
  @Roles(UserRole.INVESTOR)
  getMyInterests(@CurrentUser('_id') investorId: string) {
    return this.service.getMyInterests(investorId);
  }

  /** All interests for a specific startup */
  @Get('startup/:startupId')
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.FOUNDER, UserRole.INVESTOR)
  getByStartup(@Param('startupId') startupId: string) {
    return this.service.getByStartup(startupId);
  }

  /** Accept or reject an interest record */
  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.FOUNDER)
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateFundingInterestDto,
    @CurrentUser('_id') userId: string,
  ) {
    return this.service.updateStatus(id, dto, userId);
  }
}
