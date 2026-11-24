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
  EntityNotFoundError,
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
      const updatedCompanyId = await this.companiesRepository.updateCompany(
        id,
        body,
      );
      if (!updatedCompanyId)
        throw new EntityNotFoundError(`Azienda non trovata con id ${id}`);
      return updatedCompanyId;
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
