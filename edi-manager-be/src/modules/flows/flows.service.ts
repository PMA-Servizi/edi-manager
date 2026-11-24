import { Injectable } from '@nestjs/common';
import { FlowsQueue } from './flows.queue.js';
import { Job } from 'bullmq';
import type {
  CreateFlowDto,
  Flow,
  FlowJob,
  UpdateFlowDto,
} from './flows.types.js';
import { FlowsMapper } from './flows.mapper.js';
import { FlowsRepository } from './flows.repository.js';
import { RunsService } from '../runs/runs.service.js';
import { type CreateRunBody } from '../runs/runs.types.js';
import {
  DbUniqueConflictError,
  DuplicatedEntityError,
  EntityNotFoundError,
} from '@/shared/errors.js';

@Injectable()
export class FlowsService {
  constructor(
    private readonly flowsQueue: FlowsQueue,
    private readonly flowsMapper: FlowsMapper,
    private readonly flowsRepository: FlowsRepository,
    private readonly runsService: RunsService,
  ) {}

  async startFlows() {
    const flows = await this.flowsRepository.getFlows();
    for (const flow of flows) {
      if (!flow.enabled) continue;
      await this.flowsQueue.upsertJob({
        schedulerId: 'test-scheduler',
        jobName: 'log',
        delay: 5000,
        jobData: flow,
      });
    }
  }

  async runFlowJob(flowJob: Job<Flow>) {
    try {
      console.log(
        'Just ran flow: ',
        flowJob.data.ediRecordType,
        flowJob.data.operation,
      );

      const newRunBody: CreateRunBody = {
        flowId: flowJob.data.id,
        outcome: 'success',
      };
      await this.runsService.createRun(newRunBody);
    } catch {
      const newRunBody: CreateRunBody = {
        flowId: flowJob.data.id,
        outcome: 'fail',
        errorMessage: 'Errore durante la run!',
      };
      await this.runsService.createRun(newRunBody);
    }
  }

  async getFlows(): Promise<Flow[]> {
    return await this.flowsRepository.getFlows();
  }

  async createFlow(body: CreateFlowDto): Promise<string> {
    try {
      return await this.flowsRepository.createFlow(body);
    } catch (err) {
      if (err instanceof DbUniqueConflictError && err.constraint) {
        throw new DuplicatedEntityError(
          `Flusso duplicato: ${err.constraint} non è unico`,
        );
      }
      throw err;
    }
  }

  async updateFlow(id: string, body: UpdateFlowDto): Promise<string> {
    try {
      const flowId = await this.flowsRepository.updateFlow(id, body);
      if (!flowId)
        throw new EntityNotFoundError(`Flusso non trovato con id ${id}`);
      return flowId;
    } catch (err) {
      if (err instanceof DbUniqueConflictError && err.constraint) {
        throw new DuplicatedEntityError(
          `Flusso duplicato: ${err.constraint} non è unico`,
        );
      }
      throw err;
    }
  }

  async toggleFlow(id: string): Promise<boolean> {
    const toggleResult = await this.flowsRepository.toggleFlow(id);
    if (!toggleResult)
      throw new EntityNotFoundError(`Flusso non trovato con id ${id}`);
    return toggleResult;
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
