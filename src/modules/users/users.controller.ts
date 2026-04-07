import { Controller, Get, Param, Patch, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/user.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/enums';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.CEO)
  findAll(@Query('role') role?: UserRole, @Query('page') page = 1, @Query('limit') limit = 20) {
    return this.usersService.findAll(role, +page, +limit);
  }

  @Get('investors')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  findInvestors() {
    return this.usersService.findInvestors();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser('_id') requesterId: string,
    @CurrentUser('role') requesterRole: UserRole,
  ) {
    return this.usersService.update(id, dto, requesterId, requesterRole);
  }
}
