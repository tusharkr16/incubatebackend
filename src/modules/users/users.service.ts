import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UpdateUserDto } from './dto/user.dto';
import { UserRole } from '../../common/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll(role?: UserRole, page = 1, limit = 20) {
    const filter = role ? { role } : {};
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.userModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      this.userModel.countDocuments(filter),
    ]);

    return { users, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).lean();
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async update(id: string, dto: UpdateUserDto, requesterId: string, requesterRole: UserRole) {
    // Only admins can update role or active status
    if ((dto.role || dto.isActive !== undefined) && requesterRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can change role or account status');
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .lean();

    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async findInvestors() {
    return this.userModel.find({ role: UserRole.INVESTOR, isActive: true }).lean();
  }

  async getStartupsByFounder(userId: string) {
    // Founders are linked via Founder documents — resolver done in startups service
    return this.userModel.findById(userId).lean();
  }
}
