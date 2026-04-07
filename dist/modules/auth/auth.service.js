"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const user_schema_1 = require("../users/user.schema");
const audit_service_1 = require("../audit/audit.service");
const enums_1 = require("../../common/enums");
let AuthService = class AuthService {
    userModel;
    jwtService;
    auditService;
    constructor(userModel, jwtService, auditService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.auditService = auditService;
    }
    async register(dto) {
        const existing = await this.userModel.findOne({ email: dto.email }).lean();
        if (existing) {
            throw new common_1.ConflictException('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 12);
        const user = await this.userModel.create({
            ...dto,
            password: hashedPassword,
        });
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.USER,
            entityId: user._id,
            action: enums_1.AuditAction.CREATE,
            performedBy: user._id,
            changes: { email: { before: null, after: dto.email }, role: { before: null, after: dto.role } },
        });
        const token = this.generateToken(user);
        return { token, user: this.sanitizeUser(user) };
    }
    async login(dto, ipAddress) {
        const user = await this.userModel.findOne({ email: dto.email }).select('+password');
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        if (!user.isActive)
            throw new common_1.UnauthorizedException('Account disabled');
        const passwordMatch = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        await this.userModel.updateOne({ _id: user._id }, { lastLoginAt: new Date() });
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.USER,
            entityId: user._id,
            action: enums_1.AuditAction.LOGIN,
            performedBy: user._id,
            ipAddress,
        });
        const token = this.generateToken(user);
        return { token, user: this.sanitizeUser(user) };
    }
    async getProfile(userId) {
        const user = await this.userModel.findById(userId).lean();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.sanitizeUser(user);
    }
    generateToken(user) {
        const payload = { sub: user._id.toString(), email: user.email, role: user.role };
        return this.jwtService.sign(payload);
    }
    sanitizeUser(user) {
        const { password, ...safe } = user.toObject ? user.toObject() : user;
        return safe;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        audit_service_1.AuditService])
], AuthService);
//# sourceMappingURL=auth.service.js.map