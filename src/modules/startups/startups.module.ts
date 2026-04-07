import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Startup, StartupSchema } from './startup.schema';
import { StartupsService } from './startups.service';
import { StartupsController } from './startups.controller';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Startup.name, schema: StartupSchema }]),
    AuditModule,
  ],
  controllers: [StartupsController],
  providers: [StartupsService],
  exports: [StartupsService, MongooseModule],
})
export class StartupsModule {}
