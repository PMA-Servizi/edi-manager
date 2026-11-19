import { Injectable } from '@nestjs/common';
import { FlowsQueue } from './flows.queue.js';
import { Job } from 'bullmq';
import { Flow, FlowStatus } from './flows.types.js';

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

  runFlow(flow: Job) {
    console.log(flow.data);
  }

  async getFlows(): Promise<Flow<unknown>[]> {
    const runningJobs = await this.flowsQueue.getRunningJobs();
    const queuedJobs = await this.flowsQueue.getQueuedJobs();
    const scheduledJobs = await this.flowsQueue.getScheduledJobs();

    const flows: Flow<unknown>[] = [
      ...runningJobs.map((job) => {
        return this.formatFlow('running', job);
      }),
      ...queuedJobs.map((job) => {
        return this.formatFlow('queued', job);
      }),
      ...scheduledJobs.map((job) => {
        return this.formatFlow('scheduled', job);
      }),
    ];

    return flows;
  }

  formatFlow<T>(status: FlowStatus, job: Job<T>): Flow<T> {
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
