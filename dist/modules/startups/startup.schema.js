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
exports.StartupSchema = exports.Startup = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../common/enums");
let SectorInfo = class SectorInfo {
    primary;
    tags;
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SectorInfo.prototype, "primary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], SectorInfo.prototype, "tags", void 0);
SectorInfo = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], SectorInfo);
let Startup = class Startup {
    name;
    sector;
    stage;
    founderIds;
    assignedInvestorIds;
    status;
    createdBy;
    cohortYear;
    description;
    website;
    latestScore;
    isFlagged;
    flagReason;
    schemeName;
    pitchDeckLink;
    incorporationDate;
    cinNumber;
    fundingSecured;
    fundingScheme;
    dateOfRelease;
};
exports.Startup = Startup;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Startup.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: SectorInfo, required: true }),
    __metadata("design:type", SectorInfo)
], Startup.prototype, "sector", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: enums_1.StartupStage, index: true }),
    __metadata("design:type", String)
], Startup.prototype, "stage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Founder', default: [] }),
    __metadata("design:type", Array)
], Startup.prototype, "founderIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'User', default: [] }),
    __metadata("design:type", Array)
], Startup.prototype, "assignedInvestorIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: enums_1.StartupStatus, default: enums_1.StartupStatus.ACTIVE, index: true }),
    __metadata("design:type", String)
], Startup.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Startup.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", Number)
], Startup.prototype, "cohortYear", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Startup.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Startup.prototype, "website", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Startup.prototype, "latestScore", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Startup.prototype, "isFlagged", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Startup.prototype, "flagReason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Startup.prototype, "schemeName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Startup.prototype, "pitchDeckLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Startup.prototype, "incorporationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], Startup.prototype, "cinNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Startup.prototype, "fundingSecured", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Startup.prototype, "fundingScheme", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Startup.prototype, "dateOfRelease", void 0);
exports.Startup = Startup = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'startups' })
], Startup);
exports.StartupSchema = mongoose_1.SchemaFactory.createForClass(Startup);
exports.StartupSchema.index({ status: 1, cohortYear: 1 });
exports.StartupSchema.index({ 'sector.primary': 1 });
exports.StartupSchema.index({ latestScore: -1 });
exports.StartupSchema.index({ assignedInvestorIds: 1 });
exports.StartupSchema.index({ createdAt: -1 });
//# sourceMappingURL=startup.schema.js.map