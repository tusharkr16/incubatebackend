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
exports.EvaluationSchema = exports.Evaluation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let EvaluationScores = class EvaluationScores {
    sector;
    stage;
    founderStrength;
    incorporation;
    problemMarket;
    gtm;
    marketValidation;
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 10 }),
    __metadata("design:type", Number)
], EvaluationScores.prototype, "sector", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 10 }),
    __metadata("design:type", Number)
], EvaluationScores.prototype, "stage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 10 }),
    __metadata("design:type", Number)
], EvaluationScores.prototype, "founderStrength", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 10 }),
    __metadata("design:type", Number)
], EvaluationScores.prototype, "incorporation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 10 }),
    __metadata("design:type", Number)
], EvaluationScores.prototype, "problemMarket", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 10 }),
    __metadata("design:type", Number)
], EvaluationScores.prototype, "gtm", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 10 }),
    __metadata("design:type", Number)
], EvaluationScores.prototype, "marketValidation", void 0);
EvaluationScores = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], EvaluationScores);
let Evaluation = class Evaluation {
    startupId;
    reviewerId;
    scores;
    totalScore;
    notes;
    recommendation;
    version;
};
exports.Evaluation = Evaluation;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Startup', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Evaluation.prototype, "startupId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Evaluation.prototype, "reviewerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: EvaluationScores, required: true }),
    __metadata("design:type", EvaluationScores)
], Evaluation.prototype, "scores", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 70 }),
    __metadata("design:type", Number)
], Evaluation.prototype, "totalScore", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 2000 }),
    __metadata("design:type", String)
], Evaluation.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['strongly_recommend', 'recommend', 'neutral', 'not_recommend'] }),
    __metadata("design:type", String)
], Evaluation.prototype, "recommendation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1 }),
    __metadata("design:type", Number)
], Evaluation.prototype, "version", void 0);
exports.Evaluation = Evaluation = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'evaluations' })
], Evaluation);
exports.EvaluationSchema = mongoose_1.SchemaFactory.createForClass(Evaluation);
exports.EvaluationSchema.index({ startupId: 1, reviewerId: 1 });
exports.EvaluationSchema.index({ startupId: 1, createdAt: -1 });
exports.EvaluationSchema.index({ totalScore: -1 });
exports.EvaluationSchema.index({ startupId: 1, reviewerId: 1, version: 1 }, { unique: true });
//# sourceMappingURL=evaluation.schema.js.map