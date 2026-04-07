import { UserRole } from '../../../common/enums';
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
export declare class LoginDto {
    email: string;
    password: string;
}
