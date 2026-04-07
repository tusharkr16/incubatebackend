import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AuditAction, AuditEntityType } from '../../common/enums';

export type AuditLogDocument = AuditLog & Document;

/**
 * Immutable audit trail — never update or delete these documents.
 * The `changes` field stores before/after diff as a plain object.
 * Keep this collection append-only for compliance.
 */
@Schema({ collection: 'audit_logs' })
export class AuditLog {
  @Prop({ required: true, enum: AuditEntityType, index: true })
  entityType: AuditEntityType;

  @Prop({ type: Types.ObjectId, required: true, index: true })
  entityId: Types.ObjectId;

  @Prop({ required: true, enum: AuditAction, index: true })
  action: AuditAction;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  performedBy: Types.ObjectId;

  @Prop({ required: true, type: Date, default: Date.now, index: true })
  timestamp: Date;

  // Diff object: { field: { before: x, after: y } }
  // Using Mixed type to allow flexible diff shapes per entity
  @Prop({ type: Object })
  changes: Record<string, { before: unknown; after: unknown }>;

  // Additional context (IP, user agent, request ID)
  @Prop({ type: String })
  ipAddress: string;

  @Prop({ type: String })
  userAgent: string;

  @Prop({ type: String })
  requestId: string;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);

// Compound index for entity history lookup
AuditLogSchema.index({ entityType: 1, entityId: 1, timestamp: -1 });
AuditLogSchema.index({ performedBy: 1, timestamp: -1 });
// TTL index option: uncomment to auto-purge old logs after 2 years
// AuditLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 63072000 });
