import { INTERNAL_REDIS_PORT } from '@/config/network.config.js';
import { Injectable } from '@nestjs/common';
import { ConnectionOptions, Job, Queue } from 'bullmq';
import { Flow } from './flows.types.js';

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
  }: {
    schedulerId: string;
    jobName: string;
    delay: number;
  }): Promise<Job> {
    const nextJob = await this.queue.upsertJobScheduler(
      schedulerId,
      {
        every: delay,
      },
      { name: jobName, data: 'test dalla coda' },
    );

    return nextJob;
  }

  async getRunningJobs(): Promise<Job[]> {
    return await this.queue.getJobs(['active']);
  }
  async getQueuedJobs(): Promise<Job[]> {
    return await this.queue.getJobs([
      'wait',
      'waiting',
      'waiting-children',
      'repeat',
      'prioritized',
    ]);
  }
  async getScheduledJobs(): Promise<Job[]> {
    return await this.queue.getJobs(['delayed']);
  }
}
