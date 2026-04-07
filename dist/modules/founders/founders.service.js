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
exports.FoundersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const founder_schema_1 = require("./founder.schema");
const startup_schema_1 = require("../startups/startup.schema");
const audit_service_1 = require("../audit/audit.service");
const enums_1 = require("../../common/enums");
let FoundersService = class FoundersService {
    founderModel;
    startupModel;
    auditService;
    constructor(founderModel, startupModel, auditService) {
        this.founderModel = founderModel;
        this.startupModel = startupModel;
        this.auditService = auditService;
    }
    async create(dto, userId) {
        const existing = await this.founderModel.findOne({ email: dto.email });
        if (existing)
            throw new common_1.ConflictException('Founder with this email already exists');
        const startup = await this.startupModel.findById(dto.startupId);
        if (!startup)
            throw new common_1.NotFoundException('Startup not found');
        const founder = await this.founderModel.create({
            ...dto,
            startupId: new mongoose_2.Types.ObjectId(dto.startupId),
            userId: dto.userId ? new mongoose_2.Types.ObjectId(dto.userId) : undefined,
        });
        await this.startupModel.findByIdAndUpdate(dto.startupId, {
            $addToSet: { founderIds: founder._id },
        });
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.FOUNDER,
            entityId: founder._id,
            action: enums_1.AuditAction.CREATE,
            performedBy: new mongoose_2.Types.ObjectId(userId),
        });
        return founder;
    }
    async findMyStartups(userId, userEmail) {
        const founders = await this.founderModel
            .find({
            $or: [
                { userId: new mongoose_2.Types.ObjectId(userId) },
                { email: userEmail.toLowerCase() },
            ],
        })
            .lean();
        if (!founders.length)
            return [];
        await Promise.all(founders
            .filter((f) => !f.userId)
            .map((f) => this.founderModel.findByIdAndUpdate(f._id, {
            userId: new mongoose_2.Types.ObjectId(userId),
        })));
        const startupIds = founders.map((f) => f.startupId).filter(Boolean);
        return this.startupModel
            .find({ _id: { $in: startupIds } })
            .populate('founderIds', 'name email')
            .sort({ createdAt: -1 })
            .lean();
    }
    async createMyStartup(dto, userId, userEmail, userName) {
        const { founderName, founderEmail, contact, pitchDeckLink, incorporationDate, cinNumber, fundingSecured, fundingScheme, dateOfRelease, schemeName, ...startupFields } = dto;
        const startup = await this.startupModel.create({
            ...startupFields,
            schemeName,
            pitchDeckLink,
            incorporationDate: incorporationDate ? new Date(incorporationDate) : undefined,
            cinNumber,
            fundingSecured,
            fundingScheme,
            dateOfRelease: dateOfRelease ? new Date(dateOfRelease) : undefined,
            createdBy: new mongoose_2.Types.ObjectId(userId),
            status: enums_1.StartupStatus.ACTIVE,
        });
        const founder = await this.founderModel.create({
            name: founderName || userName,
            email: (founderEmail || userEmail).toLowerCase(),
            contact,
            startupId: startup._id,
            userId: new mongoose_2.Types.ObjectId(userId),
        });
        await this.startupModel.findByIdAndUpdate(startup._id, {
            $addToSet: { founderIds: founder._id },
        });
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.STARTUP,
            entityId: startup._id,
            action: enums_1.AuditAction.CREATE,
            performedBy: new mongoose_2.Types.ObjectId(userId),
            changes: { name: { before: null, after: dto.name } },
        });
        return startup;
    }
    async findByStartup(startupId) {
        return this.founderModel
            .find({ startupId: new mongoose_2.Types.ObjectId(startupId) })
            .lean();
    }
    async findMyStartup(userId, userEmail) {
        let founder = await this.founderModel
            .findOne({ userId: new mongoose_2.Types.ObjectId(userId) })
            .lean();
        if (!founder && userEmail) {
            founder = await this.founderModel
                .findOne({ email: userEmail.toLowerCase() })
                .lean();
            if (founder) {
                await this.founderModel.findByIdAndUpdate(founder._id, {
                    userId: new mongoose_2.Types.ObjectId(userId),
                });
            }
        }
        if (!founder?.startupId)
            return null;
        return this.startupModel
            .findById(founder.startupId)
            .populate('founderIds', 'name email skills')
            .lean();
    }
    async updateMyStartup(startupId, dto, userId, userEmail) {
        const isOwner = await this.founderModel.findOne({
            startupId: new mongoose_2.Types.ObjectId(startupId),
            $or: [{ userId: new mongoose_2.Types.ObjectId(userId) }, { email: userEmail.toLowerCase() }],
        });
        if (!isOwner)
            throw new common_1.ForbiddenException('You do not own this startup');
        const updateData = { ...dto };
        if (dto.incorporationDate)
            updateData.incorporationDate = new Date(dto.incorporationDate);
        if (dto.dateOfRelease)
            updateData.dateOfRelease = new Date(dto.dateOfRelease);
        const updated = await this.startupModel.findByIdAndUpdate(startupId, updateData, { new: true, runValidators: true }).lean();
        if (!updated)
            throw new common_1.NotFoundException('Startup not found');
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.STARTUP,
            entityId: new mongoose_2.Types.ObjectId(startupId),
            action: enums_1.AuditAction.UPDATE,
            performedBy: new mongoose_2.Types.ObjectId(userId),
        });
        return updated;
    }
    async findById(id) {
        const founder = await this.founderModel.findById(id).populate('startupId', 'name sector stage').lean();
        if (!founder)
            throw new common_1.NotFoundException(`Founder ${id} not found`);
        return founder;
    }
    async update(id, dto, userId) {
        const founder = await this.founderModel.findByIdAndUpdate(id, dto, { new: true }).lean();
        if (!founder)
            throw new common_1.NotFoundException(`Founder ${id} not found`);
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.FOUNDER,
            entityId: new mongoose_2.Types.ObjectId(id),
            action: enums_1.AuditAction.UPDATE,
            performedBy: new mongoose_2.Types.ObjectId(userId),
        });
        return founder;
    }
};
exports.FoundersService = FoundersService;
exports.FoundersService = FoundersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(founder_schema_1.Founder.name)),
    __param(1, (0, mongoose_1.InjectModel)(startup_schema_1.Startup.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        audit_service_1.AuditService])
], FoundersService);
//# sourceMappingURL=founders.service.js.map