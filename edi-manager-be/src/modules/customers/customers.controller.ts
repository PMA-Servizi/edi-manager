import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CustomersService } from './customers.service.js';
import { type CreateCustomerDto, Customer } from './customers.types.js';
import { CreateCustomerSchema } from './customer.schemas.js';
import { DuplicatedEntityError } from '@/shared/errors.js';

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
}
