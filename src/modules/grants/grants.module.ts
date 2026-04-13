import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GrantApplication, GrantApplicationSchema } from './grant-application.schema';
import { GrantsService } from './grants.service';
import { GrantsController } from './grants.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GrantApplication.name, schema: GrantApplicationSchema },
    ]),
  ],
  controllers: [GrantsController],
  providers: [GrantsService],
  exports: [GrantsService],
})
export class GrantsModule {}
