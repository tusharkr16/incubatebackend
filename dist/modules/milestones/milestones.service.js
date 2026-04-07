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
exports.MilestonesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const milestone_schema_1 = require("./milestone.schema");
const audit_service_1 = require("../audit/audit.service");
const enums_1 = require("../../common/enums");
let MilestonesService = class MilestonesService {
    milestoneModel;
    auditService;
    constructor(milestoneModel, auditService) {
        this.milestoneModel = milestoneModel;
        this.auditService = auditService;
    }
    async create(dto, userId) {
        const milestone = await this.milestoneModel.create({
            ...dto,
            startupId: new mongoose_2.Types.ObjectId(dto.startupId),
            createdBy: new mongoose_2.Types.ObjectId(userId),
            deadline: new Date(dto.deadline),
        });
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.MILESTONE,
            entityId: milestone._id,
            action: enums_1.AuditAction.CREATE,
            performedBy: new mongoose_2.Types.ObjectId(userId),
        });
        return milestone;
    }
    async findByStartup(startupId) {
        return this.milestoneModel
            .find({ startupId: new mongoose_2.Types.ObjectId(startupId) })
            .sort({ deadline: 1 })
            .lean();
    }
    async update(id, dto, userId) {
        const milestone = await this.milestoneModel.findById(id);
        if (!milestone)
            throw new common_1.NotFoundException(`Milestone ${id} not found`);
        const updateData = { ...dto, updatedBy: new mongoose_2.Types.ObjectId(userId) };
        if (dto.status === enums_1.MilestoneStatus.COMPLETED && !milestone.completedAt) {
            updateData.completedAt = new Date();
            updateData.progressPercent = 100;
        }
        const updated = await this.milestoneModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .lean();
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.MILESTONE,
            entityId: new mongoose_2.Types.ObjectId(id),
            action: enums_1.AuditAction.UPDATE,
            performedBy: new mongoose_2.Types.ObjectId(userId),
            changes: { status: { before: milestone.status, after: dto.status } },
        });
        return updated;
    }
    async getOverdueMilestones() {
        return this.milestoneModel
            .find({
            deadline: { $lt: new Date() },
            status: { $nin: [enums_1.MilestoneStatus.COMPLETED] },
        })
            .populate('startupId', 'name')
            .lean();
    }
};
exports.MilestonesService = MilestonesService;
exports.MilestonesService = MilestonesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(milestone_schema_1.Milestone.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        audit_service_1.AuditService])
], MilestonesService);
//# sourceMappingURL=milestones.service.js.map