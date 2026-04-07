import { ConfigService } from '@nestjs/config';
export declare class CloudinaryService {
    private config;
    constructor(config: ConfigService);
    uploadFile(file: Express.Multer.File, folder?: string): Promise<{
        url: string;
        publicId: string;
        bytes: number;
        format: string;
    }>;
}
