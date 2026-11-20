import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CompaniesService } from './companies.service.js';
import { Company, type CreateCompanyDto } from './companies.types.js';
import { CreateCompanySchema } from './companies.schemas.js';
import { DuplicatedEntityError } from '@/shared/errors.js';

@Controller('/companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async getCompanies(): Promise<Company[]> {
    return await this.companiesService.getCompanies();
  }

  @Post()
  async createCompany(
    @Body({ schema: CreateCompanySchema }) body: CreateCompanyDto,
  ): Promise<string> {
    try {
      return await this.companiesService.createCompany(body);
    } catch (err) {
      if (err instanceof DuplicatedEntityError)
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      throw err;
    }
  }
}
