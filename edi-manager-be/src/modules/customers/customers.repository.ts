import { Injectable } from '@nestjs/common';
import { Customer } from './customers.types.js';
import { db } from '@/prisma/db.js';

@Injectable()
export class CustomersRepository {
  async getCustomers(): Promise<Customer[]> {
    return await db.orm.public.Customers.all();
  }
}
