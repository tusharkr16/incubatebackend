import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GrantApplication, GrantApplicationDocument } from './grant-application.schema';
import { CreateGrantApplicationDto, UpdateGrantApplicationDto } from './dto/grants.dto';
import { GrantApplicationStatus } from '../../common/enums';

const DEFAULT_STEPS = [
  { label: 'Review eligibility criteria', completed: false },
  { label: 'Prepare required documents', completed: false },
  { label: 'Fill application form', completed: false },
  { label: 'Submit application', completed: false },
  { label: 'Await approval', completed: false },
];

@Injectable()
export class GrantsService {
  constructor(
    @InjectModel(GrantApplication.name)
    private grantAppModel: Model<GrantApplicationDocument>,
  ) {}

  async create(dto: CreateGrantApplicationDto) {
    const existing = await this.grantAppModel.findOne({
      startupId: new Types.ObjectId(dto.startupId),
      grantId: dto.grantId,
    });
    if (existing) return existing;

    return this.grantAppModel.create({
      startupId: new Types.ObjectId(dto.startupId),
      grantId: dto.grantId,
      grantName: dto.grantName,
      steps: dto.steps ?? DEFAULT_STEPS,
      notes: dto.notes,
    });
  }

  async getByStartup(startupId: string) {
    return this.grantAppModel
      .find({ startupId: new Types.ObjectId(startupId) })
      .sort({ createdAt: -1 })
      .lean();
  }

  async getById(id: string) {
    const doc = await this.grantAppModel.findById(id).lean();
    if (!doc) throw new NotFoundException(`Grant application ${id} not found`);
    return doc;
  }

  async update(id: string, dto: UpdateGrantApplicationDto) {
    const update: Record<string, unknown> = {};
    if (dto.status) {
      update.status = dto.status;
      if (dto.status === GrantApplicationStatus.SUBMITTED) update.submittedAt = new Date();
    }
    if (dto.steps) update.steps = dto.steps;
    if (dto.notes !== undefined) update.notes = dto.notes;

    const doc = await this.grantAppModel.findByIdAndUpdate(id, update, { new: true });
    if (!doc) throw new NotFoundException(`Grant application ${id} not found`);
    return doc;
  }

  async getAllApplications() {
    return this.grantAppModel
      .find()
      .populate('startupId', 'name sector stage status')
      .sort({ createdAt: -1 })
      .lean();
  }
}
