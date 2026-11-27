import { Injectable } from '@nestjs/common';
import type { CreateRunBody, Run, UpdateRunBody } from './runs.types.js';
import { db } from '@/prisma/db.js';
import { EntityNotFoundError } from '@/shared/errors.js';

@Injectable()
export class RunsRepository {
  async getRuns(): Promise<Run[]> {
    const runs = await db.orm.public.Runs.include('flow', (flow) =>
      flow
        .include('customers')
        .include('company')
        .include('lastRun', (lastRun) =>
          lastRun.select(
            'id',
            'createdAt',
            'updatedAt',
            'status',
            'errorMessage',
          ),
        ),
    )
      .orderBy((run) => run.createdAt.desc())
      .all();
    return runs.map(({ flow, ...run }) => {
      if (!flow)
        throw new EntityNotFoundError({
          resource: 'RUNS',
          message: `Could not find the run's original flow for run ${run.id}`,
        });
      const lastRun = flow.lastRun;
      if (!lastRun && flow.lastRunId)
        throw new EntityNotFoundError({
          resource: 'RUNS',
          message: `Could not find the run's original flow for run ${run.id}`,
        });
      return { ...run, flow: { ...flow, lastRun } };
    });
  }

  async createRun(body: CreateRunBody): Promise<string> {
    const newRun = await db.orm.public.Runs.create(body);
    return newRun.id;
  }

  async updateRun(id: string, body: UpdateRunBody): Promise<string> {
    const updatedRun = await db.orm.public.Runs.where({ id }).update(body);
    if (!updatedRun)
      throw new EntityNotFoundError({
        resource: 'RUNS',
        message: `Esecuzione non trovata con id ${id}`,
      });
    return updatedRun.id;
  }
}
