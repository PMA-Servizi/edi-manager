import { Injectable } from '@nestjs/common';
import type { CreateFlowDto, Flow, UpdateFlowDto } from './flows.types.js';
import { db } from '@/prisma/db.js';
import { DbUniqueConflictError } from '@/shared/errors.js';
import {
  isDuplicatedDbError,
  isPostgresDbError,
  parseDuplicatedDbErrorDetail,
} from '@/utils/errors.utils.js';

@Injectable()
export class FlowsRepository {
  async getFlows(): Promise<Flow[]> {
    return await db.orm.public.Flows.include('company')
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

  async toggleFlow(id: string): Promise<Flow | null> {
    const targetFlow = await db.orm.public.Flows.where({ id }).first();
    if (!targetFlow) return null;
    const newEnabled = !targetFlow.enabled;
    const updatedFlow = await db.orm.public.Flows.where({ id })
      .include('company')
      .include('customer')
      .include('lastRun')
      .update({
        enabled: newEnabled,
      });
    if (!updatedFlow) return null;
    return updatedFlow;
  }
}
