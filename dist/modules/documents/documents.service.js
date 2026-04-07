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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const document_schema_1 = require("./document.schema");
const audit_service_1 = require("../audit/audit.service");
const enums_1 = require("../../common/enums");
let DocumentsService = class DocumentsService {
    documentModel;
    auditService;
    constructor(documentModel, auditService) {
        this.documentModel = documentModel;
        this.auditService = auditService;
    }
    async create(dto, userId) {
        const doc = await this.documentModel.create({
            ...dto,
            startupId: new mongoose_2.Types.ObjectId(dto.startupId),
            uploadedBy: new mongoose_2.Types.ObjectId(userId),
            expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
        });
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.DOCUMENT,
            entityId: doc._id,
            action: enums_1.AuditAction.CREATE,
            performedBy: new mongoose_2.Types.ObjectId(userId),
            changes: { type: { before: null, after: dto.type }, filename: { before: null, after: dto.filename } },
        });
        return doc;
    }
    async findByStartup(startupId, type) {
        const filter = { startupId: new mongoose_2.Types.ObjectId(startupId) };
        if (type)
            filter.type = type;
        return this.documentModel.find(filter).sort({ createdAt: -1 }).populate('uploadedBy', 'name email').lean();
    }
    async verify(id, userId, userRole) {
        if (![enums_1.UserRole.ADMIN, enums_1.UserRole.CEO, enums_1.UserRole.FINANCE].includes(userRole)) {
            throw new common_1.ForbiddenException('Not authorized to verify documents');
        }
        const doc = await this.documentModel.findByIdAndUpdate(id, { isVerified: true, verifiedBy: new mongoose_2.Types.ObjectId(userId), verifiedAt: new Date() }, { new: true });
        if (!doc)
            throw new common_1.NotFoundException(`Document ${id} not found`);
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
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(document_schema_1.DocumentFile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        audit_service_1.AuditService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map