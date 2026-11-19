import { Controller, Get } from '@nestjs/common';
import { CompaniesService } from './companies.service.js';
import { Company } from './companies.types.js';

@Controller('/companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async getCompanies(): Promise<Company[]> {
    return await this.companiesService.getCompanies();
  }
}
