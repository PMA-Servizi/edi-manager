import { Injectable } from '@nestjs/common';
import { FlowsQueue } from './flows.queue.js';
import { Job } from 'bullmq';
import { Flow, FlowJob } from './flows.types.js';
import { FlowsMapper } from './flows.mapper.js';
import { FlowsRepository } from './flows.repository.js';

@Injectable()
export class FlowsService {
  constructor(
    private readonly flowsQueue: FlowsQueue,
    private readonly flowsMapper: FlowsMapper,
    private readonly flowsRepository: FlowsRepository,
  ) {}

  async startFlows() {
    const flows = await this.flowsRepository.getFlows();
    for (const flow of flows) {
      if (!flow.enabled) continue;
      this.flowsQueue.upsertJob({
        schedulerId: 'test-scheduler',
        jobName: 'log',
        delay: 5000,
        jobData: flow,
      });
    }
  }

  runFlowJob(flowJob: Job<Flow>) {
    console.log(
      'Just ran flow: ',
      flowJob.data.ediRecordType,
      flowJob.data.operation,
    );
  }

  async getFlows(): Promise<Flow[]> {
    return await this.flowsRepository.getFlows();
  }

  async getFlowJobs(): Promise<FlowJob[]> {
    const runningJobs = await this.flowsQueue.getRunningJobs();
    const queuedJobs = await this.flowsQueue.getQueuedJobs();
    const scheduledJobs = await this.flowsQueue.getScheduledJobs();

    const flows: FlowJob[] = [
      ...runningJobs.map((job) => {
        return this.flowsMapper.formatFlowJob('running', job);
      }),
      ...queuedJobs.map((job) => {
        return this.flowsMapper.formatFlowJob('queued', job);
      }),
      ...scheduledJobs.map((job) => {
        return this.flowsMapper.formatFlowJob('scheduled', job);
      }),
    ];

    return flows;
  }
}
