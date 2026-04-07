import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Founder, FounderDocument } from './founder.schema';
import { Startup, StartupDocument } from '../startups/startup.schema';
import { CreateFounderDto, CreateMyStartupDto, UpdateFounderDto } from './dto/founder.dto';
import { UpdateStartupDto } from '../startups/dto/startup.dto';
import { AuditService } from '../audit/audit.service';
import { AuditAction, AuditEntityType, StartupStatus } from '../../common/enums';

@Injectable()
export class FoundersService {
  constructor(
    @InjectModel(Founder.name) private founderModel: Model<FounderDocument>,
    @InjectModel(Startup.name) private startupModel: Model<StartupDocument>,
    private auditService: AuditService,
  ) {}

  async create(dto: CreateFounderDto, userId: string) {
    const existing = await this.founderModel.findOne({ email: dto.email });
    if (existing) throw new ConflictException('Founder with this email already exists');

    const startup = await this.startupModel.findById(dto.startupId);
    if (!startup) throw new NotFoundException('Startup not found');

    const founder = await this.founderModel.create({
      ...dto,
      startupId: new Types.ObjectId(dto.startupId),
      userId: dto.userId ? new Types.ObjectId(dto.userId) : undefined,
    });

    // Link founder back to startup document
    await this.startupModel.findByIdAndUpdate(dto.startupId, {
      $addToSet: { founderIds: founder._id },
    });

    await this.auditService.log({
      entityType: AuditEntityType.FOUNDER,
      entityId: founder._id as any,
      action: AuditAction.CREATE,
      performedBy: new Types.ObjectId(userId),
    });

    return founder;
  }

  /** Returns all startups the logged-in founder is linked to. */
  async findMyStartups(userId: string, userEmail: string) {
    const founders = await this.founderModel
      .find({
        $or: [
          { userId: new Types.ObjectId(userId) },
          { email: userEmail.toLowerCase() },
        ],
      })
      .lean();

    if (!founders.length) return [];

    // Auto-link userId for any records found by email
    await Promise.all(
      founders
        .filter((f) => !f.userId)
        .map((f) =>
          this.founderModel.findByIdAndUpdate(f._id, {
            userId: new Types.ObjectId(userId),
          }),
        ),
    );

    const startupIds = founders.map((f) => f.startupId).filter(Boolean);
    return this.startupModel
      .find({ _id: { $in: startupIds } })
      .populate('founderIds', 'name email')
      .sort({ createdAt: -1 })
      .lean();
  }

  async createMyStartup(dto: CreateMyStartupDto, userId: string, userEmail: string, userName: string) {
    const { founderName, founderEmail, contact, pitchDeckLink, incorporationDate,
      cinNumber, fundingSecured, fundingScheme, dateOfRelease, schemeName, ...startupFields } = dto;

    const startup = await this.startupModel.create({
      ...startupFields,
      schemeName,
      pitchDeckLink,
      incorporationDate: incorporationDate ? new Date(incorporationDate) : undefined,
      cinNumber,
      fundingSecured,
      fundingScheme,
      dateOfRelease: dateOfRelease ? new Date(dateOfRelease) : undefined,
      createdBy: new Types.ObjectId(userId),
      status: StartupStatus.ACTIVE,
    });

    const founder = await this.founderModel.create({
      name: founderName || userName,
      email: (founderEmail || userEmail).toLowerCase(),
      contact,
      startupId: startup._id,
      userId: new Types.ObjectId(userId),
    });

    await this.startupModel.findByIdAndUpdate(startup._id, {
      $addToSet: { founderIds: founder._id },
    });

    await this.auditService.log({
      entityType: AuditEntityType.STARTUP,
      entityId: startup._id as any,
      action: AuditAction.CREATE,
      performedBy: new Types.ObjectId(userId),
      changes: { name: { before: null, after: dto.name } },
    });

    return startup;
  }

  async findByStartup(startupId: string) {
    return this.founderModel
      .find({ startupId: new Types.ObjectId(startupId) })
      .lean();
  }

  /**
   * Returns the startup linked to the logged-in founder's user account.
   * Matches by userId first; falls back to email if userId is not yet linked.
   */
  async findMyStartup(userId: string, userEmail?: string) {
    let founder = await this.founderModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .lean();

    // Fallback: match by email if userId not explicitly linked yet
    if (!founder && userEmail) {
      founder = await this.founderModel
        .findOne({ email: userEmail.toLowerCase() })
        .lean();

      // Auto-link userId for future lookups
      if (founder) {
        await this.founderModel.findByIdAndUpdate(founder._id, {
          userId: new Types.ObjectId(userId),
        });
      }
    }

    if (!founder?.startupId) return null;

    return this.startupModel
      .findById(founder.startupId)
      .populate('founderIds', 'name email skills')
      .lean();
  }

  /** Founder updates a startup they own — verifies ownership first */
  async updateMyStartup(startupId: string, dto: UpdateStartupDto, userId: string, userEmail: string) {
    const isOwner = await this.founderModel.findOne({
      startupId: new Types.ObjectId(startupId),
      $or: [{ userId: new Types.ObjectId(userId) }, { email: userEmail.toLowerCase() }],
    });
    if (!isOwner) throw new ForbiddenException('You do not own this startup');

    const updateData: any = { ...dto };
    if (dto.incorporationDate) updateData.incorporationDate = new Date(dto.incorporationDate);
    if (dto.dateOfRelease) updateData.dateOfRelease = new Date(dto.dateOfRelease);

    const updated = await this.startupModel.findByIdAndUpdate(startupId, updateData, { new: true, runValidators: true }).lean();
    if (!updated) throw new NotFoundException('Startup not found');

    await this.auditService.log({
      entityType: AuditEntityType.STARTUP,
      entityId: new Types.ObjectId(startupId),
      action: AuditAction.UPDATE,
      performedBy: new Types.ObjectId(userId),
    });
    return updated;
  }

  async findById(id: string) {
    const founder = await this.founderModel.findById(id).populate('startupId', 'name sector stage').lean();
    if (!founder) throw new NotFoundException(`Founder ${id} not found`);
    return founder;
  }

  async update(id: string, dto: UpdateFounderDto, userId: string) {
    const founder = await this.founderModel.findByIdAndUpdate(id, dto, { new: true }).lean();
    if (!founder) throw new NotFoundException(`Founder ${id} not found`);

    await this.auditService.log({
      entityType: AuditEntityType.FOUNDER,
      entityId: new Types.ObjectId(id),
      action: AuditAction.UPDATE,
      performedBy: new Types.ObjectId(userId),
    });

    return founder;
  }
}
