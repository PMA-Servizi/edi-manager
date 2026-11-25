import { Injectable } from '@nestjs/common';
import type {
  CreateCustomerDto,
  Customer,
  UpdateCustomerDto,
} from './customers.types.js';
import { db } from '@/prisma/db.js';
import { DbUniqueConflictError } from '@/shared/errors.js';
import {
  isDuplicatedDbError,
  isPostgresDbError,
  parseDuplicatedDbErrorDetail,
} from '@/utils/errors.utils.js';

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
      if (isPostgresDbError(err) && isDuplicatedDbError(err)) {
        throw new DbUniqueConflictError(
          parseDuplicatedDbErrorDetail(err.detail),
        );
      }
      throw err;
    }
  }

  async updateCustomer(
    id: string,
    body: UpdateCustomerDto,
  ): Promise<string | null> {
    try {
      const updatedCustomer = await db.orm.public.Customers.where({
        id,
      }).update(body);
      return updatedCustomer?.id ?? null;
    } catch (err) {
      if (isPostgresDbError(err) && isDuplicatedDbError(err)) {
        throw new DbUniqueConflictError(
          parseDuplicatedDbErrorDetail(err.detail),
        );
      }
      throw err;
    }
  }
}
