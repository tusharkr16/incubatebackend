import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { BudgetEntry, BudgetEntryDocument } from './budget-entry.schema';
import { UpsertBudgetEntryDto, UploadInvoiceDto } from './dto/budget.dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectModel(BudgetEntry.name) private model: Model<BudgetEntryDocument>,
    private config: ConfigService,
  ) {
    cloudinary.config({
      cloud_name: this.config.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.config.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.config.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async getByStartup(startupId: string) {
    return this.model
      .find({ startupId: new Types.ObjectId(startupId) })
      .lean();
  }

  async upsert(
    startupId: string,
    itemKey: string,
    dto: UpsertBudgetEntryDto,
    userId: string,
  ) {
    const filter = {
      startupId: new Types.ObjectId(startupId),
      itemKey,
    };
    const update = {
      ...filter,
      category: dto.category,
      year: dto.year,
      description: dto.description,
      ...(dto.budgetAmount !== undefined && { budgetAmount: dto.budgetAmount }),
      ...(dto.spentAmount !== undefined && { spentAmount: dto.spentAmount }),
      ...(dto.comment !== undefined && { comment: dto.comment }),
      updatedBy: new Types.ObjectId(userId),
    };
    return this.model.findOneAndUpdate(filter, { $set: update }, {
      upsert: true,
      new: true,
    }).lean();
  }

  async uploadInvoice(
    startupId: string,
    itemKey: string,
    dto: UploadInvoiceDto,
    userId: string,
  ) {
    const filter = {
      startupId: new Types.ObjectId(startupId),
      itemKey,
    };

    const entry = await this.model.findOne(filter);
    if (!entry) {
      throw new NotFoundException(`Budget entry "${itemKey}" not found for this startup`);
    }

    const result = await cloudinary.uploader.upload(dto.base64, {
      folder: 'incubatex/budget-invoices',
      resource_type: 'auto',
      use_filename: true,
      unique_filename: true,
    });

    const updated = await this.model.findOneAndUpdate(
      filter,
      {
        $set: {
          invoiceUrl: result.secure_url,
          invoiceFileName: dto.fileName,
          updatedBy: new Types.ObjectId(userId),
        },
      },
      { new: true },
    ).lean();

    return updated;
  }

  async removeInvoice(startupId: string, itemKey: string, userId: string) {
    const filter = {
      startupId: new Types.ObjectId(startupId),
      itemKey,
    };
    return this.model.findOneAndUpdate(
      filter,
      { $set: { invoiceUrl: '', invoiceFileName: '', updatedBy: new Types.ObjectId(userId) } },
      { new: true },
    ).lean();
  }

  async deleteEntry(startupId: string, itemKey: string) {
    const result = await this.model.findOneAndDelete({
      startupId: new Types.ObjectId(startupId),
      itemKey,
    });
    if (!result) throw new NotFoundException(`Budget entry "${itemKey}" not found`);
    return { deleted: true };
  }

  async getSummary(startupId: string) {
    const entries = await this.model.find({ startupId: new Types.ObjectId(startupId) }).lean();
    const totalBudget = entries.reduce((s, e) => s + (e.budgetAmount || 0), 0);
    const totalSpent = entries.reduce((s, e) => s + (e.spentAmount || 0), 0);
    return { totalBudget, totalSpent, balance: totalBudget - totalSpent, count: entries.length };
  }
}
