import { Company } from '../companies/companies.types.js';
import { Customer } from '../customers/customers.types.js';
import { PartialRun, Run } from '../runs/runs.types.js';

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
  interval: number;
  ediRecordType: EdiRecordType;
  operation: EdiOperation;
  company: Company;
  customer: Customer;
  lastRun: PartialRun | null;
}

export type FlowJobStatus = 'running' | 'scheduled' | 'queued';

export interface FlowJob {
  status: FlowJobStatus;
  nextRun: Date;
  nextRunIn: number;
  schedulerId?: string;
  name: string;
  data: Flow;
}
