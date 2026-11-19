import { Logger, Module } from '@nestjs/common';
import { FlowsModule } from './modules/flows/flows.module.js';
import { ConfigModule } from '@nestjs/config';
import { FlowsService } from './modules/flows/flows.service.js';
import { resolve } from 'path';
import { envSchema } from './config/env.config.js';
import { AppService } from './app.service.js';
import { CompaniesModule } from './modules/companies/companies.module.js';

@Module({
  imports: [
    FlowsModule,
    CompaniesModule,
    ConfigModule.forRoot({
      envFilePath: resolve(process.cwd(), '../.env'),
      validate: (config) => envSchema.parse(config),
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
