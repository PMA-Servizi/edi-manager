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
      if (err instanceof DbUniqueConflictError && err.constraint) {
        throw new DuplicatedEntityError(
          `Cliente duplicato: ${err.constraint} non è unico`,
        );
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
        throw new EntityNotFoundError(`Cliente non trovato con id ${id}`);
      return updatedCustomerId;
    } catch (err) {
      if (err instanceof DbUniqueConflictError && err.constraint) {
        throw new DuplicatedEntityError(
          `Cliente duplicato: ${err.constraint} non è unico`,
        );
      }
      throw err;
    }
  }
}
