import { Injectable } from '@nestjs/common';
import type {
  CreateCustomerDto,
  Customer,
  UpdateCustomerDto,
} from './customers.types.js';
import { CustomersRepository } from './customers.repository.js';
import {
  DbUniqueConflictError,
  DuplicatedEntityError,
  EntityNotFoundError,
} from '@/shared/errors.js';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async getCustomers(): Promise<Customer[]> {
    return await this.customersRepository.getCustomers();
  }

  async createCustomer(body: CreateCustomerDto): Promise<string> {
    try {
      return await this.customersRepository.createCustomer(body);
    } catch (err) {
      if (err instanceof DbUniqueConflictError) {
        throw new DuplicatedEntityError({
          resource: 'CUSTOMERS',
          message: `Cliente duplicato: ${err.fields.join(', ')} non è unico`,
          context: err.fields,
        });
      }
      throw err;
    }
  }

  async updateCustomer(id: string, body: UpdateCustomerDto): Promise<string> {
    try {
      const updatedCustomerId = await this.customersRepository.updateCustomer(
        id,
        body,
      );
      if (!updatedCustomerId)
        throw new EntityNotFoundError({
          resource: 'CUSTOMERS',
          message: `Cliente non trovato con id ${id}`,
        });
      return updatedCustomerId;
    } catch (err) {
      if (err instanceof DbUniqueConflictError) {
        throw new DuplicatedEntityError({
          resource: 'CUSTOMERS',
          message: `Cliente duplicato: ${err.fields.join(', ')} non è unico`,
          context: err.fields,
        });
      }
      throw err;
    }
  }
}
