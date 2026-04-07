import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Startup, StartupDocument } from '../startups/startup.schema';
import { Evaluation, EvaluationDocument } from '../evaluations/evaluation.schema';
import { Milestone, MilestoneDocument } from '../milestones/milestone.schema';
import { Financial, FinancialDocument } from '../financials/financial.schema';
import { MilestoneStatus, StartupStatus, DisbursementStatus } from '../../common/enums';

/**
 * Intelligence layer — currently uses mock/heuristic logic.
 * Designed so each method can be swapped with an ML model later
 * without changing the calling interface.
 */
@Injectable()
export class IntelligenceService {
  // Weights for scoring (sum = 1.0)
  private readonly SCORE_WEIGHTS = {
    evaluationScore: 0.40,
    milestoneCompletion: 0.25,
    financialHealth: 0.20,
    documentCompletion: 0.15,
  };

  constructor(
    @InjectModel(Startup.name) private startupModel: Model<StartupDocument>,
    @InjectModel(Evaluation.name) private evaluationModel: Model<EvaluationDocument>,
    @InjectModel(Milestone.name) private milestoneModel: Model<MilestoneDocument>,
    @InjectModel(Financial.name) private financialModel: Model<FinancialDocument>,
  ) {}

  /**
   * Calculate a composite startup health score (0-100).
   * Weighted heuristic — replace with ML model in v2.
   */
  async calculateStartupScore(startupId: string): Promise<number> {
    const sid = new Types.ObjectId(startupId);

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

    const completedMilestones = milestones.filter((m) => m.status === MilestoneStatus.COMPLETED).length;
    const milestoneScore = milestones.length > 0 ? (completedMilestones / milestones.length) * 100 : 0;

    const totalAmount = financials.reduce((s, f) => s + f.amount, 0);
    const disbursedAmount = financials
      .filter((f) => f.status === DisbursementStatus.DISBURSED)
      .reduce((s, f) => s + f.amount, 0);
    const financialScore = totalAmount > 0 ? (disbursedAmount / totalAmount) * 100 : 50;

    const documentScore = 75; // mock — replace with real doc count check

    const composite =
      evalScore * this.SCORE_WEIGHTS.evaluationScore +
      milestoneScore * this.SCORE_WEIGHTS.milestoneCompletion +
      financialScore * this.SCORE_WEIGHTS.financialHealth +
      documentScore * this.SCORE_WEIGHTS.documentCompletion;

    return Math.round(composite * 10) / 10;
  }

  /**
   * Generate actionable recommendations for a startup.
   * Rules-based in v1 — designed for ML replacement in v2.
   */
  async generateRecommendations(startupId: string): Promise<string[]> {
    const sid = new Types.ObjectId(startupId);
    const recommendations: string[] = [];

    const [evalCount, overdueMilestones, pendingFinancials, startup] = await Promise.all([
      this.evaluationModel.countDocuments({ startupId: sid }),
      this.milestoneModel.countDocuments({
        startupId: sid,
        deadline: { $lt: new Date() },
        status: { $nin: [MilestoneStatus.COMPLETED] },
      }),
      this.financialModel.countDocuments({ startupId: sid, status: DisbursementStatus.PENDING }),
      this.startupModel.findById(sid).lean(),
    ]);

    if (evalCount === 0) {
      recommendations.push('No evaluations yet — assign reviewers to score this startup.');
    } else if (evalCount < 3) {
      recommendations.push(`Only ${evalCount} reviewer(s) — add more for a balanced evaluation.`);
    }

    if (overdueMilestones > 0) {
      recommendations.push(
        `${overdueMilestones} overdue milestone(s) — review timeline and resource allocation.`,
      );
    }

    if (pendingFinancials > 0) {
      recommendations.push(
        `${pendingFinancials} pending disbursement(s) — finance team review required.`,
      );
    }

    if (startup?.isFlagged) {
      recommendations.push(`⚠️ Startup is flagged: ${startup.flagReason ?? 'Review required'}`);
    }

    if (recommendations.length === 0) {
      recommendations.push('Startup is on track. Continue monitoring monthly milestones.');
    }

    return recommendations;
  }

  /**
   * Cohort health report — used by CEO dashboard.
   */
  async getCohortReport(cohortYear: number) {
    const startups = await this.startupModel
      .find({ cohortYear, status: StartupStatus.ACTIVE })
      .lean();

    const reports = await Promise.all(
      startups.map(async (s) => {
        const score = await this.calculateStartupScore(s._id.toString());
        const recommendations = await this.generateRecommendations(s._id.toString());
        return {
          startup: { _id: s._id, name: s.name, sector: s.sector, stage: s.stage },
          score,
          recommendations,
          isFlagged: s.isFlagged,
        };
      }),
    );

    return reports.sort((a, b) => b.score - a.score);
  }

  /**
   * Scan for at-risk startups — returns summary (no real-time broadcast).
   */
  async runRiskScan() {
    const startups = await this.startupModel.find({ status: StartupStatus.ACTIVE }).lean();
    const flagged: Array<{ id: string; name: string; overdueMilestones: number }> = [];

    for (const startup of startups) {
      const overdue = await this.milestoneModel.countDocuments({
        startupId: startup._id,
        deadline: { $lt: new Date() },
        status: { $nin: [MilestoneStatus.COMPLETED] },
      });

      if (overdue >= 3) {
        flagged.push({ id: startup._id.toString(), name: startup.name, overdueMilestones: overdue });
      }
    }

    return { scanned: startups.length, flaggedCount: flagged.length, flagged };
  }
}
