import z from 'zod';
import { CreateFlowSchema, UpdateFlowSchema } from './flows.schemas.js';
import type { Company } from '../companies/companies.types.js';
import type { Customer } from '../customers/customers.types.js';

export type EdiOperation = 'download' | 'upload';
export type EdiRecordType =
  | 'ANPROD'
  | 'DESADV'
  | 'ORDERS'
  | 'ORDRSP'
  | 'PACLIS'
  | 'SELLIN'
  | 'INVSUP'
  | 'ORDLIS'
  | 'REMADV'
  | 'INVRPT'
  | 'SLSRPT'
  | 'PRICAT'
  | 'NOTACC'
  | 'NOTADD'
  | 'ORDPRP';

export interface Flow {
  id: string;
  enabled: boolean;
  company: Company;
  customer: Customer;
  operation: EdiOperation;
  interval: number;
  ediRecordType: EdiRecordType;
}
export type CreateFlowDto = z.output<typeof CreateFlowSchema>;
export type UpdateFlowDto = z.output<typeof UpdateFlowSchema>;

export type FlowJobStatus = 'running' | 'scheduled' | 'queued';

export interface FlowJob {
  status: FlowJobStatus;
  nextRun: Date;
  nextRunIn: number;
  schedulerId?: string;
  name: string;
  data: Flow;
}
