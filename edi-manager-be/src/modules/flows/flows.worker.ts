import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { FlowsService } from './flows.service.js';
import { FlowsQueue } from './flows.queue.js';
import { Worker } from 'bullmq';

@Injectable()
export class FlowsWorker implements OnModuleInit, OnModuleDestroy {
  private worker: Worker;

  constructor(
    private readonly flowsService: FlowsService,
    private readonly flowsQueue: FlowsQueue,
  ) {}

  onModuleInit() {
    this.worker = new Worker(
      this.flowsQueue.queueId,
      async (job) => this.flowsService.runFlowJob(job),
      { connection: this.flowsQueue.connectionOptions },
    );
  }

  async onModuleDestroy() {
    await this.worker?.close();
  }
}
