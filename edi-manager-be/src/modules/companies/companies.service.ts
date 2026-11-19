import { Injectable } from '@nestjs/common';
import { Company } from './companies.types.js';
import { CompaniesRepository } from './companies.repository.js';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async getCompanies(): Promise<Company[]> {
    return await this.companiesRepository.getCompanies();
  }
}
