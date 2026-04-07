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
exports.EvaluationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const evaluation_schema_1 = require("./evaluation.schema");
const audit_service_1 = require("../audit/audit.service");
const startups_service_1 = require("../startups/startups.service");
const enums_1 = require("../../common/enums");
let EvaluationsService = class EvaluationsService {
    evaluationModel;
    auditService;
    startupsService;
    constructor(evaluationModel, auditService, startupsService) {
        this.evaluationModel = evaluationModel;
        this.auditService = auditService;
        this.startupsService = startupsService;
    }
    async create(dto, reviewerId) {
        const totalScore = this.computeTotalScore(dto.scores);
        const existing = await this.evaluationModel.findOne({
            startupId: new mongoose_2.Types.ObjectId(dto.startupId),
            reviewerId: new mongoose_2.Types.ObjectId(reviewerId),
            version: 1,
        });
        if (existing) {
            throw new common_1.ConflictException('You have already submitted an evaluation for this startup. Use update to revise.');
        }
        const evaluation = await this.evaluationModel.create({
            startupId: new mongoose_2.Types.ObjectId(dto.startupId),
            reviewerId: new mongoose_2.Types.ObjectId(reviewerId),
            scores: dto.scores,
            totalScore,
            notes: dto.notes,
            recommendation: dto.recommendation,
        });
        await this.recalculateStartupScore(dto.startupId);
        await this.auditService.log({
            entityType: enums_1.AuditEntityType.EVALUATION,
            entityId: evaluation._id,
            action: enums_1.AuditAction.EVALUATE,
            performedBy: new mongoose_2.Types.ObjectId(reviewerId),
            changes: { totalScore: { before: null, after: totalScore } },
        });
        return evaluation;
    }
    async findByStartup(startupId) {
        return this.evaluationModel
            .find({ startupId: new mongoose_2.Types.ObjectId(startupId) })
            .sort({ createdAt: -1 })
            .populate('reviewerId', 'name email role')
            .lean();
    }
    async getStartupAggregateScore(startupId) {
        const result = await this.evaluationModel.aggregate([
            { $match: { startupId: new mongoose_2.Types.ObjectId(startupId) } },
            {
                $group: {
                    _id: '$startupId',
                    avgTotal: { $avg: '$totalScore' },
                    avgSector: { $avg: '$scores.sector' },
                    avgStage: { $avg: '$scores.stage' },
                    avgFounderStrength: { $avg: '$scores.founderStrength' },
                    avgIncorporation: { $avg: '$scores.incorporation' },
                    avgProblemMarket: { $avg: '$scores.problemMarket' },
                    avgGtm: { $avg: '$scores.gtm' },
                    avgMarketValidation: { $avg: '$scores.marketValidation' },
                    evaluationCount: { $sum: 1 },
                },
            },
        ]);
        return result[0] ?? null;
    }
    computeTotalScore(scores) {
        return (scores.sector +
            scores.stage +
            scores.founderStrength +
            scores.incorporation +
            scores.problemMarket +
            scores.gtm +
            scores.marketValidation);
    }
    async recalculateStartupScore(startupId) {
        const agg = await this.getStartupAggregateScore(startupId);
        if (agg) {
            await this.startupsService.updateScore(startupId, Math.round(agg.avgTotal * 10) / 10);
        }
    }
};
exports.EvaluationsService = EvaluationsService;
exports.EvaluationsService = EvaluationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(evaluation_schema_1.Evaluation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        audit_service_1.AuditService,
        startups_service_1.StartupsService])
], EvaluationsService);
//# sourceMappingURL=evaluations.service.js.map