export type FlowStatus = 'running' | 'scheduled' | 'queued';

export interface Flow<T> {
  status: FlowStatus;
  nextRun: Date;
  nextRunIn: number;
  schedulerId?: string;
  name: string;
  data: T;
}
