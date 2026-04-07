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
exports.IntelligenceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const startup_schema_1 = require("../startups/startup.schema");
const evaluation_schema_1 = require("../evaluations/evaluation.schema");
const milestone_schema_1 = require("../milestones/milestone.schema");
const financial_schema_1 = require("../financials/financial.schema");
const enums_1 = require("../../common/enums");
let IntelligenceService = class IntelligenceService {
    startupModel;
    evaluationModel;
    milestoneModel;
    financialModel;
    SCORE_WEIGHTS = {
        evaluationScore: 0.40,
        milestoneCompletion: 0.25,
        financialHealth: 0.20,
        documentCompletion: 0.15,
    };
    constructor(startupModel, evaluationModel, milestoneModel, financialModel) {
        this.startupModel = startupModel;
        this.evaluationModel = evaluationModel;
        this.milestoneModel = milestoneModel;
        this.financialModel = financialModel;
    }
    async calculateStartupScore(startupId) {
        const sid = new mongoose_2.Types.ObjectId(startupId);
        const [evalAgg, milestones, financials] = await Promise.all([
            this.evaluationModel.aggregate([
                { $match: { startupId: sid } },
                { $group: { _id: null, avg: { $avg: '$totalScore' } } },
            ]),
            this.milestoneModel.find({ startupId: sid }).lean(),
            this.financialModel.find({ startupId: sid }).lean(),
        ]);
        const rawEvalScore = evalAgg[0]?.avg ?? 0;
        const evalScore = (rawEvalScore / 70) * 100;
        const completedMilestones = milestones.filter((m) => m.status === enums_1.MilestoneStatus.COMPLETED).length;
        const milestoneScore = milestones.length > 0 ? (completedMilestones / milestones.length) * 100 : 0;
        const totalAmount = financials.reduce((s, f) => s + f.amount, 0);
        const disbursedAmount = financials
            .filter((f) => f.status === enums_1.DisbursementStatus.DISBURSED)
            .reduce((s, f) => s + f.amount, 0);
        const financialScore = totalAmount > 0 ? (disbursedAmount / totalAmount) * 100 : 50;
        const documentScore = 75;
        const composite = evalScore * this.SCORE_WEIGHTS.evaluationScore +
            milestoneScore * this.SCORE_WEIGHTS.milestoneCompletion +
            financialScore * this.SCORE_WEIGHTS.financialHealth +
            documentScore * this.SCORE_WEIGHTS.documentCompletion;
        return Math.round(composite * 10) / 10;
    }
    async generateRecommendations(startupId) {
        const sid = new mongoose_2.Types.ObjectId(startupId);
        const recommendations = [];
        const [evalCount, overdueMilestones, pendingFinancials, startup] = await Promise.all([
            this.evaluationModel.countDocuments({ startupId: sid }),
            this.milestoneModel.countDocuments({
                startupId: sid,
                deadline: { $lt: new Date() },
                status: { $nin: [enums_1.MilestoneStatus.COMPLETED] },
            }),
            this.financialModel.countDocuments({ startupId: sid, status: enums_1.DisbursementStatus.PENDING }),
            this.startupModel.findById(sid).lean(),
        ]);
        if (evalCount === 0) {
            recommendations.push('No evaluations yet — assign reviewers to score this startup.');
        }
        else if (evalCount < 3) {
            recommendations.push(`Only ${evalCount} reviewer(s) — add more for a balanced evaluation.`);
        }
        if (overdueMilestones > 0) {
            recommendations.push(`${overdueMilestones} overdue milestone(s) — review timeline and resource allocation.`);
        }
        if (pendingFinancials > 0) {
            recommendations.push(`${pendingFinancials} pending disbursement(s) — finance team review required.`);
        }
        if (startup?.isFlagged) {
            recommendations.push(`⚠️ Startup is flagged: ${startup.flagReason ?? 'Review required'}`);
        }
        if (recommendations.length === 0) {
            recommendations.push('Startup is on track. Continue monitoring monthly milestones.');
        }
        return recommendations;
    }
    async getCohortReport(cohortYear) {
        const startups = await this.startupModel
            .find({ cohortYear, status: enums_1.StartupStatus.ACTIVE })
            .lean();
        const reports = await Promise.all(startups.map(async (s) => {
            const score = await this.calculateStartupScore(s._id.toString());
            const recommendations = await this.generateRecommendations(s._id.toString());
            return {
                startup: { _id: s._id, name: s.name, sector: s.sector, stage: s.stage },
                score,
                recommendations,
                isFlagged: s.isFlagged,
            };
        }));
        return reports.sort((a, b) => b.score - a.score);
    }
    async runRiskScan() {
        const startups = await this.startupModel.find({ status: enums_1.StartupStatus.ACTIVE }).lean();
        const flagged = [];
        for (const startup of startups) {
            const overdue = await this.milestoneModel.countDocuments({
                startupId: startup._id,
                deadline: { $lt: new Date() },
                status: { $nin: [enums_1.MilestoneStatus.COMPLETED] },
            });
            if (overdue >= 3) {
                flagged.push({ id: startup._id.toString(), name: startup.name, overdueMilestones: overdue });
            }
        }
        return { scanned: startups.length, flaggedCount: flagged.length, flagged };
    }
};
exports.IntelligenceService = IntelligenceService;
exports.IntelligenceService = IntelligenceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(startup_schema_1.Startup.name)),
    __param(1, (0, mongoose_1.InjectModel)(evaluation_schema_1.Evaluation.name)),
    __param(2, (0, mongoose_1.InjectModel)(milestone_schema_1.Milestone.name)),
    __param(3, (0, mongoose_1.InjectModel)(financial_schema_1.Financial.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], IntelligenceService);
//# sourceMappingURL=intelligence.service.js.map