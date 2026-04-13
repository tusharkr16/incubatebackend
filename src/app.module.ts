import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StartupsModule } from './modules/startups/startups.module';
import { FoundersModule } from './modules/founders/founders.module';
import { EvaluationsModule } from './modules/evaluations/evaluations.module';
import { MilestonesModule } from './modules/milestones/milestones.module';
import { FinancialsModule } from './modules/financials/financials.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { AuditModule } from './modules/audit/audit.module';
import { IntelligenceModule } from './modules/intelligence/intelligence.module';
import { CohortModule } from './modules/cohorts/cohort.module';
import { FundingInterestsModule } from './modules/funding-interests/funding-interests.module';
import { AccountManagerModule } from './modules/account-manager/account-manager.module';
import { GrantsModule } from './modules/grants/grants.module';
import { ChatModule } from './modules/chat/chat.module';
import { BudgetModule } from './modules/budget/budget.module';
import { AppController } from './app.controller';

import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI', 'mongodb://localhost:27017/incubatex'),
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      }),
    }),

    AuthModule,
    UsersModule,
    StartupsModule,
    FoundersModule,
    EvaluationsModule,
    MilestonesModule,
    FinancialsModule,
    DocumentsModule,
    AuditModule,
    IntelligenceModule,
    CohortModule,
    FundingInterestsModule,
    AccountManagerModule,
    GrantsModule,
    ChatModule,
    BudgetModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
