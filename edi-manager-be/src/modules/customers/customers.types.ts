import z from 'zod';
import { CreateCustomerSchema } from './customer.schemas.js';

export interface Customer {
  id: string;
  name: string;
  sapCustomerCode: string;
  catalogId: number;
}

export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;
