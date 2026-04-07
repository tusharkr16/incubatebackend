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
exports.CohortSchema = exports.Cohort = exports.CohortStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var CohortStatus;
(function (CohortStatus) {
    CohortStatus["DRAFT"] = "draft";
    CohortStatus["OPEN"] = "open";
    CohortStatus["CLOSED"] = "closed";
})(CohortStatus || (exports.CohortStatus = CohortStatus = {}));
let Cohort = class Cohort {
    name;
    year;
    description;
    tagline;
    sectors;
    applicationDeadline;
    maxStartups;
    googleFormUrl;
    googleFormId;
    googleFormQuestionIds;
    syncedResponseIds;
    status;
    createdBy;
};
exports.Cohort = Cohort;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Cohort.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", Number)
], Cohort.prototype, "year", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Cohort.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Cohort.prototype, "tagline", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Cohort.prototype, "sectors", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Cohort.prototype, "applicationDeadline", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 20 }),
    __metadata("design:type", Number)
], Cohort.prototype, "maxStartups", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Cohort.prototype, "googleFormUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Cohort.prototype, "googleFormId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Map, of: String, default: {} }),
    __metadata("design:type", Map)
], Cohort.prototype, "googleFormQuestionIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Cohort.prototype, "syncedResponseIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: CohortStatus, default: CohortStatus.OPEN }),
    __metadata("design:type", String)
], Cohort.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Cohort.prototype, "createdBy", void 0);
exports.Cohort = Cohort = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'cohorts' })
], Cohort);
exports.CohortSchema = mongoose_1.SchemaFactory.createForClass(Cohort);
exports.CohortSchema.index({ year: -1, status: 1 });
//# sourceMappingURL=cohort.schema.js.map