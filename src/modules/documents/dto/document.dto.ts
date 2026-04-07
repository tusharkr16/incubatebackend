import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUrl, IsNumber } from 'class-validator';
import { DocumentType } from '../../../common/enums';

export class CreateDocumentDto {
  @IsString() @IsNotEmpty() startupId: string;
  @IsEnum(DocumentType) type: DocumentType;
  @IsString() @IsNotEmpty() filename: string;
  @IsUrl() url: string;
  @IsOptional() @IsString() mimeType?: string;
  @IsOptional() @IsNumber() sizeBytes?: number;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() expiresAt?: string;
}
