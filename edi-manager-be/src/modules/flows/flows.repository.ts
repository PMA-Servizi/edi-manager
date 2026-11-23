import { Injectable } from '@nestjs/common';
import { CreateFlowDto, Flow } from './flows.types.js';
import { db } from '@/prisma/db.js';

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
    const newFlow = await db.orm.public.Flows.create(body);
    return newFlow.id;
  }
}
