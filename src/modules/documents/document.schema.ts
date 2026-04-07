import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongoDocument, Types } from 'mongoose';
import { DocumentType } from '../../common/enums';

export type DocumentFileDocument = DocumentFile & MongoDocument;

@Schema({ timestamps: true, collection: 'documents' })
export class DocumentFile {
  @Prop({ type: Types.ObjectId, ref: 'Startup', required: true, index: true })
  startupId: Types.ObjectId;

  @Prop({ required: true, enum: DocumentType, index: true })
  type: DocumentType;

  @Prop({ required: true, trim: true })
  filename: string;

  @Prop({ required: true })
  url: string; // S3 / cloud storage URL

  @Prop({ type: String })
  mimeType: string;

  @Prop({ type: Number })
  sizeBytes: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  uploadedBy: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  verifiedBy: Types.ObjectId;

  @Prop({ type: Date })
  verifiedAt: Date;

  // Document expiry for compliance certs
  @Prop({ type: Date })
  expiresAt: Date;

  @Prop({ type: String, maxlength: 500 })
  description: string;
}

export const DocumentFileSchema = SchemaFactory.createForClass(DocumentFile);

DocumentFileSchema.index({ startupId: 1, type: 1 });
DocumentFileSchema.index({ uploadedBy: 1 });
DocumentFileSchema.index({ expiresAt: 1 }, { sparse: true }); // for expiry alerts
