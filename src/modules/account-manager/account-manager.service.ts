import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StartupAssignment, StartupAssignmentDocument } from './startup-assignment.schema';
import { AmReview, AmReviewDocument } from './am-review.schema';
import { AssignStartupDto, CreateAmReviewDto } from './dto/account-manager.dto';

@Injectable()
export class AccountManagerService {
  constructor(
    @InjectModel(StartupAssignment.name)
    private assignmentModel: Model<StartupAssignmentDocument>,
    @InjectModel(AmReview.name)
    private reviewModel: Model<AmReviewDocument>,
  ) {}

  /** Assign a startup to an account manager */
  async assignStartup(dto: AssignStartupDto) {
    const existing = await this.assignmentModel.findOne({
      accountManagerId: new Types.ObjectId(dto.accountManagerId),
      startupId: new Types.ObjectId(dto.startupId),
    });
    if (existing) {
      return this.assignmentModel
        .findByIdAndUpdate(existing._id, { notes: dto.notes, isActive: true }, { new: true })
        .populate('accountManagerId', 'name email')
        .populate('startupId', 'name sector stage status')
        .lean();
    }
    const doc = await this.assignmentModel.create({
      accountManagerId: new Types.ObjectId(dto.accountManagerId),
      startupId: new Types.ObjectId(dto.startupId),
      notes: dto.notes,
    });
    return this.assignmentModel
      .findById(doc._id)
      .populate('accountManagerId', 'name email')
      .populate('startupId', 'name sector stage status')
      .lean();
  }

  /** All startups assigned to an account manager */
  async getAssignedStartups(accountManagerId: string) {
    return this.assignmentModel
      .find({ accountManagerId: new Types.ObjectId(accountManagerId), isActive: true })
      .populate('startupId', 'name sector stage status cohortYear latestScore description')
      .sort({ createdAt: -1 })
      .lean();
  }

  /** Which account manager is assigned to a startup + their info */
  async getStartupAccountManager(startupId: string) {
    return this.assignmentModel
      .findOne({ startupId: new Types.ObjectId(startupId), isActive: true })
      .populate('accountManagerId', 'name email role')
      .lean();
  }

  /** All active assignments (admin/ceo) */
  async getAllAssignments() {
    return this.assignmentModel
      .find({ isActive: true })
      .populate('accountManagerId', 'name email')
      .populate('startupId', 'name sector stage status cohortYear')
      .sort({ createdAt: -1 })
      .lean();
  }

  /** Unassign */
  async unassign(assignmentId: string) {
    const doc = await this.assignmentModel.findByIdAndUpdate(
      assignmentId,
      { isActive: false },
      { new: true },
    );
    if (!doc) throw new NotFoundException(`Assignment ${assignmentId} not found`);
    return doc;
  }

  /** AM adds a review/insight for a startup */
  async createReview(dto: CreateAmReviewDto, accountManagerId: string) {
    const review = await this.reviewModel.create({
      accountManagerId: new Types.ObjectId(accountManagerId),
      startupId: new Types.ObjectId(dto.startupId),
      category: dto.category,
      content: dto.content,
      rating: dto.rating,
      visibleToFounder: dto.visibleToFounder ?? true,
    });
    return this.reviewModel
      .findById(review._id)
      .populate('accountManagerId', 'name email')
      .lean();
  }

  /** All reviews for a startup */
  async getStartupReviews(startupId: string, founderView = false) {
    const filter: Record<string, unknown> = { startupId: new Types.ObjectId(startupId) };
    if (founderView) filter.visibleToFounder = true;
    return this.reviewModel
      .find(filter)
      .populate('accountManagerId', 'name email')
      .sort({ createdAt: -1 })
      .lean();
  }

  /** All reviews posted by this AM */
  async getMyReviews(accountManagerId: string) {
    return this.reviewModel
      .find({ accountManagerId: new Types.ObjectId(accountManagerId) })
      .populate('startupId', 'name sector stage')
      .sort({ createdAt: -1 })
      .lean();
  }

  /** Delete a review (AM or admin) */
  async deleteReview(reviewId: string) {
    const doc = await this.reviewModel.findByIdAndDelete(reviewId);
    if (!doc) throw new NotFoundException(`Review ${reviewId} not found`);
    return { deleted: true };
  }
}
