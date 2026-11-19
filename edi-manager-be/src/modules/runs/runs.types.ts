import { Flow } from '../flows/flows.types.js';

export type RunOutcome = 'success' | 'fail';

export interface Run {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  outcome: RunOutcome;
  flow: Flow;
  errorMessage: string | null;
}

export interface PartialRun {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  outcome: RunOutcome;
  errorMessage: string | null;
}
