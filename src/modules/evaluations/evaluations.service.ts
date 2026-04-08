import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Evaluation, EvaluationDocument } from './evaluation.schema';
import { CreateEvaluationDto } from './dto/evaluation.dto';
import { AuditService } from '../audit/audit.service';
import { StartupsService } from '../startups/startups.service';
import { AuditAction, AuditEntityType } from '../../common/enums';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectModel(Evaluation.name) private evaluationModel: Model<EvaluationDocument>,
    private auditService: AuditService,
    private startupsService: StartupsService,
  ) {}

  async create(dto: CreateEvaluationDto, reviewerId: string) {
    const totalScore = this.computeTotalScore(dto.scores);

    const existing = await this.evaluationModel.findOne({
      startupId: new Types.ObjectId(dto.startupId),
      reviewerId: new Types.ObjectId(reviewerId),
      version: 1,
    });

    if (existing) {
      throw new ConflictException(
        'You have already submitted an evaluation for this startup. Use update to revise.',
      );
    }

    const evaluation = await this.evaluationModel.create({
      startupId: new Types.ObjectId(dto.startupId),
      reviewerId: new Types.ObjectId(reviewerId),
      scores: dto.scores,
      totalScore,
      notes: dto.notes,
      recommendation: dto.recommendation,
    });

    await this.recalculateStartupScore(dto.startupId);

    await this.auditService.log({
      entityType: AuditEntityType.EVALUATION,
      entityId: evaluation._id as any,
      action: AuditAction.EVALUATE,
      performedBy: new Types.ObjectId(reviewerId),
      changes: { totalScore: { before: null, after: totalScore } },
    });

    return evaluation;
  }

  async findByStartup(startupId: string) {
    return this.evaluationModel
      .find({ startupId: new Types.ObjectId(startupId) })
      .sort({ createdAt: -1 })
      .populate('reviewerId', 'name email role')
      .lean();
  }

  async getStartupAggregateScore(startupId: string) {
    const result = await this.evaluationModel.aggregate([
      { $match: { startupId: new Types.ObjectId(startupId) } },
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

  /**
   * All startups that have been evaluated by at least one investor/reviewer,
   * with aggregated score, eval count, and individual evaluation details.
   */
  async getEvaluatedStartups() {
    return this.evaluationModel.aggregate([
      {
        $group: {
          _id: '$startupId',
          evalCount: { $sum: 1 },
          avgScore: { $avg: '$totalScore' },
          evaluations: {
            $push: {
              reviewerId: '$reviewerId',
              totalScore: '$totalScore',
              recommendation: '$recommendation',
              notes: '$notes',
              createdAt: '$createdAt',
            },
          },
        },
      },
      {
        $lookup: {
          from: 'startups',
          localField: '_id',
          foreignField: '_id',
          as: 'startup',
        },
      },
      { $unwind: '$startup' },
      // Enrich reviewer names
      {
        $lookup: {
          from: 'users',
          localField: 'evaluations.reviewerId',
          foreignField: '_id',
          as: 'reviewerUsers',
        },
      },
      { $sort: { avgScore: -1 } },
      {
        $project: {
          _id: 0,
          startupId: '$_id',
          startupName: '$startup.name',
          sector: '$startup.sector',
          stage: '$startup.stage',
          status: '$startup.status',
          latestScore: '$startup.latestScore',
          cohortYear: '$startup.cohortYear',
          evalCount: 1,
          avgScore: 1,
          evaluations: 1,
          reviewerUsers: {
            $map: {
              input: '$reviewerUsers',
              as: 'u',
              in: { _id: '$$u._id', name: '$$u.name', email: '$$u.email' },
            },
          },
        },
      },
    ]);
  }

  private computeTotalScore(scores: CreateEvaluationDto['scores']): number {
    return (
      scores.sector +
      scores.stage +
      scores.founderStrength +
      scores.incorporation +
      scores.problemMarket +
      scores.gtm +
      scores.marketValidation
    );
  }

  private async recalculateStartupScore(startupId: string) {
    const agg = await this.getStartupAggregateScore(startupId);
    if (agg) {
      await this.startupsService.updateScore(startupId, Math.round(agg.avgTotal * 10) / 10);
    }
  }
}
