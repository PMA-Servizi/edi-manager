import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
        throw new HttpException(err.message, HttpStatus.CONFLICT);
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
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      if (err instanceof EntityNotFoundError)
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      throw err;
    }
  }
}
