import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Milestone, MilestoneDocument } from './milestone.schema';
import { CreateMilestoneDto, UpdateMilestoneDto } from './dto/milestone.dto';
import { AuditService } from '../audit/audit.service';
import { AuditAction, AuditEntityType, MilestoneStatus } from '../../common/enums';

@Injectable()
export class MilestonesService {
  constructor(
    @InjectModel(Milestone.name) private milestoneModel: Model<MilestoneDocument>,
    private auditService: AuditService,
  ) {}

  async create(dto: CreateMilestoneDto, userId: string) {
    const milestone = await this.milestoneModel.create({
      ...dto,
      startupId: new Types.ObjectId(dto.startupId),
      createdBy: new Types.ObjectId(userId),
      deadline: new Date(dto.deadline),
    });

    await this.auditService.log({
      entityType: AuditEntityType.MILESTONE,
      entityId: milestone._id as any,
      action: AuditAction.CREATE,
      performedBy: new Types.ObjectId(userId),
    });

    return milestone;
  }

  async findByStartup(startupId: string) {
    return this.milestoneModel
      .find({ startupId: new Types.ObjectId(startupId) })
      .sort({ deadline: 1 })
      .lean();
  }

  async update(id: string, dto: UpdateMilestoneDto, userId: string) {
    const milestone = await this.milestoneModel.findById(id);
    if (!milestone) throw new NotFoundException(`Milestone ${id} not found`);

    const updateData: any = { ...dto, updatedBy: new Types.ObjectId(userId) };
    if (dto.status === MilestoneStatus.COMPLETED && !milestone.completedAt) {
      updateData.completedAt = new Date();
      updateData.progressPercent = 100;
    }

    const updated = await this.milestoneModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .lean();

    await this.auditService.log({
      entityType: AuditEntityType.MILESTONE,
      entityId: new Types.ObjectId(id),
      action: AuditAction.UPDATE,
      performedBy: new Types.ObjectId(userId),
      changes: { status: { before: milestone.status, after: dto.status } },
    });

    return updated;
  }

  async getOverdueMilestones() {
    return this.milestoneModel
      .find({
        deadline: { $lt: new Date() },
        status: { $nin: [MilestoneStatus.COMPLETED] },
      })
      .populate('startupId', 'name')
      .lean();
  }
}
