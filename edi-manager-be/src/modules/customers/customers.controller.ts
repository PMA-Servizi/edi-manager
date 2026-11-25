import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomersService } from './customers.service.js';
import type {
  CreateCustomerDto,
  Customer,
  UpdateCustomerDto,
} from './customers.types.js';
import {
  CreateCustomerSchema,
  UpdateCustomerSchema,
} from './customer.schemas.js';
import { DuplicatedEntityError, EntityNotFoundError } from '@/shared/errors.js';
import { DuplicatedException, NotFoundException } from '@/shared/exceptions.js';

@Controller('/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getCustomers(): Promise<Customer[]> {
    return await this.customersService.getCustomers();
  }

  @Post()
  async createCustomer(
    @Body({ schema: CreateCustomerSchema }) body: CreateCustomerDto,
  ): Promise<string> {
    try {
      return await this.customersService.createCustomer(body);
    } catch (err) {
      if (err instanceof DuplicatedEntityError)
        throw new DuplicatedException(err.error);
      throw err;
    }
  }

  @Patch('/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body({ schema: UpdateCustomerSchema }) body: UpdateCustomerDto,
  ): Promise<string> {
    try {
      return await this.customersService.updateCustomer(id, body);
    } catch (err) {
      if (err instanceof DuplicatedEntityError)
        throw new DuplicatedException(err.error);
      if (err instanceof EntityNotFoundError)
        throw new NotFoundException(err.error);
      throw err;
    }
  }
}
