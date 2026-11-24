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
  gln: string;
}
export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomerDto = z.infer<typeof UpdateCustomerSchema>;
