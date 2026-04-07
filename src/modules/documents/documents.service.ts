import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DocumentFile, DocumentFileDocument } from './document.schema';
import { CreateDocumentDto } from './dto/document.dto';
import { AuditService } from '../audit/audit.service';
import { AuditAction, AuditEntityType, UserRole } from '../../common/enums';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(DocumentFile.name) private documentModel: Model<DocumentFileDocument>,
    private auditService: AuditService,
  ) {}

  async create(dto: CreateDocumentDto, userId: string) {
    const doc = await this.documentModel.create({
      ...dto,
      startupId: new Types.ObjectId(dto.startupId),
      uploadedBy: new Types.ObjectId(userId),
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
    });

    await this.auditService.log({
      entityType: AuditEntityType.DOCUMENT,
      entityId: doc._id as any,
      action: AuditAction.CREATE,
      performedBy: new Types.ObjectId(userId),
      changes: { type: { before: null, after: dto.type }, filename: { before: null, after: dto.filename } },
    });

    return doc;
  }

  async findByStartup(startupId: string, type?: string) {
    const filter: any = { startupId: new Types.ObjectId(startupId) };
    if (type) filter.type = type;
    return this.documentModel.find(filter).sort({ createdAt: -1 }).populate('uploadedBy', 'name email').lean();
  }

  async verify(id: string, userId: string, userRole: UserRole) {
    if (![UserRole.ADMIN, UserRole.CEO, UserRole.FINANCE].includes(userRole)) {
      throw new ForbiddenException('Not authorized to verify documents');
    }

    const doc = await this.documentModel.findByIdAndUpdate(
      id,
      { isVerified: true, verifiedBy: new Types.ObjectId(userId), verifiedAt: new Date() },
      { new: true },
    );

    if (!doc) throw new NotFoundException(`Document ${id} not found`);
    return doc;
  }

  async getExpiringDocuments(daysAhead = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + daysAhead);
    return this.documentModel
      .find({ expiresAt: { $lte: cutoff }, isVerified: true })
      .populate('startupId', 'name')
      .lean();
  }
}
