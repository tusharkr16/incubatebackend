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
exports.IntelligenceController = void 0;
const common_1 = require("@nestjs/common");
const intelligence_service_1 = require("./intelligence.service");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const enums_1 = require("../../common/enums");
let IntelligenceController = class IntelligenceController {
    intelligenceService;
    constructor(intelligenceService) {
        this.intelligenceService = intelligenceService;
    }
    getScore(id) {
        return this.intelligenceService.calculateStartupScore(id);
    }
    getRecommendations(id) {
        return this.intelligenceService.generateRecommendations(id);
    }
    getCohortReport(year) {
        return this.intelligenceService.getCohortReport(+year);
    }
    runRiskScan() {
        return this.intelligenceService.runRiskScan();
    }
};
exports.IntelligenceController = IntelligenceController;
__decorate([
    (0, common_1.Get)('startup/:id/score'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IntelligenceController.prototype, "getScore", null);
__decorate([
    (0, common_1.Get)('startup/:id/recommendations'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IntelligenceController.prototype, "getRecommendations", null);
__decorate([
    (0, common_1.Get)('cohort-report'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO),
    __param(0, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IntelligenceController.prototype, "getCohortReport", null);
__decorate([
    (0, common_1.Post)('risk-scan'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IntelligenceController.prototype, "runRiskScan", null);
exports.IntelligenceController = IntelligenceController = __decorate([
    (0, common_1.Controller)('intelligence'),
    __metadata("design:paramtypes", [intelligence_service_1.IntelligenceService])
], IntelligenceController);
//# sourceMappingURL=intelligence.controller.js.map