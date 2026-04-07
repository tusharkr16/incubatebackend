import { FundingInterestsService } from './funding-interests.service';
import { CreateFundingInterestDto, UpdateFundingInterestDto } from './dto/funding-interest.dto';
export declare class FundingInterestsController {
    private service;
    constructor(service: FundingInterestsService);
    create(dto: CreateFundingInterestDto, investorId: string): Promise<(import("./funding-interest.schema").FundingInterest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getSummary(): Promise<any[]>;
    getMyInterests(investorId: string): Promise<(import("./funding-interest.schema").FundingInterest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getByStartup(startupId: string): Promise<(import("./funding-interest.schema").FundingInterest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    updateStatus(id: string, dto: UpdateFundingInterestDto, userId: string): Promise<(import("./funding-interest.schema").FundingInterest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
