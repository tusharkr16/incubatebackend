"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditEntityType = exports.FundingInterestStatus = exports.AuditAction = exports.DocumentType = exports.DisbursementStatus = exports.MilestoneStatus = exports.StartupStatus = exports.StartupStage = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["CEO"] = "ceo";
    UserRole["FOUNDER"] = "founder";
    UserRole["INVESTOR"] = "investor";
    UserRole["FINANCE"] = "finance";
})(UserRole || (exports.UserRole = UserRole = {}));
var StartupStage;
(function (StartupStage) {
    StartupStage["IDEATION"] = "ideation";
    StartupStage["GROWTH"] = "growth";
    StartupStage["SCALE"] = "scale";
    StartupStage["VALIDATION"] = "validation";
    StartupStage["PRE_REVENUE"] = "pre_revenue";
    StartupStage["PROTOTYPE"] = "prototype";
    StartupStage["MVP"] = "mvp";
    StartupStage["PILOT"] = "pilot";
    StartupStage["REVENUE_MODEL"] = "revenue_model";
    StartupStage["EARLY_TRACTION"] = "early_traction";
    StartupStage["REVENUE_STAGE"] = "revenue_stage";
    StartupStage["SCALING"] = "scaling";
})(StartupStage || (exports.StartupStage = StartupStage = {}));
var StartupStatus;
(function (StartupStatus) {
    StartupStatus["ACTIVE"] = "active";
    StartupStatus["INACTIVE"] = "inactive";
    StartupStatus["GRADUATED"] = "graduated";
    StartupStatus["SUSPENDED"] = "suspended";
})(StartupStatus || (exports.StartupStatus = StartupStatus = {}));
var MilestoneStatus;
(function (MilestoneStatus) {
    MilestoneStatus["PENDING"] = "pending";
    MilestoneStatus["IN_PROGRESS"] = "in_progress";
    MilestoneStatus["COMPLETED"] = "completed";
    MilestoneStatus["DELAYED"] = "delayed";
    MilestoneStatus["FLAGGED"] = "flagged";
})(MilestoneStatus || (exports.MilestoneStatus = MilestoneStatus = {}));
var DisbursementStatus;
(function (DisbursementStatus) {
    DisbursementStatus["PENDING"] = "pending";
    DisbursementStatus["APPROVED"] = "approved";
    DisbursementStatus["DISBURSED"] = "disbursed";
    DisbursementStatus["REJECTED"] = "rejected";
})(DisbursementStatus || (exports.DisbursementStatus = DisbursementStatus = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType["PITCH_DECK"] = "pitch_deck";
    DocumentType["FINANCIALS"] = "financials";
    DocumentType["COMPLIANCE"] = "compliance";
    DocumentType["INCORPORATION"] = "incorporation";
    DocumentType["AUDIT_CERTIFICATE"] = "audit_certificate";
    DocumentType["BALANCE_SHEET"] = "balance_sheet";
    DocumentType["OTHER"] = "other";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
var AuditAction;
(function (AuditAction) {
    AuditAction["CREATE"] = "create";
    AuditAction["UPDATE"] = "update";
    AuditAction["DELETE"] = "delete";
    AuditAction["LOGIN"] = "login";
    AuditAction["LOGOUT"] = "logout";
    AuditAction["EVALUATE"] = "evaluate";
    AuditAction["APPROVE"] = "approve";
    AuditAction["REJECT"] = "reject";
    AuditAction["DISBURSE"] = "disburse";
})(AuditAction || (exports.AuditAction = AuditAction = {}));
var FundingInterestStatus;
(function (FundingInterestStatus) {
    FundingInterestStatus["PENDING"] = "pending";
    FundingInterestStatus["ACCEPTED"] = "accepted";
    FundingInterestStatus["REJECTED"] = "rejected";
})(FundingInterestStatus || (exports.FundingInterestStatus = FundingInterestStatus = {}));
var AuditEntityType;
(function (AuditEntityType) {
    AuditEntityType["USER"] = "user";
    AuditEntityType["STARTUP"] = "startup";
    AuditEntityType["FOUNDER"] = "founder";
    AuditEntityType["EVALUATION"] = "evaluation";
    AuditEntityType["MILESTONE"] = "milestone";
    AuditEntityType["FINANCIAL"] = "financial";
    AuditEntityType["DOCUMENT"] = "document";
})(AuditEntityType || (exports.AuditEntityType = AuditEntityType = {}));
//# sourceMappingURL=index.js.map