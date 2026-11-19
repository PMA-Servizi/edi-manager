import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './customers.service.js';
import { Customer } from './customers.types.js';

@Controller('/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getCustomers(): Promise<Customer[]> {
    return await this.customersService.getCustomers();
  }
}
