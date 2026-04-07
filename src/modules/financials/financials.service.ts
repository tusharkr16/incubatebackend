import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Financial, FinancialDocument } from './financial.schema';
import { CreateFinancialDto, UpdateFinancialStatusDto } from './dto/financial.dto';
import { AuditService } from '../audit/audit.service';
import { AuditAction, AuditEntityType, DisbursementStatus, UserRole } from '../../common/enums';

@Injectable()
export class FinancialsService {
  constructor(
    @InjectModel(Financial.name) private financialModel: Model<FinancialDocument>,
    private auditService: AuditService,
  ) {}

  async create(dto: CreateFinancialDto, userId: string) {
    const financial = await this.financialModel.create({
      ...dto,
      startupId: new Types.ObjectId(dto.startupId),
      createdBy: new Types.ObjectId(userId),
      disbursementDate: new Date(dto.disbursementDate),
      documentId: dto.documentId ? new Types.ObjectId(dto.documentId) : undefined,
    });

    await this.auditService.log({
      entityType: AuditEntityType.FINANCIAL,
      entityId: financial._id as any,
      action: AuditAction.CREATE,
      performedBy: new Types.ObjectId(userId),
      changes: { amount: { before: null, after: dto.amount }, status: { before: null, after: DisbursementStatus.PENDING } },
    });

    return financial;
  }

  async findByStartup(startupId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [records, total] = await Promise.all([
      this.financialModel
        .find({ startupId: new Types.ObjectId(startupId) })
        .sort({ disbursementDate: -1 })
        .skip(skip)
        .limit(limit)
        .populate('approvedBy', 'name email')
        .populate('createdBy', 'name email')
        .lean(),
      this.financialModel.countDocuments({ startupId: new Types.ObjectId(startupId) }),
    ]);
    return { records, total, page, limit };
  }

  async updateStatus(id: string, dto: UpdateFinancialStatusDto, userId: string, userRole: UserRole) {
    // Only Finance or CEO/Admin can approve disbursements
    if (dto.status === DisbursementStatus.APPROVED || dto.status === DisbursementStatus.DISBURSED) {
      if (![UserRole.FINANCE, UserRole.CEO, UserRole.ADMIN].includes(userRole)) {
        throw new ForbiddenException('Only finance officers can approve disbursements');
      }
    }

    const record = await this.financialModel.findById(id);
    if (!record) throw new NotFoundException(`Financial record ${id} not found`);

    const update: any = { status: dto.status, notes: dto.notes };
    if (dto.status === DisbursementStatus.APPROVED) {
      update.approvedBy = new Types.ObjectId(userId);
      update.approvedAt = new Date();
    }

    const updated = await this.financialModel
      .findByIdAndUpdate(id, update, { new: true })
      .lean();

    await this.auditService.log({
      entityType: AuditEntityType.FINANCIAL,
      entityId: new Types.ObjectId(id),
      action: dto.status === DisbursementStatus.DISBURSED ? AuditAction.DISBURSE : AuditAction.APPROVE,
      performedBy: new Types.ObjectId(userId),
      changes: { status: { before: record.status, after: dto.status } },
    });

    return updated;
  }

  async getStartupFinancialSummary(startupId: string) {
    return this.financialModel.aggregate([
      { $match: { startupId: new Types.ObjectId(startupId) } },
      {
        $group: {
          _id: '$status',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);
  }

  /**
   * Returns a list of all startups that have at least one financial record,
   * aggregated with total allocated, disbursed, and pending amounts.
   * Used by the admin/CEO financials dashboard.
   */
  async getFundedStartups() {
    return this.financialModel.aggregate([
      // Group all records by startup
      {
        $group: {
          _id: '$startupId',
          totalAmount: { $sum: '$amount' },
          disbursedAmount: {
            $sum: { $cond: [{ $eq: ['$status', DisbursementStatus.DISBURSED] }, '$amount', 0] },
          },
          approvedAmount: {
            $sum: { $cond: [{ $eq: ['$status', DisbursementStatus.APPROVED] }, '$amount', 0] },
          },
          pendingAmount: {
            $sum: { $cond: [{ $eq: ['$status', DisbursementStatus.PENDING] }, '$amount', 0] },
          },
          recordCount: { $sum: 1 },
          latestDisbursement: { $max: '$disbursementDate' },
          currency: { $first: '$currency' },
          fundSources: { $addToSet: '$fundSource' },
        },
      },
      // Join with startups collection
      {
        $lookup: {
          from: 'startups',
          localField: '_id',
          foreignField: '_id',
          as: 'startup',
        },
      },
      { $unwind: '$startup' },
      // Sort by most disbursed first
      { $sort: { disbursedAmount: -1, totalAmount: -1 } },
      // Shape the output
      {
        $project: {
          _id: 0,
          startupId: '$_id',
          startupName: '$startup.name',
          sector: '$startup.sector',
          stage: '$startup.stage',
          status: '$startup.status',
          cohortYear: '$startup.cohortYear',
          totalAmount: 1,
          disbursedAmount: 1,
          approvedAmount: 1,
          pendingAmount: 1,
          recordCount: 1,
          latestDisbursement: 1,
          currency: 1,
          fundSources: 1,
        },
      },
    ]);
  }
}
