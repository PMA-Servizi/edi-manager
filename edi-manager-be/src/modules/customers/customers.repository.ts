import { Injectable } from '@nestjs/common';
import {
  CreateCustomerDto,
  Customer,
  UpdateCustomerDto,
} from './customers.types.js';
import { db } from '@/prisma/db.js';
import { DbUniqueConflictError } from '@/shared/errors.js';

@Injectable()
export class CustomersRepository {
  async getCustomers(): Promise<Customer[]> {
    return await db.orm.public.Customers.all();
  }

  async createCustomer(body: CreateCustomerDto): Promise<string> {
    try {
      const newCustomer = await db.orm.public.Customers.create(body);
      return newCustomer.id;
    } catch (err) {
      const dbError = err as { sqlState?: string; constraint?: string };
      if (dbError.sqlState === '23505') {
        throw new DbUniqueConflictError(dbError.constraint);
      }
      throw err;
    }
  }

  async updateCustomer(id: string, body: UpdateCustomerDto): Promise<string> {
    try {
      await db.orm.public.Customers.where({ id }).update(body);
      return id;
    } catch (err) {
      const dbError = err as { sqlState?: string; constraint?: string };
      if (dbError.sqlState === '23505') {
        throw new DbUniqueConflictError(dbError.constraint);
      }
      throw err;
    }
  }
}
