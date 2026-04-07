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
exports.FinancialsController = void 0;
const common_1 = require("@nestjs/common");
const financials_service_1 = require("./financials.service");
const financial_dto_1 = require("./dto/financial.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const enums_1 = require("../../common/enums");
let FinancialsController = class FinancialsController {
    financialsService;
    constructor(financialsService) {
        this.financialsService = financialsService;
    }
    create(dto, userId) {
        return this.financialsService.create(dto, userId);
    }
    getFundedStartups() {
        return this.financialsService.getFundedStartups();
    }
    findByStartup(startupId, page = 1, limit = 20) {
        return this.financialsService.findByStartup(startupId, +page, +limit);
    }
    getSummary(startupId) {
        return this.financialsService.getStartupFinancialSummary(startupId);
    }
    updateStatus(id, dto, userId, userRole) {
        return this.financialsService.updateStatus(id, dto, userId, userRole);
    }
};
exports.FinancialsController = FinancialsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO, enums_1.UserRole.FINANCE),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [financial_dto_1.CreateFinancialDto, String]),
    __metadata("design:returntype", void 0)
], FinancialsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('funded-startups'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO, enums_1.UserRole.FINANCE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinancialsController.prototype, "getFundedStartups", null);
__decorate([
    (0, common_1.Get)('startup/:startupId'),
    __param(0, (0, common_1.Param)('startupId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], FinancialsController.prototype, "findByStartup", null);
__decorate([
    (0, common_1.Get)('startup/:startupId/summary'),
    __param(0, (0, common_1.Param)('startupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FinancialsController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO, enums_1.UserRole.FINANCE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('_id')),
    __param(3, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, financial_dto_1.UpdateFinancialStatusDto, String, String]),
    __metadata("design:returntype", void 0)
], FinancialsController.prototype, "updateStatus", null);
exports.FinancialsController = FinancialsController = __decorate([
    (0, common_1.Controller)('financials'),
    __metadata("design:paramtypes", [financials_service_1.FinancialsService])
], FinancialsController);
//# sourceMappingURL=financials.controller.js.map