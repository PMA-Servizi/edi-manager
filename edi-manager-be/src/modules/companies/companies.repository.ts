import { db } from '@/prisma/db.js';
import { Injectable } from '@nestjs/common';
import { Company } from './companies.types.js';

@Injectable()
export class CompaniesRepository {
  async getCompanies(): Promise<Company[]> {
    return await db.orm.public.Companies.all();
  }
}
