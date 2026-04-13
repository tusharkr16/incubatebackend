import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StartupAssignment, StartupAssignmentSchema } from './startup-assignment.schema';
import { AmReview, AmReviewSchema } from './am-review.schema';
import { AccountManagerService } from './account-manager.service';
import { AccountManagerController } from './account-manager.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StartupAssignment.name, schema: StartupAssignmentSchema },
      { name: AmReview.name, schema: AmReviewSchema },
    ]),
  ],
  controllers: [AccountManagerController],
  providers: [AccountManagerService],
  exports: [AccountManagerService],
})
export class AccountManagerModule {}
