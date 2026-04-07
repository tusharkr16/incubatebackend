import {
  Controller, Post, Get, Patch, Body, Param, Query,
  UseInterceptors, UploadedFile, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { DocumentsService } from './documents.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateDocumentDto } from './dto/document.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { DocumentType, UserRole } from '../../common/enums';

const ALLOWED_MIME = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

@Controller('documents')
export class DocumentsController {
  constructor(
    private documentsService: DocumentsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  /** Upload a file to Cloudinary then persist the document record. */
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
      fileFilter: (_req, file, cb) => {
        if (ALLOWED_MIME.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Unsupported file type. Use PDF, PPT, or image.'), false);
        }
      },
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('startupId') startupId: string,
    @Body('type') type: DocumentType,
    @Body('description') description: string,
    @CurrentUser('_id') userId: string,
  ) {
    if (!file) throw new BadRequestException('File is required');
    if (!startupId) throw new BadRequestException('startupId is required');

    const { url, bytes } = await this.cloudinaryService.uploadFile(
      file,
      `incubatex/${startupId}`,
    );

    return this.documentsService.create(
      {
        startupId,
        type: type ?? DocumentType.PITCH_DECK,
        filename: file.originalname,
        url,
        mimeType: file.mimetype,
        sizeBytes: bytes,
        description,
      } as any,
      userId,
    );
  }

  @Post()
  create(@Body() dto: CreateDocumentDto, @CurrentUser('_id') userId: string) {
    return this.documentsService.create(dto, userId);
  }

  @Get('startup/:startupId')
  findByStartup(@Param('startupId') startupId: string, @Query('type') type?: string) {
    return this.documentsService.findByStartup(startupId, type);
  }

  @Get('expiring')
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.FINANCE)
  getExpiring(@Query('days') days = 30) {
    return this.documentsService.getExpiringDocuments(+days);
  }

  @Patch(':id/verify')
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.FINANCE)
  verify(
    @Param('id') id: string,
    @CurrentUser('_id') userId: string,
    @CurrentUser('role') userRole: UserRole,
  ) {
    return this.documentsService.verify(id, userId, userRole);
  }
}
