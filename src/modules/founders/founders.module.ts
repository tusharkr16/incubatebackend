import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Founder, FounderSchema } from './founder.schema';
import { FoundersService } from './founders.service';
import { FoundersController } from './founders.controller';
import { AuditModule } from '../audit/audit.module';
import { StartupsModule } from '../startups/startups.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Founder.name, schema: FounderSchema }]),
    AuditModule,
    StartupsModule,
  ],
  controllers: [FoundersController],
  providers: [FoundersService],
  exports: [FoundersService],
})
export class FoundersModule {}
