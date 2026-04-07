import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UpdateUserDto } from './dto/user.dto';
import { UserRole } from '../../common/enums';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findAll(role?: UserRole, page?: number, limit?: number): Promise<{
        users: (User & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findById(id: string): Promise<User & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateUserDto, requesterId: string, requesterRole: UserRole): Promise<User & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findInvestors(): Promise<(User & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getStartupsByFounder(userId: string): Promise<(User & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
