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
exports.FundingInterestsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const funding_interest_schema_1 = require("./funding-interest.schema");
const enums_1 = require("../../common/enums");
let FundingInterestsService = class FundingInterestsService {
    interestModel;
    constructor(interestModel) {
        this.interestModel = interestModel;
    }
    async create(dto, investorId) {
        const existing = await this.interestModel.findOne({
            startupId: new mongoose_2.Types.ObjectId(dto.startupId),
            investorId: new mongoose_2.Types.ObjectId(investorId),
        });
        if (existing) {
            return this.interestModel
                .findByIdAndUpdate(existing._id, { amount: dto.amount, currency: dto.currency ?? 'INR', message: dto.message, phone: dto.phone, contactUrl: dto.contactUrl }, { new: true })
                .populate('investorId', 'name email')
                .lean();
        }
        const interest = await this.interestModel.create({
            startupId: new mongoose_2.Types.ObjectId(dto.startupId),
            investorId: new mongoose_2.Types.ObjectId(investorId),
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
    async getByStartup(startupId) {
        return this.interestModel
            .find({ startupId: new mongoose_2.Types.ObjectId(startupId) })
            .populate('investorId', 'name email')
            .sort({ createdAt: -1 })
            .lean();
    }
    async getMyInterests(investorId) {
        return this.interestModel
            .find({ investorId: new mongoose_2.Types.ObjectId(investorId) })
            .populate('startupId', 'name sector stage status cohortYear latestScore description schemeName website pitchDeckLink')
            .sort({ createdAt: -1 })
            .lean();
    }
    async getSummaryByStartup() {
        return this.interestModel.aggregate([
            {
                $group: {
                    _id: '$startupId',
                    totalAmount: { $sum: '$amount' },
                    investorCount: { $sum: 1 },
                    acceptedAmount: {
                        $sum: { $cond: [{ $eq: ['$status', enums_1.FundingInterestStatus.ACCEPTED] }, '$amount', 0] },
                    },
                    pendingAmount: {
                        $sum: { $cond: [{ $eq: ['$status', enums_1.FundingInterestStatus.PENDING] }, '$amount', 0] },
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
    async updateStatus(id, dto, userId) {
        const record = await this.interestModel.findById(id);
        if (!record)
            throw new common_1.NotFoundException(`Funding interest ${id} not found`);
        return this.interestModel
            .findByIdAndUpdate(id, { status: dto.status }, { new: true })
            .populate('investorId', 'name email')
            .lean();
    }
};
exports.FundingInterestsService = FundingInterestsService;
exports.FundingInterestsService = FundingInterestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(funding_interest_schema_1.FundingInterest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FundingInterestsService);
//# sourceMappingURL=funding-interests.service.js.map