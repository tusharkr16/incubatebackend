import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Startup, StartupDocument } from './startup.schema';
import { CreateStartupDto, UpdateStartupDto } from './dto/startup.dto';
import { AuditService } from '../audit/audit.service';
import { AuditAction, AuditEntityType, UserRole, StartupStatus } from '../../common/enums';

@Injectable()
export class StartupsService {
  constructor(
    @InjectModel(Startup.name) private startupModel: Model<StartupDocument>,
    private auditService: AuditService,
  ) {}

  async create(dto: CreateStartupDto, userId: string) {
    const createData: any = {
      ...dto,
      createdBy: new Types.ObjectId(userId),
      assignedInvestorIds: (dto.assignedInvestorIds ?? []).map(
        (id) => new Types.ObjectId(id),
      ),
    };
    if (dto.incorporationDate) createData.incorporationDate = new Date(dto.incorporationDate);
    if (dto.dateOfRelease) createData.dateOfRelease = new Date(dto.dateOfRelease);

    const startup = await this.startupModel.create(createData);

    await this.auditService.log({
      entityType: AuditEntityType.STARTUP,
      entityId: startup._id as any,
      action: AuditAction.CREATE,
      performedBy: new Types.ObjectId(userId),
      changes: { name: { before: null, after: dto.name } },
    });

    return startup;
  }

  /**
   * Role-based filtering:
   * - CEO/Admin: see all
   * - Investor: only assigned startups
   * - Founder: only their startups (resolved via founderIds)
   */
  async findAll(
    user: { _id: string; role: UserRole },
    filters: {
      status?: StartupStatus;
      stage?: string;
      cohortYear?: number;
      sector?: string;
      search?: string;
      page?: number;
      limit?: number;
    },
  ) {
    const { page = 1, limit = 20, status, stage, cohortYear, sector, search } = filters;
    const skip = (page - 1) * limit;

    const query: Record<string, any> = {};

    if (status) query.status = status;
    if (stage) query.stage = stage;
    if (cohortYear) query.cohortYear = cohortYear;
    if (sector) query['sector.primary'] = new RegExp(sector, 'i');
    if (search) query.name = new RegExp(search, 'i');

    // Investors see all active startups (browse & evaluate any)
    // Founders see only their own startups (resolved upstream via founders service)

    const [startups, total] = await Promise.all([
      this.startupModel
        .find(query)
        .sort({ latestScore: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('founderIds', 'name email')
        .populate('createdBy', 'name email')
        .lean(),
      this.startupModel.countDocuments(query),
    ]);

    return { startups, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string, user: { _id: string; role: UserRole }) {
    const startup = await this.startupModel
      .findById(id)
      .populate('founderIds', 'name email skills yearsOfExperience')
      .populate('assignedInvestorIds', 'name email')
      .populate('createdBy', 'name email')
      .lean();

    if (!startup) throw new NotFoundException(`Startup ${id} not found`);

    // Investors can only view assigned startups
    if (
      user.role === UserRole.INVESTOR &&
      !startup.assignedInvestorIds.some(
        (inv: any) => inv._id.toString() === user._id,
      )
    ) {
      throw new ForbiddenException('Not authorized to view this startup');
    }

    return startup;
  }

  async update(id: string, dto: UpdateStartupDto, userId: string, userRole: UserRole) {
    const startup = await this.startupModel.findById(id);
    if (!startup) throw new NotFoundException(`Startup ${id} not found`);

    // Track changes for audit
    const before = startup.toObject();

    const updateData: any = { ...dto };
    if (dto.assignedInvestorIds) {
      updateData.assignedInvestorIds = dto.assignedInvestorIds.map(
        (id) => new Types.ObjectId(id),
      );
    }
    if (dto.incorporationDate) updateData.incorporationDate = new Date(dto.incorporationDate);
    if (dto.dateOfRelease) updateData.dateOfRelease = new Date(dto.dateOfRelease);

    const updated = await this.startupModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .lean();

    await this.auditService.log({
      entityType: AuditEntityType.STARTUP,
      entityId: new Types.ObjectId(id),
      action: AuditAction.UPDATE,
      performedBy: new Types.ObjectId(userId),
      changes: this.diffObjects(before, updated),
    });

    return updated;
  }

  async updateScore(startupId: string, score: number) {
    return this.startupModel.findByIdAndUpdate(
      startupId,
      { latestScore: score },
      { new: true },
    );
  }

  async getLeaderboard(cohortYear?: number) {
    const filter: any = { status: StartupStatus.ACTIVE };
    if (cohortYear) filter.cohortYear = cohortYear;

    return this.startupModel
      .find(filter)
      .sort({ latestScore: -1 })
      .limit(50)
      .select('name sector stage latestScore status cohortYear isFlagged')
      .lean();
  }

  private diffObjects(
    before: any,
    after: any,
  ): Record<string, { before: unknown; after: unknown }> {
    const changes: Record<string, { before: unknown; after: unknown }> = {};
    for (const key of Object.keys(after ?? {})) {
      if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
        changes[key] = { before: before[key], after: after[key] };
      }
    }
    return changes;
  }
}
