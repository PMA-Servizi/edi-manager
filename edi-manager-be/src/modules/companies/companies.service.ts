import { Injectable } from '@nestjs/common';
import type {
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
} from './companies.types.js';
import { CompaniesRepository } from './companies.repository.js';
import {
  DbUniqueConflictError,
  DuplicatedEntityError,
} from '@/shared/errors.js';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async getCompanies(): Promise<Company[]> {
    return await this.companiesRepository.getCompanies();
  }

  async createCompany(body: CreateCompanyDto): Promise<string> {
    try {
      return await this.companiesRepository.createCompany(body);
    } catch (err) {
      if (err instanceof DbUniqueConflictError && err.constraint) {
        throw new DuplicatedEntityError(
          `Cliente duplicato: ${err.constraint} non è unico`,
        );
      }
      throw err;
    }
  }

  async updateCompany(id: string, body: UpdateCompanyDto): Promise<string> {
    try {
      return await this.companiesRepository.updateCompany(id, body);
    } catch (err) {
      if (err instanceof DbUniqueConflictError && err.constraint) {
        throw new DuplicatedEntityError(
          `Cliente duplicato: ${err.constraint} non è unico`,
        );
      }
      throw err;
    }
  }
}
