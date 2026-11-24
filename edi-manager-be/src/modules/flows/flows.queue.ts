import { INTERNAL_REDIS_PORT } from '@/config/network.config.js';
import { Injectable } from '@nestjs/common';
import { type ConnectionOptions, Job, Queue } from 'bullmq';
import type { Flow } from './flows.types.js';

@Injectable()
export class FlowsQueue {
  readonly queueId = 'flows-queue';
  private readonly queue: Queue;
  readonly connectionOptions: ConnectionOptions = {
    host: 'redis',
    port: INTERNAL_REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  };

  constructor() {
    this.queue = new Queue(this.queueId, {
      connection: this.connectionOptions,
    });
  }

  async upsertJob({
    schedulerId,
    jobName,
    delay,
    jobData,
  }: {
    schedulerId: string;
    jobName: string;
    delay: number;
    jobData: Flow;
  }): Promise<Job<Flow>> {
    const nextJob = await this.queue.upsertJobScheduler(
      schedulerId,
      {
        every: delay,
      },
      { name: jobName, data: jobData },
    );

    return nextJob;
  }

  async getRunningJobs(): Promise<Job<Flow>[]> {
    return await this.queue.getJobs(['active']);
  }
  async getQueuedJobs(): Promise<Job<Flow>[]> {
    return await this.queue.getJobs([
      'wait',
      'waiting',
      'waiting-children',
      'repeat',
      'prioritized',
    ]);
  }
  async getScheduledJobs(): Promise<Job<Flow>[]> {
    return await this.queue.getJobs(['delayed']);
  }
}
