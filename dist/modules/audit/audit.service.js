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
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const audit_log_schema_1 = require("./audit-log.schema");
let AuditService = class AuditService {
    auditModel;
    constructor(auditModel) {
        this.auditModel = auditModel;
    }
    async log(data) {
        this.auditModel.create({ ...data, timestamp: new Date() }).catch((err) => console.error('[AuditService] Failed to log:', err.message));
    }
    async getEntityHistory(entityType, entityId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [logs, total] = await Promise.all([
            this.auditModel
                .find({ entityType, entityId: new mongoose_2.Types.ObjectId(entityId) })
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit)
                .populate('performedBy', 'name email role')
                .lean(),
            this.auditModel.countDocuments({ entityType, entityId: new mongoose_2.Types.ObjectId(entityId) }),
        ]);
        return { logs, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async getUserActivity(userId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [logs, total] = await Promise.all([
            this.auditModel
                .find({ performedBy: new mongoose_2.Types.ObjectId(userId) })
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.auditModel.countDocuments({ performedBy: new mongoose_2.Types.ObjectId(userId) }),
        ]);
        return { logs, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(audit_log_schema_1.AuditLog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuditService);
//# sourceMappingURL=audit.service.js.map