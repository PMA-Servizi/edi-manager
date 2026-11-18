import { Injectable } from '@nestjs/common';
import { FlowsQueue } from './flows.queue.js';
import { Job } from 'bullmq';

@Injectable()
export class FlowsService {
  constructor(private readonly flowsQueue: FlowsQueue) {}

  startFlows(): void {
    this.flowsQueue.upsertJob({
      schedulerId: 'test-scheduler',
      jobName: 'log',
      delay: 5000,
    });
  }

  runFlow(flow: Job): void {
    console.log(flow.data);
  }

  getFlows(): void {}
}
