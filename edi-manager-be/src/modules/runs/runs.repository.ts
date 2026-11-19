import { Injectable } from '@nestjs/common';
import { Run } from './runs.types.js';
import { db } from '@/prisma/db.js';
import { EntityNotFoundError } from '@/shared/errors.js';

@Injectable()
export class RunsRepository {
  async getRuns(): Promise<Run[]> {
    const runs = await db.orm.public.Runs.include('flow', (flow) =>
      flow
        .include('customer')
        .include('company')
        .include('lastRun', (lastRun) =>
          lastRun.select(
            'id',
            'createdAt',
            'updatedAt',
            'outcome',
            'errorMessage',
          ),
        ),
    ).all();
    return runs.map(({ flow, ...run }) => {
      if (!flow)
        throw new EntityNotFoundError("Could not find the run's original flow");
      return { ...run, flow };
    });
  }
}
