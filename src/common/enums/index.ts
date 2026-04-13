export enum UserRole {
  ADMIN = 'admin',
  CEO = 'ceo',
  FOUNDER = 'founder',
  INVESTOR = 'investor',
  FINANCE = 'finance',
  ACCOUNT_MANAGER = 'account_manager',
}

export enum GrantApplicationStatus {
  INTERESTED = 'interested',
  IN_PROGRESS = 'in_progress',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum StartupStage {
  // Legacy values (keep for backward compat)
  IDEATION = 'ideation',
  GROWTH = 'growth',
  SCALE = 'scale',
  // Active stage set
  VALIDATION = 'validation',
  PRE_REVENUE = 'pre_revenue',
  PROTOTYPE = 'prototype',
  MVP = 'mvp',
  PILOT = 'pilot',
  REVENUE_MODEL = 'revenue_model',
  EARLY_TRACTION = 'early_traction',
  REVENUE_STAGE = 'revenue_stage',
  SCALING = 'scaling',
}

export enum StartupStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  GRADUATED = 'graduated',
  SUSPENDED = 'suspended',
}

export enum MilestoneStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  DELAYED = 'delayed',
  FLAGGED = 'flagged',
}

export enum DisbursementStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DISBURSED = 'disbursed',
  REJECTED = 'rejected',
}

export enum DocumentType {
  PITCH_DECK = 'pitch_deck',
  FINANCIALS = 'financials',
  COMPLIANCE = 'compliance',
  INCORPORATION = 'incorporation',
  AUDIT_CERTIFICATE = 'audit_certificate',
  BALANCE_SHEET = 'balance_sheet',
  OTHER = 'other',
}

export enum AuditAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LOGIN = 'login',
  LOGOUT = 'logout',
  EVALUATE = 'evaluate',
  APPROVE = 'approve',
  REJECT = 'reject',
  DISBURSE = 'disburse',
}

export enum FundingInterestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  HOLD = 'hold',
  ENQUIRE = 'enquire',
}

export enum AuditEntityType {
  USER = 'user',
  STARTUP = 'startup',
  FOUNDER = 'founder',
  EVALUATION = 'evaluation',
  MILESTONE = 'milestone',
  FINANCIAL = 'financial',
  DOCUMENT = 'document',
}
