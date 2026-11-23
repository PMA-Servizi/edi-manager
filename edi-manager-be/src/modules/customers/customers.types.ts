import z from 'zod';
import {
  CreateCustomerSchema,
  UpdateCustomerSchema,
} from './customer.schemas.js';

export interface Customer {
  id: string;
  name: string;
  sapCustomerCode: string;
  catalogId: number;
}

export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomerDto = z.infer<typeof UpdateCustomerSchema>;
