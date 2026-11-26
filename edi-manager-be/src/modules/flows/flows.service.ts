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
import {
  DbUniqueConflictError,
  DuplicatedEntityError,
  EntityNotFoundError,
  FlowExecutionError,
} from '@/shared/errors.js';
import type { RunnersService } from '../runners/runnsers.service.js';

// TODO: add socket messages for FE
// TODO: add SMTP server and email for most important errors

@Injectable()
export class FlowsService {
  constructor(
    private readonly flowsQueue: FlowsQueue,
    private readonly flowsMapper: FlowsMapper,
    private readonly flowsRepository: FlowsRepository,
    private readonly runsService: RunsService,
    private readonly runnersService: RunnersService,
  ) {}

  async stopAllFlows() {
    await this.flowsQueue.stopAllJobs();
  }

  async startAllFlows() {
    const flows = await this.flowsRepository.getFlows();
    for (const flow of flows) {
      const flowIsImplemented =
        await this.runnersService.checkFlowImplementation(flow);
      if (!flow.enabled || !flowIsImplemented) continue;
      await this.startFlow(flow);
    }
  }

  async startFlow(flow: Flow) {
    await this.flowsQueue.upsertJob({
      delay: flow.interval * 1000,
      flow,
    });
  }

  async stopFlow(flow: Flow) {
    await this.flowsQueue.stopFlowJob(flow);
  }

  async runFlowJob(flowJob: Job<Flow>) {
    try {
      await this.runnersService.runFlow(flowJob.data);

      const runId = await this.runsService.createRun({
        flowId: flowJob.data.id,
        outcome: 'success',
      });
      await this.flowsRepository.setFlowLastRun(flowJob.data, runId);
    } catch (err) {
      const errorMessage =
        err instanceof FlowExecutionError
          ? err.message
          : `Errore durante l'esecuzione del flow ${flowJob.data.id}`;

      const runId = await this.runsService.createRun({
        flowId: flowJob.data.id,
        outcome: 'fail',
        errorMessage: errorMessage,
      });
      await this.flowsRepository.setFlowLastRun(flowJob.data, runId);
    }
  }

  async getFlows(): Promise<Flow[]> {
    return await this.flowsRepository.getFlows();
  }

  async createFlow(body: CreateFlowDto): Promise<string> {
    try {
      return await this.flowsRepository.createFlow(body);
    } catch (err) {
      if (err instanceof DbUniqueConflictError) {
        throw new DuplicatedEntityError({
          resource: 'FLOWS',
          message: `Flusso duplicato: ${err.fields.join(', ')} non è unico`,
          context: err.fields,
        });
      }
      throw err;
    }
  }

  async updateFlow(id: string, body: UpdateFlowDto): Promise<string> {
    try {
      const flowId = await this.flowsRepository.updateFlow(id, body);
      if (!flowId)
        throw new EntityNotFoundError({
          resource: 'FLOWS',
          message: `Flusso non trovato con id ${id}`,
        });

      return flowId;
    } catch (err) {
      if (err instanceof DbUniqueConflictError) {
        throw new DuplicatedEntityError({
          resource: 'FLOWS',
          message: `Flusso duplicato: ${err.fields.join(', ')} non è unico`,
          context: err.fields,
        });
      }
      throw err;
    }
  }

  async toggleFlow(id: string): Promise<boolean> {
    const flow = await this.flowsRepository.toggleFlow(id);
    if (!flow)
      throw new EntityNotFoundError({
        resource: 'FLOWS',
        message: `Flusso non trovato con id ${id}`,
      });

    const flowIsImplemented =
      await this.runnersService.checkFlowImplementation(flow);

    if (flow.enabled && flowIsImplemented) await this.startFlow(flow);
    else await this.stopFlow(flow);

    return flow.enabled;
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
