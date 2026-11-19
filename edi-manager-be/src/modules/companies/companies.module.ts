import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service.js';
import { CompaniesController } from './companies.controller.js';
import { CompaniesRepository } from './companies.repository.js';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesRepository],
  exports: [CompaniesService],
})
export class CompaniesModule {}
