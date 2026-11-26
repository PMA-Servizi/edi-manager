import { Injectable } from '@nestjs/common';
import type { CreateFlowDto, Flow, UpdateFlowDto } from './flows.types.js';
import { db } from '@/prisma/db.js';
import { DbUniqueConflictError, EntityNotFoundError } from '@/shared/errors.js';
import {
  isDuplicatedDbError,
  isPostgresDbError,
  parseDuplicatedDbErrorDetail,
} from '@/utils/errors.utils.js';

@Injectable()
export class FlowsRepository {
  async getFlows(): Promise<Flow[]> {
    const flows = await db.orm.public.Flows.include('company')
      .include('customer')
      .include('lastRun', (lastRun) =>
        lastRun.select(
          'id',
          'createdAt',
          'updatedAt',
          'outcome',
          'errorMessage',
        ),
      )
      .all();
    return flows.map((flow) => {
      if (flow.lastRunId && !flow.lastRun)
        throw new EntityNotFoundError({
          resource: 'RUNS',
          message: `Ultima esecuzione con id ${flow.lastRunId} non trovata per il flow con id ${flow.id}`,
        });
      return flow;
    });
  }

  async createFlow(body: CreateFlowDto): Promise<string> {
    try {
      const newFlow = await db.orm.public.Flows.create(body);
      return newFlow.id;
    } catch (err) {
      if (isPostgresDbError(err) && isDuplicatedDbError(err)) {
        throw new DbUniqueConflictError(
          parseDuplicatedDbErrorDetail(err.detail),
        );
      }
      throw err;
    }
  }

  async updateFlow(id: string, body: UpdateFlowDto): Promise<string | null> {
    try {
      const updatedFlow = await db.orm.public.Flows.where({ id }).update(body);
      return updatedFlow?.id ?? null;
    } catch (err) {
      if (isPostgresDbError(err) && isDuplicatedDbError(err)) {
        throw new DbUniqueConflictError(
          parseDuplicatedDbErrorDetail(err.detail),
        );
      }
      throw err;
    }
  }

  async toggleFlow(id: string): Promise<Flow> {
    const targetFlow = await db.orm.public.Flows.where({ id }).first();
    if (!targetFlow)
      throw new EntityNotFoundError({
        resource: 'FLOWS',
        message: `Flow non trovato con id ${id}`,
      });
    const newEnabled = !targetFlow.enabled;
    const updatedFlow = await db.orm.public.Flows.where({ id })
      .include('company')
      .include('customer')
      .include('lastRun', (lastRun) =>
        lastRun.select(
          'id',
          'createdAt',
          'updatedAt',
          'outcome',
          'errorMessage',
        ),
      )
      .update({
        enabled: newEnabled,
      });
    if (!updatedFlow)
      throw new EntityNotFoundError({
        resource: 'RUNS',
        message: `Flow non trovato con id ${id}`,
      });
    const lastRun = updatedFlow.lastRun;
    if (updatedFlow.lastRunId && !lastRun)
      throw new EntityNotFoundError({
        resource: 'FLOWS',
        message: `Ultima esecuzione con id ${updatedFlow.lastRunId} non trovata per il flow con id ${id}`,
      });
    return { ...updatedFlow, lastRun };
  }

  async setFlowLastRun(flow: Flow, runId: string) {
    await db.orm.public.Flows.where({ id: flow.id }).update({
      lastRunId: runId,
    });
  }
}
