import type { Flow } from '../flows/flows.types.js';

export type RunOutcome = 'success' | 'fail';

export interface Run {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  outcome: RunOutcome;
  flow: Flow;
  errorMessage: string | null;
}

export type RunDto = Omit<Run, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export interface PartialRun {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  outcome: RunOutcome;
  errorMessage: string | null;
}

export interface CreateRunBody {
  outcome: RunOutcome;
  errorMessage?: string;
  flowId: string;
}
