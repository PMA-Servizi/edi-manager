import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service.js';
import type {
  Company,
  UpdateCompanyDto,
  CreateCompanyDto,
} from './companies.types.js';
import {
  CreateCompanySchema,
  UpdateCompanySchema,
} from './companies.schemas.js';
import { DuplicatedEntityError, EntityNotFoundError } from '@/shared/errors.js';
import { DuplicatedException, NotFoundException } from '@/shared/exceptions.js';

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
        throw new NotFoundException(err.error);
      throw err;
    }
  }

  @Patch('/:id')
  async updateCompany(
    @Param('id') id: string,
    @Body({ schema: UpdateCompanySchema }) body: UpdateCompanyDto,
  ): Promise<string> {
    try {
      return await this.companiesService.updateCompany(id, body);
    } catch (err) {
      if (err instanceof DuplicatedEntityError)
        throw new DuplicatedException(err.error);
      if (err instanceof EntityNotFoundError)
        throw new NotFoundException(err.error);
      throw err;
    }
  }
}
