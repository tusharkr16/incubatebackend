import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { FoundersService } from './founders.service';
import { CreateFounderDto, CreateMyStartupDto, UpdateFounderDto } from './dto/founder.dto';
import { UpdateStartupDto } from '../startups/dto/startup.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/enums';

@Controller('founders')
export class FoundersController {
  constructor(private foundersService: FoundersService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CEO)
  create(@Body() dto: CreateFounderDto, @CurrentUser('_id') userId: string) {
    return this.foundersService.create(dto, userId);
  }

  @Get('my/startups')
  @Roles(UserRole.FOUNDER)
  getMyStartups(
    @CurrentUser('_id') userId: string,
    @CurrentUser('email') userEmail: string,
  ) {
    return this.foundersService.findMyStartups(userId, userEmail);
  }

  @Post('my/startup')
  @Roles(UserRole.FOUNDER)
  createMyStartup(
    @Body() dto: CreateMyStartupDto,
    @CurrentUser('_id') userId: string,
    @CurrentUser('email') userEmail: string,
    @CurrentUser('name') userName: string,
  ) {
    return this.foundersService.createMyStartup(dto, userId, userEmail, userName);
  }

  // Must be declared before :id route to avoid "my" being parsed as an ID
  @Get('my/startup')
  @Roles(UserRole.FOUNDER)
  getMyStartup(
    @CurrentUser('_id') userId: string,
    @CurrentUser('email') userEmail: string,
  ) {
    return this.foundersService.findMyStartup(userId, userEmail);
  }

  /** Founder updates their own startup details */
  @Patch('my/startup/:startupId')
  @Roles(UserRole.FOUNDER)
  updateMyStartup(
    @Param('startupId') startupId: string,
    @Body() dto: UpdateStartupDto,
    @CurrentUser('_id') userId: string,
    @CurrentUser('email') userEmail: string,
  ) {
    return this.foundersService.updateMyStartup(startupId, dto, userId, userEmail);
  }

  /** Founder updates their own founder profile */
  @Patch('my/profile/:founderId')
  @Roles(UserRole.FOUNDER)
  updateMyProfile(
    @Param('founderId') founderId: string,
    @Body() dto: UpdateFounderDto,
    @CurrentUser('_id') userId: string,
  ) {
    return this.foundersService.update(founderId, dto, userId);
  }

  @Get('startup/:startupId')
  findByStartup(@Param('startupId') startupId: string) {
    return this.foundersService.findByStartup(startupId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.foundersService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.FOUNDER)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateFounderDto,
    @CurrentUser('_id') userId: string,
  ) {
    return this.foundersService.update(id, dto, userId);
  }
}
