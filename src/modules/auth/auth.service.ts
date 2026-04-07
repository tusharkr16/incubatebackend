import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/user.schema';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { AuditService } from '../audit/audit.service';
import { AuditAction, AuditEntityType } from '../../common/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private auditService: AuditService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userModel.findOne({ email: dto.email }).lean();
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const user = await this.userModel.create({
      ...dto,
      password: hashedPassword,
    });

    await this.auditService.log({
      entityType: AuditEntityType.USER,
      entityId: user._id as any,
      action: AuditAction.CREATE,
      performedBy: user._id as any,
      changes: { email: { before: null, after: dto.email }, role: { before: null, after: dto.role } },
    });

    const token = this.generateToken(user);
    return { token, user: this.sanitizeUser(user) };
  }

  async login(dto: LoginDto, ipAddress?: string) {
    // Explicitly select password since it's excluded by default
    const user = await this.userModel.findOne({ email: dto.email }).select('+password');

    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.isActive) throw new UnauthorizedException('Account disabled');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    // Update last login timestamp
    await this.userModel.updateOne({ _id: user._id }, { lastLoginAt: new Date() });

    await this.auditService.log({
      entityType: AuditEntityType.USER,
      entityId: user._id as any,
      action: AuditAction.LOGIN,
      performedBy: user._id as any,
      ipAddress,
    });

    const token = this.generateToken(user);
    return { token, user: this.sanitizeUser(user) };
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).lean();
    if (!user) throw new NotFoundException('User not found');
    return this.sanitizeUser(user);
  }

  private generateToken(user: UserDocument) {
    const payload = { sub: user._id.toString(), email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  private sanitizeUser(user: any) {
    const { password, ...safe } = user.toObject ? user.toObject() : user;
    return safe;
  }
}
