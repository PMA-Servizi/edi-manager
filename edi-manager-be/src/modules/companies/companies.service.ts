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
      if (err instanceof DbUniqueConflictError) {
        throw new DuplicatedEntityError({
          resource: 'COMPANIES',
          message: `Azienda duplicata: ${err.fields} non è unico`,
          context: err.fields,
        });
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
        throw new EntityNotFoundError({
          resource: 'COMPANIES',
          message: `Azienda non trovata con id ${id}`,
        });
      return updatedCompanyId;
    } catch (err) {
      if (err instanceof DbUniqueConflictError) {
        throw new DuplicatedEntityError({
          resource: 'COMPANIES',
          message: `Azienda duplicata: ${err.fields} non è unico`,
          context: err.fields,
        });
      }
      throw err;
    }
  }
}
