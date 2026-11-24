import { Injectable } from '@nestjs/common';
import type { Flow, FlowJob, FlowJobStatus } from './flows.types.js';
import { Job } from 'bullmq';

@Injectable()
export class FlowsMapper {
  formatFlowJob(status: FlowJobStatus, job: Job<Flow>): FlowJob {
    return {
      status,
      nextRun: new Date(job.timestamp + job.delay),
      nextRunIn: job.timestamp + job.delay - Date.now(),
      schedulerId: job.repeatJobKey,
      name: job.name,
      data: job.data,
    };
  }
}
