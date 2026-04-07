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
exports.StartupsController = void 0;
const common_1 = require("@nestjs/common");
const startups_service_1 = require("./startups.service");
const startup_dto_1 = require("./dto/startup.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const enums_1 = require("../../common/enums");
let StartupsController = class StartupsController {
    startupsService;
    constructor(startupsService) {
        this.startupsService = startupsService;
    }
    create(dto, userId) {
        return this.startupsService.create(dto, userId);
    }
    findAll(user, status, stage, cohortYear, sector, search, page = 1, limit = 20) {
        return this.startupsService.findAll(user, {
            status,
            stage,
            cohortYear: cohortYear ? +cohortYear : undefined,
            sector,
            search,
            page: +page,
            limit: +limit,
        });
    }
    getLeaderboard(cohortYear) {
        return this.startupsService.getLeaderboard(cohortYear ? +cohortYear : undefined);
    }
    findById(id, user) {
        return this.startupsService.findById(id, user);
    }
    update(id, dto, userId, userRole) {
        return this.startupsService.update(id, dto, userId, userRole);
    }
};
exports.StartupsController = StartupsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [startup_dto_1.CreateStartupDto, String]),
    __metadata("design:returntype", void 0)
], StartupsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('stage')),
    __param(3, (0, common_1.Query)('cohortYear')),
    __param(4, (0, common_1.Query)('sector')),
    __param(5, (0, common_1.Query)('search')),
    __param(6, (0, common_1.Query)('page')),
    __param(7, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], StartupsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('leaderboard'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO, enums_1.UserRole.INVESTOR),
    __param(0, (0, common_1.Query)('cohortYear')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StartupsController.prototype, "getLeaderboard", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StartupsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('_id')),
    __param(3, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, startup_dto_1.UpdateStartupDto, String, String]),
    __metadata("design:returntype", void 0)
], StartupsController.prototype, "update", null);
exports.StartupsController = StartupsController = __decorate([
    (0, common_1.Controller)('startups'),
    __metadata("design:paramtypes", [startups_service_1.StartupsService])
], StartupsController);
//# sourceMappingURL=startups.controller.js.map