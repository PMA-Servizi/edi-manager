import { Injectable } from '@nestjs/common';
import { Flow } from './flows.types.js';
import { db } from '@/prisma/db.js';

@Injectable()
export class FlowsRepository {
  async getFlows(): Promise<Flow[]> {
    return await db.orm.public.Flows.include('company').all();
  }
}
