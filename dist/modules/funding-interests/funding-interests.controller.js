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
exports.FundingInterestsController = void 0;
const common_1 = require("@nestjs/common");
const funding_interests_service_1 = require("./funding-interests.service");
const funding_interest_dto_1 = require("./dto/funding-interest.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const enums_1 = require("../../common/enums");
let FundingInterestsController = class FundingInterestsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, investorId) {
        return this.service.create(dto, investorId);
    }
    getSummary() {
        return this.service.getSummaryByStartup();
    }
    getMyInterests(investorId) {
        return this.service.getMyInterests(investorId);
    }
    getByStartup(startupId) {
        return this.service.getByStartup(startupId);
    }
    updateStatus(id, dto, userId) {
        return this.service.updateStatus(id, dto, userId);
    }
};
exports.FundingInterestsController = FundingInterestsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.INVESTOR),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [funding_interest_dto_1.CreateFundingInterestDto, String]),
    __metadata("design:returntype", void 0)
], FundingInterestsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('summary'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.INVESTOR, enums_1.UserRole.ADMIN, enums_1.UserRole.CEO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FundingInterestsController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.INVESTOR),
    __param(0, (0, current_user_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FundingInterestsController.prototype, "getMyInterests", null);
__decorate([
    (0, common_1.Get)('startup/:startupId'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO, enums_1.UserRole.FOUNDER, enums_1.UserRole.INVESTOR),
    __param(0, (0, common_1.Param)('startupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FundingInterestsController.prototype, "getByStartup", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO, enums_1.UserRole.FOUNDER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, funding_interest_dto_1.UpdateFundingInterestDto, String]),
    __metadata("design:returntype", void 0)
], FundingInterestsController.prototype, "updateStatus", null);
exports.FundingInterestsController = FundingInterestsController = __decorate([
    (0, common_1.Controller)('funding-interests'),
    __metadata("design:paramtypes", [funding_interests_service_1.FundingInterestsService])
], FundingInterestsController);
//# sourceMappingURL=funding-interests.controller.js.map