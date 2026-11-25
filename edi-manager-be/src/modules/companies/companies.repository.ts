import { db } from '@/prisma/db.js';
import { Injectable } from '@nestjs/common';
import type {
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
} from './companies.types.js';
import { DbUniqueConflictError } from '@/shared/errors.js';
import {
  isDuplicatedDbError,
  isPostgresDbError,
  parseDuplicatedDbErrorDetail,
} from '@/utils/errors.utils.js';

@Injectable()
export class CompaniesRepository {
  async getCompanies(): Promise<Company[]> {
    return await db.orm.public.Companies.all();
  }

  async createCompany(body: CreateCompanyDto): Promise<string> {
    try {
      const newCompany = await db.orm.public.Companies.create(body);
      return newCompany.id;
    } catch (err) {
      if (isPostgresDbError(err) && isDuplicatedDbError(err)) {
        throw new DbUniqueConflictError(
          parseDuplicatedDbErrorDetail(err.detail),
        );
      }
      throw err;
    }
  }

  async updateCompany(
    id: string,
    body: UpdateCompanyDto,
  ): Promise<string | null> {
    try {
      const updatedCompany = await db.orm.public.Companies.where({ id }).update(
        body,
      );
      return updatedCompany?.id ?? null;
    } catch (err) {
      if (isPostgresDbError(err) && isDuplicatedDbError(err)) {
        throw new DbUniqueConflictError(
          parseDuplicatedDbErrorDetail(err.detail),
        );
      }
      throw err;
    }
  }
}
