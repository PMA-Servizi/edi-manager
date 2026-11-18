import { INTERNAL_REDIS_PORT } from '@/config/network.config.js';
import { Injectable } from '@nestjs/common';
import { ConnectionOptions, Job, Queue, Worker } from 'bullmq';
import { FlowsService } from './flows.service.js';

@Injectable()
export class FlowsQueue {
  private readonly queueId = 'flows-queue';
  private readonly queue: Queue;
  private readonly connectionOptions: ConnectionOptions = {
    host: 'redis',
    port: INTERNAL_REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  };

  constructor(private readonly flowsService: FlowsService) {
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
  }): Promise<Worker> {
    const worker = new Worker(
      this.queueId,
      async (job: Job) => this.flowsService.runFlow(job),
      {
        connection: this.connectionOptions,
      },
    );

    await this.queue.upsertJobScheduler(
      schedulerId,
      {
        every: delay,
      },
      { name: jobName, data: 'test dalla coda' },
    );
    return worker;
  }
}
