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
exports.MilestoneSchema = exports.Milestone = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../common/enums");
let Milestone = class Milestone {
    startupId;
    title;
    description;
    status;
    deadline;
    progressPercent;
    createdBy;
    updatedBy;
    isDelayed;
    delayReason;
    completedAt;
};
exports.Milestone = Milestone;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Startup', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Milestone.prototype, "startupId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Milestone.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Milestone.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: enums_1.MilestoneStatus, default: enums_1.MilestoneStatus.PENDING, index: true }),
    __metadata("design:type", String)
], Milestone.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date, index: true }),
    __metadata("design:type", Date)
], Milestone.prototype, "deadline", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0, max: 100 }),
    __metadata("design:type", Number)
], Milestone.prototype, "progressPercent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Milestone.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Milestone.prototype, "updatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Milestone.prototype, "isDelayed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Milestone.prototype, "delayReason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Milestone.prototype, "completedAt", void 0);
exports.Milestone = Milestone = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'milestones' })
], Milestone);
exports.MilestoneSchema = mongoose_1.SchemaFactory.createForClass(Milestone);
exports.MilestoneSchema.index({ startupId: 1, status: 1 });
exports.MilestoneSchema.index({ deadline: 1 });
exports.MilestoneSchema.index({ startupId: 1, deadline: 1 });
//# sourceMappingURL=milestone.schema.js.map