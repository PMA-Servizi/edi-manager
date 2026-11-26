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
    delay,
    flow,
  }: {
    delay: number;
    flow: Flow;
  }): Promise<Job<Flow>> {
    const nextJob = await this.queue.upsertJobScheduler(
      flow.id,
      {
        every: delay,
      },
      { data: flow },
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
  async stopAllJobs() {
    const schedulers = await this.queue.getJobSchedulers(0, -1);
    for (const scheduler of schedulers) {
      await this.queue.removeJobScheduler(scheduler.key);
    }
    await this.queue.drain(true);
  }

  async stopFlowJob(flow: Flow) {
    await this.queue.removeJobScheduler(flow.id);
  }
}
