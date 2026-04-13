import { Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FundingInterest, FundingInterestDocument } from './funding-interest.schema';
import { CreateFundingInterestDto, UpdateFundingInterestDto } from './dto/funding-interest.dto';
import { FundingInterestStatus } from '../../common/enums';

@Injectable()
export class FundingInterestsService {
  constructor(
    @InjectModel(FundingInterest.name)
    private interestModel: Model<FundingInterestDocument>,
  ) {}

  async create(dto: CreateFundingInterestDto, investorId: string) {
    const existing = await this.interestModel.findOne({
      startupId: new Types.ObjectId(dto.startupId),
      investorId: new Types.ObjectId(investorId),
    });

    if (existing) {
      // Update the amount/message instead of throwing
      return this.interestModel
        .findByIdAndUpdate(
          existing._id,
          { amount: dto.amount, currency: dto.currency ?? 'INR', message: dto.message, phone: dto.phone, contactUrl: dto.contactUrl },
          { new: true },
        )
        .populate('investorId', 'name email')
        .lean();
    }

    const interest = await this.interestModel.create({
      startupId: new Types.ObjectId(dto.startupId),
      investorId: new Types.ObjectId(investorId),
      amount: dto.amount,
      currency: dto.currency ?? 'INR',
      message: dto.message,
      phone: dto.phone,
      contactUrl: dto.contactUrl,
    });

    return this.interestModel
      .findById(interest._id)
      .populate('investorId', 'name email')
      .lean();
  }

  /** All interests for a startup (admin/ceo/founder of that startup) */
  async getByStartup(startupId: string) {
    return this.interestModel
      .find({ startupId: new Types.ObjectId(startupId) })
      .populate('investorId', 'name email')
      .sort({ createdAt: -1 })
      .lean();
  }

  /** Interests submitted by the calling investor */
  async getMyInterests(investorId: string) {
    return this.interestModel
      .find({ investorId: new Types.ObjectId(investorId) })
      .populate('startupId', 'name sector stage status cohortYear latestScore description schemeName website pitchDeckLink')
      .sort({ createdAt: -1 })
      .lean();
  }

  /**
   * Aggregated summary per startup — used by the investor evaluate page.
   * Returns startups sorted by total pledged amount.
   */
  async getSummaryByStartup() {
    return this.interestModel.aggregate([
      {
        $group: {
          _id: '$startupId',
          totalAmount: { $sum: '$amount' },
          investorCount: { $sum: 1 },
          acceptedAmount: {
            $sum: { $cond: [{ $eq: ['$status', FundingInterestStatus.ACCEPTED] }, '$amount', 0] },
          },
          pendingAmount: {
            $sum: { $cond: [{ $eq: ['$status', FundingInterestStatus.PENDING] }, '$amount', 0] },
          },
          currency: { $first: '$currency' },
          interests: {
            $push: {
              _id: '$_id',
              investorId: '$investorId',
              amount: '$amount',
              status: '$status',
              message: '$message',
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
      // Enrich investor names
      {
        $lookup: {
          from: 'users',
          localField: 'interests.investorId',
          foreignField: '_id',
          as: 'investorUsers',
        },
      },
      { $sort: { totalAmount: -1 } },
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
          totalAmount: 1,
          acceptedAmount: 1,
          pendingAmount: 1,
          investorCount: 1,
          currency: 1,
          interests: 1,
          investorUsers: { $map: { input: '$investorUsers', as: 'u', in: { _id: '$$u._id', name: '$$u.name', email: '$$u.email' } } },
        },
      },
    ]);
  }

  /** Accept or reject an interest (startup founder / admin / ceo) */
  async updateStatus(id: string, dto: UpdateFundingInterestDto, userId: string) {
    const record = await this.interestModel.findById(id);
    if (!record) throw new NotFoundException(`Funding interest ${id} not found`);

    return this.interestModel
      .findByIdAndUpdate(id, { status: dto.status }, { new: true })
      .populate('investorId', 'name email')
      .lean();
  }
}
