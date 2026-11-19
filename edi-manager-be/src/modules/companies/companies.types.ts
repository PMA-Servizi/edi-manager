import { ediCompanyCodeType } from './companies.constants.js';

export type EdiCompanyCodeType =
  (typeof ediCompanyCodeType)[keyof typeof ediCompanyCodeType];

export interface Company {
  id: string;
  name: string;
  slug: string;
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
  ccia: string;
  shareCapital: string;
  raeeRegistrationNumber: string;
  pileRegistrationNumber: string;
}
