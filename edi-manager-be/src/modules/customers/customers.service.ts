import { Injectable } from '@nestjs/common';
import { Customer } from './customers.types.js';
import { CustomersRepository } from './customers.repository.js';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async getCustomers(): Promise<Customer[]> {
    return await this.customersRepository.getCustomers();
  }
}
