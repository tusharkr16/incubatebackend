import { Model, Types } from 'mongoose';
import { FundingInterest, FundingInterestDocument } from './funding-interest.schema';
import { CreateFundingInterestDto, UpdateFundingInterestDto } from './dto/funding-interest.dto';
export declare class FundingInterestsService {
    private interestModel;
    constructor(interestModel: Model<FundingInterestDocument>);
    create(dto: CreateFundingInterestDto, investorId: string): Promise<(FundingInterest & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getByStartup(startupId: string): Promise<(FundingInterest & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getMyInterests(investorId: string): Promise<(FundingInterest & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getSummaryByStartup(): Promise<any[]>;
    updateStatus(id: string, dto: UpdateFundingInterestDto, userId: string): Promise<(FundingInterest & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
