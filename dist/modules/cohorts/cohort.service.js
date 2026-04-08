"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CohortService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohortService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const openai_1 = __importDefault(require("openai"));
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const cloudinary_1 = require("cloudinary");
const googleapis_1 = require("googleapis");
const cohort_schema_1 = require("./cohort.schema");
const startup_schema_1 = require("../startups/startup.schema");
const founder_schema_1 = require("../founders/founder.schema");
const enums_1 = require("../../common/enums");
const FIELD = {
    COMPANY_NAME: 'companyName',
    SECTOR: 'sector',
    STAGE: 'stage',
    DESCRIPTION: 'description',
    WEBSITE: 'website',
    FOUNDER_NAME: 'founderName',
    FOUNDER_EMAIL: 'founderEmail',
    LINKEDIN: 'founderLinkedin',
    SKILLS: 'founderSkills',
    BIO: 'founderBio',
};
const SECTORS = [
    'FinTech', 'HealthTech', 'EdTech', 'AgriTech', 'CleanTech',
    'LogisTech', 'RetailTech', 'LegalTech', 'HRTech', 'AI/ML',
    'Web3', 'SaaS', 'DeepTech', 'Other',
];
const STAGES = ['ideation', 'validation', 'early_traction', 'growth'];
let CohortService = CohortService_1 = class CohortService {
    cohortModel;
    startupModel;
    founderModel;
    config;
    logger = new common_1.Logger(CohortService_1.name);
    openai = null;
    anthropic = null;
    constructor(cohortModel, startupModel, founderModel, config) {
        this.cohortModel = cohortModel;
        this.startupModel = startupModel;
        this.founderModel = founderModel;
        this.config = config;
        const openaiKey = this.config.get('OPENAI_API_KEY');
        if (openaiKey) {
            this.openai = new openai_1.default({ apiKey: openaiKey });
            this.logger.log('OpenAI client initialised — DALL·E available');
        }
        else {
            this.logger.warn('OPENAI_API_KEY not set — using Pollinations.ai for poster generation');
        }
        const anthropicKey = this.config.get('ANTHROPIC_API_KEY');
        if (anthropicKey) {
            this.anthropic = new sdk_1.default({ apiKey: anthropicKey });
            this.logger.log('Anthropic Claude initialised — enhanced poster prompts enabled');
        }
        const cloudName = this.config.get('CLOUDINARY_CLOUD_NAME');
        const apiKey = this.config.get('CLOUDINARY_API_KEY');
        const apiSecret = this.config.get('CLOUDINARY_API_SECRET');
        if (cloudName && apiKey && apiSecret) {
            cloudinary_1.v2.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
            this.logger.log('Cloudinary configured — poster upload enabled');
        }
    }
    getFormsClient() {
        const email = this.config.get('GOOGLE_SERVICE_ACCOUNT_EMAIL');
        const rawKey = this.config.get('GOOGLE_PRIVATE_KEY');
        if (!email || !rawKey)
            return null;
        const auth = new googleapis_1.google.auth.JWT({
            email,
            key: rawKey.replace(/\\n/g, '\n'),
            scopes: [
                'https://www.googleapis.com/auth/forms.body',
                'https://www.googleapis.com/auth/forms.responses.readonly',
                'https://www.googleapis.com/auth/drive',
            ],
        });
        return googleapis_1.google.forms({ version: 'v1', auth });
    }
    async create(dto, userId) {
        const cohort = new this.cohortModel({ ...dto, createdBy: userId });
        const saved = await cohort.save();
        this.createGoogleForm(saved).then(async (result) => {
            if (result) {
                await this.cohortModel.findByIdAndUpdate(saved._id, {
                    googleFormUrl: result.formUrl,
                    googleFormId: result.formId,
                    googleFormQuestionIds: result.questionIds,
                });
                saved.googleFormUrl = result.formUrl;
                saved.googleFormId = result.formId;
                this.logger.log(`Google Form created for cohort ${saved._id}: ${result.formUrl}`);
            }
        }).catch((err) => {
            const detail = err?.response?.data?.error?.message
                ?? err?.response?.data?.message
                ?? err?.errors?.[0]?.message
                ?? err?.message;
            this.logger.error(`Failed to create Google Form for cohort ${saved._id}: ${detail}`);
            this.logger.error(`Status: ${err?.response?.status} | Code: ${err?.code}`);
        });
        return saved;
    }
    async findAll(year) {
        const filter = {};
        if (year)
            filter.year = year;
        return this.cohortModel.find(filter).sort({ createdAt: -1 }).lean();
    }
    async findOne(id) {
        const cohort = await this.cohortModel.findById(id).lean();
        if (!cohort)
            throw new common_1.NotFoundException('Cohort not found');
        return cohort;
    }
    async updateStatus(id, status) {
        const cohort = await this.cohortModel.findByIdAndUpdate(id, { status }, { new: true }).lean();
        if (!cohort)
            throw new common_1.NotFoundException('Cohort not found');
        return cohort;
    }
    async getStartupsByCohort(cohortId) {
        const cohort = await this.cohortModel.findById(cohortId).lean();
        if (!cohort)
            throw new common_1.NotFoundException('Cohort not found');
        const startups = await this.startupModel
            .find({ cohortId: cohort._id })
            .select('name sector stage status latestScore description website createdAt founderIds')
            .sort({ createdAt: -1 })
            .lean();
        const enriched = await Promise.all(startups.map(async (s) => {
            const founder = s.founderIds?.length
                ? await this.founderModel
                    .findById(s.founderIds[0])
                    .select('name email linkedinUrl skills bio')
                    .lean()
                : null;
            return { ...s, founder };
        }));
        return enriched;
    }
    async createGoogleForm(cohort) {
        const forms = this.getFormsClient();
        if (!forms) {
            this.logger.warn('Google credentials not configured — skipping Google Form creation');
            return null;
        }
        const created = await forms.forms.create({
            requestBody: {
                info: {
                    title: `${cohort.name} — Cohort ${cohort.year} Application`,
                    documentTitle: `${cohort.name} ${cohort.year} Applications`,
                },
            },
        });
        const formId = created.data.formId;
        const sectorOptions = (cohort.sectors?.length ? cohort.sectors : SECTORS).map((v) => ({ value: v }));
        const stageOptions = STAGES.map((v) => ({ value: v.replace('_', ' ') }));
        const questions = [
            { fieldKey: FIELD.COMPANY_NAME, title: 'Company / Startup Name', type: 'text', required: true },
            { fieldKey: FIELD.SECTOR, title: 'Primary Sector', type: 'dropdown', options: sectorOptions, required: true },
            { fieldKey: FIELD.STAGE, title: 'Current Stage', type: 'dropdown', options: stageOptions, required: false },
            { fieldKey: FIELD.DESCRIPTION, title: 'Describe your startup', type: 'para', required: false },
            { fieldKey: FIELD.WEBSITE, title: 'Website (optional)', type: 'text', required: false },
            { fieldKey: FIELD.FOUNDER_NAME, title: 'Founder Full Name', type: 'text', required: true },
            { fieldKey: FIELD.FOUNDER_EMAIL, title: 'Founder Email Address', type: 'text', required: true },
            { fieldKey: FIELD.LINKEDIN, title: 'LinkedIn Profile URL (optional)', type: 'text', required: false },
            { fieldKey: FIELD.SKILLS, title: 'Skills (comma-separated)', type: 'text', required: false },
            { fieldKey: FIELD.BIO, title: 'Brief Founder Bio', type: 'para', required: false },
        ];
        const requests = [];
        if (cohort.description) {
            requests.push({
                updateFormInfo: {
                    info: { description: cohort.description },
                    updateMask: 'description',
                },
            });
        }
        questions.forEach((q, index) => {
            const questionItem = {
                title: q.title,
                questionItem: { question: { required: q.required } },
            };
            if (q.type === 'dropdown') {
                questionItem.questionItem.question.choiceQuestion = {
                    type: 'DROP_DOWN',
                    options: q.options,
                };
            }
            else if (q.type === 'para') {
                questionItem.questionItem.question.textQuestion = { paragraph: true };
            }
            else {
                questionItem.questionItem.question.textQuestion = { paragraph: false };
            }
            requests.push({
                createItem: { item: questionItem, location: { index } },
            });
        });
        await forms.forms.batchUpdate({ formId, requestBody: { requests } });
        const formData = await forms.forms.get({ formId });
        const items = formData.data.items ?? [];
        const questionIds = {};
        items.forEach((item) => {
            const title = item.title ?? '';
            const qId = item.questionItem?.question?.questionId;
            if (!qId)
                return;
            const match = questions.find((q) => q.title === title);
            if (match)
                questionIds[match.fieldKey] = qId;
        });
        return {
            formId,
            formUrl: formData.data.responderUri,
            questionIds,
        };
    }
    async syncFormResponses(cohortId) {
        const cohort = await this.cohortModel.findById(cohortId).lean();
        if (!cohort)
            throw new common_1.NotFoundException('Cohort not found');
        if (!cohort.googleFormId) {
            throw new common_1.BadRequestException('No Google Form linked to this cohort');
        }
        const forms = this.getFormsClient();
        if (!forms)
            throw new common_1.BadRequestException('Google credentials not configured on server');
        const res = await forms.forms.responses.list({ formId: cohort.googleFormId });
        const responses = res.data.responses ?? [];
        const alreadySynced = new Set(cohort.syncedResponseIds ?? []);
        const questionIds = cohort.googleFormQuestionIds;
        let synced = 0, skipped = 0, errors = 0;
        const newlySyncedIds = [];
        for (const response of responses) {
            const responseId = response.responseId;
            if (alreadySynced.has(responseId)) {
                skipped++;
                continue;
            }
            try {
                const answers = response.answers ?? {};
                const get = (field) => {
                    const qId = questionIds?.[field];
                    if (!qId)
                        return '';
                    return answers[qId]?.textAnswers?.answers?.[0]?.value ?? '';
                };
                const companyName = get(FIELD.COMPANY_NAME);
                const founderEmail = get(FIELD.FOUNDER_EMAIL).toLowerCase().trim();
                if (!companyName || !founderEmail) {
                    skipped++;
                    continue;
                }
                const existingFounder = await this.founderModel.findOne({ email: founderEmail }).lean();
                if (existingFounder) {
                    const existingStartup = await this.startupModel.findOne({
                        _id: existingFounder.startupId, cohortYear: cohort.year,
                    }).lean();
                    if (existingStartup) {
                        skipped++;
                        newlySyncedIds.push(responseId);
                        continue;
                    }
                }
                const rawStage = get(FIELD.STAGE).replace(' ', '_');
                const validStages = ['ideation', 'validation', 'early_traction', 'growth'];
                const stage = validStages.includes(rawStage) ? rawStage : 'ideation';
                const startup = await this.startupModel.create({
                    name: companyName.trim(),
                    sector: { primary: get(FIELD.SECTOR) || 'Other', tags: [] },
                    stage,
                    cohortYear: cohort.year,
                    description: get(FIELD.DESCRIPTION) || undefined,
                    website: get(FIELD.WEBSITE) || undefined,
                    status: enums_1.StartupStatus.ACTIVE,
                    createdBy: cohort.createdBy,
                });
                const skillsRaw = get(FIELD.SKILLS);
                const founder = await this.founderModel.create({
                    name: get(FIELD.FOUNDER_NAME).trim() || 'Unknown',
                    email: founderEmail,
                    bio: get(FIELD.BIO) || undefined,
                    linkedinUrl: get(FIELD.LINKEDIN) || undefined,
                    skills: skillsRaw ? skillsRaw.split(',').map((s) => s.trim()).filter(Boolean) : [],
                    startupId: startup._id,
                });
                await this.startupModel.findByIdAndUpdate(startup._id, {
                    $push: { founderIds: founder._id },
                });
                newlySyncedIds.push(responseId);
                synced++;
            }
            catch (err) {
                this.logger.error(`Failed to sync response ${responseId}: ${err?.message}`);
                errors++;
            }
        }
        if (newlySyncedIds.length) {
            await this.cohortModel.findByIdAndUpdate(cohortId, {
                $push: { syncedResponseIds: { $each: newlySyncedIds } },
            });
        }
        return { synced, skipped, errors };
    }
    async applyToCohort(cohortId, dto) {
        const cohort = await this.cohortModel.findById(cohortId).lean();
        if (!cohort)
            throw new common_1.NotFoundException('Cohort not found');
        if (cohort.status === 'closed') {
            throw new common_1.BadRequestException('Applications for this cohort are closed');
        }
        const existingFounder = await this.founderModel.findOne({ email: dto.founderEmail.toLowerCase() }).lean();
        if (existingFounder) {
            const existingStartup = await this.startupModel.findOne({
                _id: existingFounder.startupId,
                cohortYear: cohort.year,
            }).lean();
            if (existingStartup) {
                throw new common_1.BadRequestException('An application with this email already exists for this cohort');
            }
        }
        const startup = await this.startupModel.create({
            name: dto.companyName.trim(),
            sector: {
                primary: dto.sector,
                tags: dto.founderSkills ? dto.founderSkills.split(',').map((s) => s.trim()).filter(Boolean) : [],
            },
            stage: dto.stage ?? 'ideation',
            cohortYear: cohort.year,
            cohortId: cohort._id,
            description: dto.description?.trim(),
            website: dto.website?.trim(),
            status: enums_1.StartupStatus.ACTIVE,
            createdBy: cohort.createdBy,
        });
        const founder = await this.founderModel.create({
            name: dto.founderName.trim(),
            email: dto.founderEmail.toLowerCase().trim(),
            bio: dto.founderBio?.trim(),
            linkedinUrl: dto.founderLinkedin?.trim(),
            skills: dto.founderSkills ? dto.founderSkills.split(',').map((s) => s.trim()).filter(Boolean) : [],
            startupId: startup._id,
        });
        await this.startupModel.findByIdAndUpdate(startup._id, {
            $push: { founderIds: founder._id },
        });
        return {
            message: 'Application submitted successfully!',
            startupId: startup._id,
            cohortName: cohort.name,
            cohortYear: cohort.year,
        };
    }
    async buildPosterPromptWithClaude(cohort) {
        const sectorList = cohort.sectors?.length ? cohort.sectors.join(', ') : 'Technology & Innovation';
        const input = `Create a single vivid image-generation prompt (max 300 words) for a startup incubator cohort poster with these details:
- Cohort name: "${cohort.name}"
- Year: ${cohort.year}
- Tagline: "${cohort.tagline ?? 'Empowering founders'}"
- Focus sectors: ${sectorList}
- Description: ${cohort.description ?? 'A cutting-edge startup incubator program'}

Requirements for the prompt:
- Deep violet/indigo gradient background with glowing neon accents
- Futuristic tech aesthetic with abstract geometric shapes
- The cohort name "${cohort.name}" must appear prominently
- Professional, modern typography feel
- Landscape orientation (16:9), high resolution
- Cinematic lighting and depth
Output only the image prompt, nothing else.`;
        const message = await this.anthropic.messages.create({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 400,
            messages: [{ role: 'user', content: input }],
        });
        const text = message.content[0]?.text ?? '';
        return text.trim() || this.buildBasicPrompt(cohort);
    }
    buildBasicPrompt(cohort) {
        const sectorList = cohort.sectors?.length ? cohort.sectors.join(', ') : 'Technology & Innovation';
        return [
            `Professional startup incubator program poster for "${cohort.name}" Cohort ${cohort.year}.`,
            `Theme: ${cohort.tagline ?? 'Empowering the next generation of founders'}.`,
            `Focus sectors: ${sectorList}.`,
            cohort.description ? `Program: ${cohort.description}.` : '',
            'Style: Bold tech aesthetic, deep violet and indigo gradient background,',
            'clean modern typography, geometric abstract glowing shapes, futuristic startup vibe.',
            'Show cohort name prominently. High quality, landscape format.',
        ].filter(Boolean).join(' ');
    }
    async generatePoster(cohort, cohortId) {
        let prompt;
        let posterSource = 'pollinations';
        if (this.anthropic) {
            try {
                prompt = await this.buildPosterPromptWithClaude(cohort);
                posterSource = 'claude+pollinations';
                this.logger.log('Claude enhanced poster prompt generated');
            }
            catch (err) {
                this.logger.warn(`Claude prompt generation failed (${err?.message}), using basic prompt`);
                prompt = this.buildBasicPrompt(cohort);
            }
        }
        else {
            prompt = this.buildBasicPrompt(cohort);
        }
        let rawImageUrl;
        if (this.openai) {
            try {
                const response = await this.openai.images.generate({
                    model: 'dall-e-3',
                    prompt,
                    n: 1,
                    size: '1792x1024',
                    quality: 'standard',
                    style: 'vivid',
                });
                rawImageUrl = response.data?.[0]?.url;
                if (rawImageUrl)
                    posterSource = this.anthropic ? 'claude+dalle' : 'dalle';
            }
            catch (err) {
                this.logger.warn(`DALL·E failed (${err?.message}), falling back to Pollinations.ai`);
            }
        }
        if (!rawImageUrl) {
            const seed = Math.floor(Math.random() * 999999);
            rawImageUrl =
                `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}` +
                    `?width=1792&height=1024&nologo=true&seed=${seed}&model=flux`;
        }
        let cloudinaryUrl;
        try {
            const publicId = `cohort-posters/${cohortId ?? cohort.name.replace(/\s+/g, '-').toLowerCase()}-${cohort.year}`;
            const uploaded = await cloudinary_1.v2.uploader.upload(rawImageUrl, {
                public_id: publicId,
                overwrite: true,
                folder: undefined,
                resource_type: 'image',
                timeout: 120000,
            });
            cloudinaryUrl = uploaded.secure_url;
            this.logger.log(`Poster uploaded to Cloudinary: ${cloudinaryUrl}`);
            if (cohortId) {
                await this.cohortModel.findByIdAndUpdate(cohortId, {
                    posterUrl: cloudinaryUrl,
                    posterSource,
                });
            }
        }
        catch (err) {
            this.logger.warn(`Cloudinary upload failed (${err?.message}) — returning raw URL`);
        }
        return { imageUrl: rawImageUrl, cloudinaryUrl, source: posterSource };
    }
    async uploadPosterFromBase64(cohortId, imageData) {
        const uploaded = await cloudinary_1.v2.uploader.upload(imageData, {
            public_id: `cohort-posters/cohort-${cohortId}`,
            overwrite: true,
            resource_type: 'image',
        });
        await this.cohortModel.findByIdAndUpdate(cohortId, {
            posterUrl: uploaded.secure_url,
            posterSource: 'canvas',
        });
        this.logger.log(`Canvas poster uploaded to Cloudinary: ${uploaded.secure_url}`);
        return { cloudinaryUrl: uploaded.secure_url };
    }
};
exports.CohortService = CohortService;
exports.CohortService = CohortService = CohortService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cohort_schema_1.Cohort.name)),
    __param(1, (0, mongoose_1.InjectModel)(startup_schema_1.Startup.name)),
    __param(2, (0, mongoose_1.InjectModel)(founder_schema_1.Founder.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService])
], CohortService);
//# sourceMappingURL=cohort.service.js.map