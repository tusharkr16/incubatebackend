import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import OpenAI from 'openai';
import { google } from 'googleapis';
import { Cohort, CohortDocument } from './cohort.schema';
import { Startup, StartupDocument } from '../startups/startup.schema';
import { Founder, FounderDocument } from '../founders/founder.schema';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { ApplyCohortDto } from './dto/apply-cohort.dto';
import { StartupStatus } from '../../common/enums';

// Field keys used to map Google Form question IDs
const FIELD = {
  COMPANY_NAME:  'companyName',
  SECTOR:        'sector',
  STAGE:         'stage',
  DESCRIPTION:   'description',
  WEBSITE:       'website',
  FOUNDER_NAME:  'founderName',
  FOUNDER_EMAIL: 'founderEmail',
  LINKEDIN:      'founderLinkedin',
  SKILLS:        'founderSkills',
  BIO:           'founderBio',
} as const;

const SECTORS = [
  'FinTech', 'HealthTech', 'EdTech', 'AgriTech', 'CleanTech',
  'LogisTech', 'RetailTech', 'LegalTech', 'HRTech', 'AI/ML',
  'Web3', 'SaaS', 'DeepTech', 'Other',
];
const STAGES = ['ideation', 'validation', 'early_traction', 'growth'];

@Injectable()
export class CohortService {
  private readonly logger = new Logger(CohortService.name);
  private openai: OpenAI | null = null;

  constructor(
    @InjectModel(Cohort.name) private cohortModel: Model<CohortDocument>,
    @InjectModel(Startup.name) private startupModel: Model<StartupDocument>,
    @InjectModel(Founder.name) private founderModel: Model<FounderDocument>,
    private readonly config: ConfigService,
  ) {
    const apiKey = this.config.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
      this.logger.log('OpenAI client initialised — DALL·E available');
    } else {
      this.logger.warn('OPENAI_API_KEY not set — using Pollinations.ai for poster generation');
    }
  }

  // ── Google Auth ───────────────────────────────────────────────────────────

  private getFormsClient() {
    const email = this.config.get<string>('GOOGLE_SERVICE_ACCOUNT_EMAIL');
    const rawKey = this.config.get<string>('GOOGLE_PRIVATE_KEY');
    if (!email || !rawKey) return null;

    const auth = new google.auth.JWT({
      email,
      key: rawKey.replace(/\\n/g, '\n'),
      scopes: [
        'https://www.googleapis.com/auth/forms.body',
        'https://www.googleapis.com/auth/forms.responses.readonly',
        'https://www.googleapis.com/auth/drive',
      ],
    });
    return google.forms({ version: 'v1', auth });
  }

  // ── CRUD ──────────────────────────────────────────────────────────────────

  async create(dto: CreateCohortDto, userId: string): Promise<CohortDocument> {
    const cohort = new this.cohortModel({ ...dto, createdBy: userId });
    const saved = await cohort.save();

    // Auto-create Google Form if credentials are set (non-blocking)
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
    }).catch((err: any) => {
      const detail = err?.response?.data?.error?.message
        ?? err?.response?.data?.message
        ?? err?.errors?.[0]?.message
        ?? err?.message;
      this.logger.error(`Failed to create Google Form for cohort ${saved._id}: ${detail}`);
      this.logger.error(`Status: ${err?.response?.status} | Code: ${err?.code}`);
    });

    return saved;
  }

  async findAll(year?: number) {
    const filter: Record<string, unknown> = {};
    if (year) filter.year = year;
    return this.cohortModel.find(filter).sort({ createdAt: -1 }).lean();
  }

  async findOne(id: string) {
    const cohort = await this.cohortModel.findById(id).lean();
    if (!cohort) throw new NotFoundException('Cohort not found');
    return cohort;
  }

  // ── Google Forms: Create ──────────────────────────────────────────────────

  async createGoogleForm(cohort: { name: string; year: number; description?: string; sectors?: string[] }) {
    const forms = this.getFormsClient();
    if (!forms) {
      this.logger.warn('Google credentials not configured — skipping Google Form creation');
      return null;
    }

    // Step 1: Create the blank form
    const created = await forms.forms.create({
      requestBody: {
        info: {
          title: `${cohort.name} — Cohort ${cohort.year} Application`,
          documentTitle: `${cohort.name} ${cohort.year} Applications`,
        },
      },
    });

    const formId = created.data.formId!;

    // Step 2: Add description + all questions via batchUpdate
    const sectorOptions = (cohort.sectors?.length ? cohort.sectors : SECTORS).map((v) => ({ value: v }));
    const stageOptions = STAGES.map((v) => ({ value: v.replace('_', ' ') }));

    const questions: Array<{ fieldKey: string; title: string; type: 'text' | 'para' | 'dropdown'; options?: { value: string }[]; required: boolean }> = [
      { fieldKey: FIELD.COMPANY_NAME,  title: 'Company / Startup Name',       type: 'text',     required: true  },
      { fieldKey: FIELD.SECTOR,        title: 'Primary Sector',                type: 'dropdown', options: sectorOptions, required: true  },
      { fieldKey: FIELD.STAGE,         title: 'Current Stage',                 type: 'dropdown', options: stageOptions,  required: false },
      { fieldKey: FIELD.DESCRIPTION,   title: 'Describe your startup',         type: 'para',     required: false },
      { fieldKey: FIELD.WEBSITE,       title: 'Website (optional)',             type: 'text',     required: false },
      { fieldKey: FIELD.FOUNDER_NAME,  title: 'Founder Full Name',             type: 'text',     required: true  },
      { fieldKey: FIELD.FOUNDER_EMAIL, title: 'Founder Email Address',         type: 'text',     required: true  },
      { fieldKey: FIELD.LINKEDIN,      title: 'LinkedIn Profile URL (optional)',type: 'text',     required: false },
      { fieldKey: FIELD.SKILLS,        title: 'Skills (comma-separated)',       type: 'text',     required: false },
      { fieldKey: FIELD.BIO,           title: 'Brief Founder Bio',             type: 'para',     required: false },
    ];

    const requests: any[] = [];

    // Add form description
    if (cohort.description) {
      requests.push({
        updateFormInfo: {
          info: { description: cohort.description },
          updateMask: 'description',
        },
      });
    }

    // Add each question
    questions.forEach((q, index) => {
      const questionItem: any = {
        title: q.title,
        questionItem: { question: { required: q.required } },
      };

      if (q.type === 'dropdown') {
        questionItem.questionItem.question.choiceQuestion = {
          type: 'DROP_DOWN',
          options: q.options,
        };
      } else if (q.type === 'para') {
        questionItem.questionItem.question.textQuestion = { paragraph: true };
      } else {
        questionItem.questionItem.question.textQuestion = { paragraph: false };
      }

      requests.push({
        createItem: { item: questionItem, location: { index } },
      });
    });

    await forms.forms.batchUpdate({ formId, requestBody: { requests } });

    // Step 3: Read back to get question IDs
    const formData = await forms.forms.get({ formId });
    const items = formData.data.items ?? [];
    const questionIds: Record<string, string> = {};

    items.forEach((item) => {
      const title = item.title ?? '';
      const qId = item.questionItem?.question?.questionId;
      if (!qId) return;

      // Match by title
      const match = questions.find((q) => q.title === title);
      if (match) questionIds[match.fieldKey] = qId;
    });

    return {
      formId,
      formUrl: formData.data.responderUri!,
      questionIds,
    };
  }

  // ── Google Forms: Sync Responses ──────────────────────────────────────────

  /**
   * Reads all new Google Form responses and creates Startup + Founder records.
   * Safe to call multiple times — already-synced responses are skipped.
   */
  async syncFormResponses(cohortId: string): Promise<{ synced: number; skipped: number; errors: number }> {
    const cohort = await this.cohortModel.findById(cohortId).lean();
    if (!cohort) throw new NotFoundException('Cohort not found');

    if (!cohort.googleFormId) {
      throw new BadRequestException('No Google Form linked to this cohort');
    }

    const forms = this.getFormsClient();
    if (!forms) throw new BadRequestException('Google credentials not configured on server');

    // Fetch all responses
    const res = await forms.forms.responses.list({ formId: cohort.googleFormId });
    const responses = res.data.responses ?? [];

    const alreadySynced = new Set<string>(cohort.syncedResponseIds ?? []);
    const questionIds = cohort.googleFormQuestionIds as unknown as Record<string, string>;

    let synced = 0, skipped = 0, errors = 0;
    const newlySyncedIds: string[] = [];

    for (const response of responses) {
      const responseId = response.responseId!;
      if (alreadySynced.has(responseId)) { skipped++; continue; }

      try {
        const answers = response.answers ?? {};
        const get = (field: string) => {
          const qId = questionIds?.[field];
          if (!qId) return '';
          return answers[qId]?.textAnswers?.answers?.[0]?.value ?? '';
        };

        const companyName = get(FIELD.COMPANY_NAME);
        const founderEmail = get(FIELD.FOUNDER_EMAIL).toLowerCase().trim();
        if (!companyName || !founderEmail) { skipped++; continue; }

        // Deduplicate by email within this cohort
        const existingFounder = await this.founderModel.findOne({ email: founderEmail }).lean();
        if (existingFounder) {
          const existingStartup = await this.startupModel.findOne({
            _id: existingFounder.startupId, cohortYear: cohort.year,
          }).lean();
          if (existingStartup) { skipped++; newlySyncedIds.push(responseId); continue; }
        }

        const rawStage = get(FIELD.STAGE).replace(' ', '_');
        const validStages = ['ideation', 'validation', 'early_traction', 'growth'];
        const stage = validStages.includes(rawStage) ? rawStage : 'ideation';

        // Create Startup
        const startup = await this.startupModel.create({
          name: companyName.trim(),
          sector: { primary: get(FIELD.SECTOR) || 'Other', tags: [] },
          stage,
          cohortYear: cohort.year,
          description: get(FIELD.DESCRIPTION) || undefined,
          website: get(FIELD.WEBSITE) || undefined,
          status: StartupStatus.ACTIVE,
          createdBy: cohort.createdBy,
        });

        // Create Founder
        const skillsRaw = get(FIELD.SKILLS);
        const founder = await this.founderModel.create({
          name: get(FIELD.FOUNDER_NAME).trim() || 'Unknown',
          email: founderEmail,
          bio: get(FIELD.BIO) || undefined,
          linkedinUrl: get(FIELD.LINKEDIN) || undefined,
          skills: skillsRaw ? skillsRaw.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
          startupId: startup._id as Types.ObjectId,
        });

        await this.startupModel.findByIdAndUpdate(startup._id, {
          $push: { founderIds: founder._id },
        });

        newlySyncedIds.push(responseId);
        synced++;
      } catch (err: any) {
        this.logger.error(`Failed to sync response ${responseId}: ${err?.message}`);
        errors++;
      }
    }

    // Persist the newly synced IDs
    if (newlySyncedIds.length) {
      await this.cohortModel.findByIdAndUpdate(cohortId, {
        $push: { syncedResponseIds: { $each: newlySyncedIds } },
      });
    }

    return { synced, skipped, errors };
  }

  // ── Public Application (built-in form) ────────────────────────────────────

  async applyToCohort(cohortId: string, dto: ApplyCohortDto) {
    const cohort = await this.cohortModel.findById(cohortId).lean();
    if (!cohort) throw new NotFoundException('Cohort not found');
    if (cohort.status === 'closed') {
      throw new BadRequestException('Applications for this cohort are closed');
    }

    const existingFounder = await this.founderModel.findOne({ email: dto.founderEmail.toLowerCase() }).lean();
    if (existingFounder) {
      const existingStartup = await this.startupModel.findOne({
        _id: existingFounder.startupId,
        cohortYear: cohort.year,
      }).lean();
      if (existingStartup) {
        throw new BadRequestException('An application with this email already exists for this cohort');
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
      description: dto.description?.trim(),
      website: dto.website?.trim(),
      status: StartupStatus.ACTIVE,
      createdBy: cohort.createdBy,
    });

    const founder = await this.founderModel.create({
      name: dto.founderName.trim(),
      email: dto.founderEmail.toLowerCase().trim(),
      bio: dto.founderBio?.trim(),
      linkedinUrl: dto.founderLinkedin?.trim(),
      skills: dto.founderSkills ? dto.founderSkills.split(',').map((s) => s.trim()).filter(Boolean) : [],
      startupId: startup._id as Types.ObjectId,
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

  // ── AI Poster Generation ──────────────────────────────────────────────────

  async generatePoster(cohort: {
    name: string;
    year: number;
    tagline?: string;
    sectors?: string[];
    description?: string;
  }): Promise<{ imageUrl?: string; source?: string; error?: string }> {
    const sectorList =
      cohort.sectors?.length ? cohort.sectors.join(', ') : 'Technology & Innovation';

    const prompt = [
      `Professional startup incubator program poster for "${cohort.name}" Cohort ${cohort.year}.`,
      `Theme: ${cohort.tagline ?? 'Empowering the next generation of founders'}.`,
      `Focus sectors: ${sectorList}.`,
      cohort.description ? `Program: ${cohort.description}.` : '',
      'Style: Bold tech aesthetic, deep violet and indigo gradient background,',
      'clean modern typography, geometric abstract glowing shapes, futuristic startup vibe.',
      'Show cohort name prominently. High quality, landscape format.',
    ]
      .filter(Boolean)
      .join(' ');

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
        const imageUrl = response.data?.[0]?.url;
        if (imageUrl) return { imageUrl, source: 'dalle' };
      } catch (err: any) {
        this.logger.warn(`DALL·E failed (${err?.message}), falling back to Pollinations.ai`);
      }
    }

    const seed = Math.floor(Math.random() * 999999);
    const pollinationsUrl =
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}` +
      `?width=1792&height=1024&nologo=true&seed=${seed}&model=flux`;

    return { imageUrl: pollinationsUrl, source: 'pollinations' };
  }
}
