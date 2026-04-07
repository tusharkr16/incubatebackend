"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const financial_schema_1 = require("./financial.schema");
const audit_service_1 = require("../audit/audit.service");
const enums_1 = require("../../common/enums");
let FinancialsService = class FinancialsService {
    financialModel;
    auditService;
    constructor(financialModel, auditService) {
        this.financialModel = financialModel;
        this.auditService = auditService;
    }
    async create(dto, userId) {
        const financial = await this.financialModel.create({
            ...dto,
            startupId: new mongoose_2.Types.ObjectId(dto.startupId),
            createdBy: new mongoose_2.Types.ObjectId(userId),
            disbursementDate: new Date(dto.disbursementDate),
            documentId: dto.documentId ? new mongoose_2.Types.ObjectId(dto.documentId) : undefined,
        });
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.FINANCIAL,
            entityId: financial._id,
            action: enums_1.AuditAction.CREATE,
            performedBy: new mongoose_2.Types.ObjectId(userId),
            changes: { amount: { before: null, after: dto.amount }, status: { before: null, after: enums_1.DisbursementStatus.PENDING } },
        });
        return financial;
    }
    async findByStartup(startupId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [records, total] = await Promise.all([
            this.financialModel
                .find({ startupId: new mongoose_2.Types.ObjectId(startupId) })
                .sort({ disbursementDate: -1 })
                .skip(skip)
                .limit(limit)
                .populate('approvedBy', 'name email')
                .populate('createdBy', 'name email')
                .lean(),
            this.financialModel.countDocuments({ startupId: new mongoose_2.Types.ObjectId(startupId) }),
        ]);
        return { records, total, page, limit };
    }
    async updateStatus(id, dto, userId, userRole) {
        if (dto.status === enums_1.DisbursementStatus.APPROVED || dto.status === enums_1.DisbursementStatus.DISBURSED) {
            if (![enums_1.UserRole.FINANCE, enums_1.UserRole.CEO, enums_1.UserRole.ADMIN].includes(userRole)) {
                throw new common_1.ForbiddenException('Only finance officers can approve disbursements');
            }
        }
        const record = await this.financialModel.findById(id);
        if (!record)
            throw new common_1.NotFoundException(`Financial record ${id} not found`);
        const update = { status: dto.status, notes: dto.notes };
        if (dto.status === enums_1.DisbursementStatus.APPROVED) {
            update.approvedBy = new mongoose_2.Types.ObjectId(userId);
            update.approvedAt = new Date();
        }
        const updated = await this.financialModel
            .findByIdAndUpdate(id, update, { new: true })
            .lean();
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.FINANCIAL,
            entityId: new mongoose_2.Types.ObjectId(id),
            action: dto.status === enums_1.DisbursementStatus.DISBURSED ? enums_1.AuditAction.DISBURSE : enums_1.AuditAction.APPROVE,
            performedBy: new mongoose_2.Types.ObjectId(userId),
            changes: { status: { before: record.status, after: dto.status } },
        });
        return updated;
    }
    async getStartupFinancialSummary(startupId) {
        return this.financialModel.aggregate([
            { $match: { startupId: new mongoose_2.Types.ObjectId(startupId) } },
            {
                $group: {
                    _id: '$status',
                    totalAmount: { $sum: '$amount' },
                    count: { $sum: 1 },
                },
            },
        ]);
    }
    async getFundedStartups() {
        return this.financialModel.aggregate([
            {
                $group: {
                    _id: '$startupId',
                    totalAmount: { $sum: '$amount' },
                    disbursedAmount: {
                        $sum: { $cond: [{ $eq: ['$status', enums_1.DisbursementStatus.DISBURSED] }, '$amount', 0] },
                    },
                    approvedAmount: {
                        $sum: { $cond: [{ $eq: ['$status', enums_1.DisbursementStatus.APPROVED] }, '$amount', 0] },
                    },
                    pendingAmount: {
                        $sum: { $cond: [{ $eq: ['$status', enums_1.DisbursementStatus.PENDING] }, '$amount', 0] },
                    },
                    recordCount: { $sum: 1 },
                    latestDisbursement: { $max: '$disbursementDate' },
                    currency: { $first: '$currency' },
                    fundSources: { $addToSet: '$fundSource' },
                },
            },
            {
                $lookup: {
                    from: 'startups',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'startup',
                },
            },
            { $unwind: '$startup' },
            { $sort: { disbursedAmount: -1, totalAmount: -1 } },
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
};
exports.FinancialsService = FinancialsService;
exports.FinancialsService = FinancialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(financial_schema_1.Financial.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        audit_service_1.AuditService])
], FinancialsService);
//# sourceMappingURL=financials.service.js.map