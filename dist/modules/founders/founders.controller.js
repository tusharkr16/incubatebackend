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
exports.FoundersController = void 0;
const common_1 = require("@nestjs/common");
const founders_service_1 = require("./founders.service");
const founder_dto_1 = require("./dto/founder.dto");
const startup_dto_1 = require("../startups/dto/startup.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const enums_1 = require("../../common/enums");
let FoundersController = class FoundersController {
    foundersService;
    constructor(foundersService) {
        this.foundersService = foundersService;
    }
    create(dto, userId) {
        return this.foundersService.create(dto, userId);
    }
    getMyStartups(userId, userEmail) {
        return this.foundersService.findMyStartups(userId, userEmail);
    }
    createMyStartup(dto, userId, userEmail, userName) {
        return this.foundersService.createMyStartup(dto, userId, userEmail, userName);
    }
    getMyStartup(userId, userEmail) {
        return this.foundersService.findMyStartup(userId, userEmail);
    }
    updateMyStartup(startupId, dto, userId, userEmail) {
        return this.foundersService.updateMyStartup(startupId, dto, userId, userEmail);
    }
    updateMyProfile(founderId, dto, userId) {
        return this.foundersService.update(founderId, dto, userId);
    }
    findByStartup(startupId) {
        return this.foundersService.findByStartup(startupId);
    }
    findById(id) {
        return this.foundersService.findById(id);
    }
    update(id, dto, userId) {
        return this.foundersService.update(id, dto, userId);
    }
};
exports.FoundersController = FoundersController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [founder_dto_1.CreateFounderDto, String]),
    __metadata("design:returntype", void 0)
], FoundersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('my/startups'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.FOUNDER),
    __param(0, (0, current_user_decorator_1.CurrentUser)('_id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FoundersController.prototype, "getMyStartups", null);
__decorate([
    (0, common_1.Post)('my/startup'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.FOUNDER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('_id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('email')),
    __param(3, (0, current_user_decorator_1.CurrentUser)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [founder_dto_1.CreateMyStartupDto, String, String, String]),
    __metadata("design:returntype", void 0)
], FoundersController.prototype, "createMyStartup", null);
__decorate([
    (0, common_1.Get)('my/startup'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.FOUNDER),
    __param(0, (0, current_user_decorator_1.CurrentUser)('_id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FoundersController.prototype, "getMyStartup", null);
__decorate([
    (0, common_1.Patch)('my/startup/:startupId'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.FOUNDER),
    __param(0, (0, common_1.Param)('startupId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('_id')),
    __param(3, (0, current_user_decorator_1.CurrentUser)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, startup_dto_1.UpdateStartupDto, String, String]),
    __metadata("design:returntype", void 0)
], FoundersController.prototype, "updateMyStartup", null);
__decorate([
    (0, common_1.Patch)('my/profile/:founderId'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.FOUNDER),
    __param(0, (0, common_1.Param)('founderId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, founder_dto_1.UpdateFounderDto, String]),
    __metadata("design:returntype", void 0)
], FoundersController.prototype, "updateMyProfile", null);
__decorate([
    (0, common_1.Get)('startup/:startupId'),
    __param(0, (0, common_1.Param)('startupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FoundersController.prototype, "findByStartup", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FoundersController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO, enums_1.UserRole.FOUNDER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, founder_dto_1.UpdateFounderDto, String]),
    __metadata("design:returntype", void 0)
], FoundersController.prototype, "update", null);
exports.FoundersController = FoundersController = __decorate([
    (0, common_1.Controller)('founders'),
    __metadata("design:paramtypes", [founders_service_1.FoundersService])
], FoundersController);
//# sourceMappingURL=founders.controller.js.map