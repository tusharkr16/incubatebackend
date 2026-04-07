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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyCohortDto = exports.ApplyStage = void 0;
const class_validator_1 = require("class-validator");
var ApplyStage;
(function (ApplyStage) {
    ApplyStage["IDEATION"] = "ideation";
    ApplyStage["VALIDATION"] = "validation";
    ApplyStage["EARLY_TRACTION"] = "early_traction";
    ApplyStage["GROWTH"] = "growth";
})(ApplyStage || (exports.ApplyStage = ApplyStage = {}));
class ApplyCohortDto {
    companyName;
    sector;
    stage;
    description;
    website;
    founderName;
    founderEmail;
    founderLinkedin;
    founderBio;
    founderSkills;
}
exports.ApplyCohortDto = ApplyCohortDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplyCohortDto.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplyCohortDto.prototype, "sector", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ApplyStage),
    __metadata("design:type", String)
], ApplyCohortDto.prototype, "stage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplyCohortDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplyCohortDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplyCohortDto.prototype, "founderName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ApplyCohortDto.prototype, "founderEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplyCohortDto.prototype, "founderLinkedin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplyCohortDto.prototype, "founderBio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplyCohortDto.prototype, "founderSkills", void 0);
//# sourceMappingURL=apply-cohort.dto.js.map