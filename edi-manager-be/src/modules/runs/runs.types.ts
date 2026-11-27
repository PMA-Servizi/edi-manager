import type { Flow } from '../flows/flows.types.js';

export type RunStatus = 'success' | 'fail' | 'processing';

export interface Run {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: RunStatus;
  flow: Flow;
  errorMessage: string | null;
}

export type RunDto = Omit<Run, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type PartialRun = Omit<Run, 'flow'>;

export interface CreateRunBody {
  status?: RunStatus;
  errorMessage?: string;
  flowId: string;
}
export type UpdateRunBody = Partial<CreateRunBody>;
