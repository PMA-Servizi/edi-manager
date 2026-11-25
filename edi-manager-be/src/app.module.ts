import {
  Logger,
  Module,
  type MiddlewareConsumer,
  type NestModule,
} from '@nestjs/common';
import { FlowsModule } from './modules/flows/flows.module.js';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { envSchema } from './config/env.config.js';
import { AppService } from './app.service.js';
import { CompaniesModule } from './modules/companies/companies.module.js';
import { CustomersModule } from './modules/customers/customers.module.js';
import { LoggerMiddleware } from './middlewares/logger.middleware.js';

@Module({
  imports: [
    FlowsModule,
    CompaniesModule,
    CustomersModule,
    ConfigModule.forRoot({
      envFilePath: resolve(process.cwd(), '../.env'),
      validate: (config) => envSchema.parse(config),
    }),
  ],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
