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
exports.CohortController = void 0;
const common_1 = require("@nestjs/common");
const cohort_service_1 = require("./cohort.service");
const create_cohort_dto_1 = require("./dto/create-cohort.dto");
const apply_cohort_dto_1 = require("./dto/apply-cohort.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const enums_1 = require("../../common/enums");
class GeneratePosterDto {
    name;
    year;
    tagline;
    sectors;
    description;
}
let CohortController = class CohortController {
    cohortService;
    constructor(cohortService) {
        this.cohortService = cohortService;
    }
    create(dto, req) {
        return this.cohortService.create(dto, req.user._id.toString());
    }
    findAll(year) {
        return this.cohortService.findAll(year ? +year : undefined);
    }
    generatePoster(body) {
        return this.cohortService.generatePoster(body);
    }
    syncResponses(id) {
        return this.cohortService.syncFormResponses(id);
    }
    findOne(id) {
        return this.cohortService.findOne(id);
    }
    apply(id, dto) {
        return this.cohortService.applyToCohort(id, dto);
    }
};
exports.CohortController = CohortController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cohort_dto_1.CreateCohortDto, Object]),
    __metadata("design:returntype", void 0)
], CohortController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO),
    __param(0, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CohortController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('generate-poster'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneratePosterDto]),
    __metadata("design:returntype", void 0)
], CohortController.prototype, "generatePoster", null);
__decorate([
    (0, common_1.Post)(':id/sync-responses'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CEO),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CohortController.prototype, "syncResponses", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CohortController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/apply'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apply_cohort_dto_1.ApplyCohortDto]),
    __metadata("design:returntype", void 0)
], CohortController.prototype, "apply", null);
exports.CohortController = CohortController = __decorate([
    (0, common_1.Controller)('cohorts'),
    __metadata("design:paramtypes", [cohort_service_1.CohortService])
], CohortController);
//# sourceMappingURL=cohort.controller.js.map