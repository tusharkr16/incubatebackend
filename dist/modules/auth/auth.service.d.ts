import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/user.schema';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { AuditService } from '../audit/audit.service';
export declare class AuthService {
    private userModel;
    private jwtService;
    private auditService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, auditService: AuditService);
    register(dto: RegisterDto): Promise<{
        token: string;
        user: any;
    }>;
    login(dto: LoginDto, ipAddress?: string): Promise<{
        token: string;
        user: any;
    }>;
    getProfile(userId: string): Promise<any>;
    private generateToken;
    private sanitizeUser;
}
