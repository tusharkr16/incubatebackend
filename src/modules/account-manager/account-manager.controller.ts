import { Controller, Post, Get, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { AccountManagerService } from './account-manager.service';
import { AssignStartupDto, CreateAmReviewDto } from './dto/account-manager.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/enums';

@Controller('account-manager')
export class AccountManagerController {
  constructor(private service: AccountManagerService) {}

  /** Admin/CEO assigns a startup to an account manager */
  @Post('assign')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  assign(@Body() dto: AssignStartupDto) {
    return this.service.assignStartup(dto);
  }

  /** All active assignments (admin/ceo overview) */
  @Get('assignments')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  getAllAssignments() {
    return this.service.getAllAssignments();
  }

  /** Startups assigned to the calling account manager */
  @Get('my-startups')
  @Roles(UserRole.ACCOUNT_MANAGER)
  getMyStartups(@CurrentUser('_id') amId: string) {
    return this.service.getAssignedStartups(amId);
  }

  /** AM for a specific startup (founder / admin / ceo can check) */
  @Get('startup/:startupId')
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.FOUNDER, UserRole.ACCOUNT_MANAGER)
  getStartupAM(@Param('startupId') startupId: string) {
    return this.service.getStartupAccountManager(startupId);
  }

  /** Deactivate assignment */
  @Patch('assign/:id/deactivate')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  unassign(@Param('id') id: string) {
    return this.service.unassign(id);
  }

  /** AM posts a review/insight */
  @Post('reviews')
  @Roles(UserRole.ACCOUNT_MANAGER)
  createReview(
    @Body() dto: CreateAmReviewDto,
    @CurrentUser('_id') amId: string,
  ) {
    return this.service.createReview(dto, amId);
  }

  /** Reviews for a startup — admin/ceo/AM see all; founder sees visible-only */
  @Get('reviews/startup/:startupId')
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.FOUNDER, UserRole.ACCOUNT_MANAGER)
  getStartupReviews(
    @Param('startupId') startupId: string,
    @CurrentUser('role') role: string,
    @Query('founderView') founderView?: string,
  ) {
    const isFounder = role === UserRole.FOUNDER || founderView === 'true';
    return this.service.getStartupReviews(startupId, isFounder);
  }

  /** All reviews posted by the calling AM */
  @Get('reviews/my')
  @Roles(UserRole.ACCOUNT_MANAGER)
  getMyReviews(@CurrentUser('_id') amId: string) {
    return this.service.getMyReviews(amId);
  }

  /** Delete a review */
  @Delete('reviews/:id')
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.ACCOUNT_MANAGER)
  deleteReview(@Param('id') id: string) {
    return this.service.deleteReview(id);
  }
}
