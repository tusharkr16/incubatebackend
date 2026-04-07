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
exports.StartupsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const startup_schema_1 = require("./startup.schema");
const audit_service_1 = require("../audit/audit.service");
const enums_1 = require("../../common/enums");
let StartupsService = class StartupsService {
    startupModel;
    auditService;
    constructor(startupModel, auditService) {
        this.startupModel = startupModel;
        this.auditService = auditService;
    }
    async create(dto, userId) {
        const createData = {
            ...dto,
            createdBy: new mongoose_2.Types.ObjectId(userId),
            assignedInvestorIds: (dto.assignedInvestorIds ?? []).map((id) => new mongoose_2.Types.ObjectId(id)),
        };
        if (dto.incorporationDate)
            createData.incorporationDate = new Date(dto.incorporationDate);
        if (dto.dateOfRelease)
            createData.dateOfRelease = new Date(dto.dateOfRelease);
        const startup = await this.startupModel.create(createData);
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.STARTUP,
            entityId: startup._id,
            action: enums_1.AuditAction.CREATE,
            performedBy: new mongoose_2.Types.ObjectId(userId),
            changes: { name: { before: null, after: dto.name } },
        });
        return startup;
    }
    async findAll(user, filters) {
        const { page = 1, limit = 20, status, stage, cohortYear, sector, search } = filters;
        const skip = (page - 1) * limit;
        const query = {};
        if (status)
            query.status = status;
        if (stage)
            query.stage = stage;
        if (cohortYear)
            query.cohortYear = cohortYear;
        if (sector)
            query['sector.primary'] = new RegExp(sector, 'i');
        if (search)
            query.name = new RegExp(search, 'i');
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
    async findById(id, user) {
        const startup = await this.startupModel
            .findById(id)
            .populate('founderIds', 'name email skills yearsOfExperience')
            .populate('assignedInvestorIds', 'name email')
            .populate('createdBy', 'name email')
            .lean();
        if (!startup)
            throw new common_1.NotFoundException(`Startup ${id} not found`);
        if (user.role === enums_1.UserRole.INVESTOR &&
            !startup.assignedInvestorIds.some((inv) => inv._id.toString() === user._id)) {
            throw new common_1.ForbiddenException('Not authorized to view this startup');
        }
        return startup;
    }
    async update(id, dto, userId, userRole) {
        const startup = await this.startupModel.findById(id);
        if (!startup)
            throw new common_1.NotFoundException(`Startup ${id} not found`);
        const before = startup.toObject();
        const updateData = { ...dto };
        if (dto.assignedInvestorIds) {
            updateData.assignedInvestorIds = dto.assignedInvestorIds.map((id) => new mongoose_2.Types.ObjectId(id));
        }
        if (dto.incorporationDate)
            updateData.incorporationDate = new Date(dto.incorporationDate);
        if (dto.dateOfRelease)
            updateData.dateOfRelease = new Date(dto.dateOfRelease);
        const updated = await this.startupModel
            .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
            .lean();
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.STARTUP,
            entityId: new mongoose_2.Types.ObjectId(id),
            action: enums_1.AuditAction.UPDATE,
            performedBy: new mongoose_2.Types.ObjectId(userId),
            changes: this.diffObjects(before, updated),
        });
        return updated;
    }
    async updateScore(startupId, score) {
        return this.startupModel.findByIdAndUpdate(startupId, { latestScore: score }, { new: true });
    }
    async getLeaderboard(cohortYear) {
        const filter = { status: enums_1.StartupStatus.ACTIVE };
        if (cohortYear)
            filter.cohortYear = cohortYear;
        return this.startupModel
            .find(filter)
            .sort({ latestScore: -1 })
            .limit(50)
            .select('name sector stage latestScore status cohortYear isFlagged')
            .lean();
    }
    diffObjects(before, after) {
        const changes = {};
        for (const key of Object.keys(after ?? {})) {
            if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
                changes[key] = { before: before[key], after: after[key] };
            }
        }
        return changes;
    }
};
exports.StartupsService = StartupsService;
exports.StartupsService = StartupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(startup_schema_1.Startup.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        audit_service_1.AuditService])
], StartupsService);
//# sourceMappingURL=startups.service.js.map