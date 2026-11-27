import z from 'zod';
import { CreateFlowSchema, UpdateFlowSchema } from './flows.schemas.js';
import type { Company } from '../companies/companies.types.js';
import type { Customer } from '../customers/customers.types.js';
import type { PartialRun } from '../runs/runs.types.js';
import { EdiRecordType } from '../parsers/parsers.types.js';

export type Union = 'metel' | 'ediel';
export type EdiOperation = 'download' | 'upload';

export interface Flow {
  id: string;
  enabled: boolean;
  company: Company;
  customers: Customer[];
  operation: EdiOperation;
  interval: number;
  ediRecordType: EdiRecordType;
  union: Union;
  lastRun: PartialRun | null;
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
