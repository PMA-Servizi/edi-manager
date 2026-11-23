import z from 'zod';
import { ediCompanyCodeType } from './companies.constants.js';
import {
  CreateCompanySchema,
  UpdateCompanySchema,
} from './companies.schemas.js';

export type EdiCompanyCodeType =
  (typeof ediCompanyCodeType)[keyof typeof ediCompanyCodeType];

export interface Company {
  id: string;
  name: string;
  division: string;
  ediCompanyCode: string;
  ediCompanyCodeType: EdiCompanyCodeType;
  businessName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  courtOfLaw: string | null;
  cciaa: string;
  shareCapital: string;
  raeeRegistrationNumber: string;
  pileRegistrationNumber: string;
}

export type CreateCompanyDto = z.output<typeof CreateCompanySchema>;
export type UpdateCompanyDto = z.output<typeof UpdateCompanySchema>;
