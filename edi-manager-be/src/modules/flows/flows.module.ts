import { Module } from '@nestjs/common';
import { FlowsController } from './flows.controller.js';
import { FlowsService } from './flows.service.js';
import { FlowsQueue } from './flows.queue.js';
import { FlowsWorker } from './flows.worker.js';
import { FlowsMapper } from './flows.mapper.js';
import { FlowsRepository } from './flows.repository.js';
import { RunsModule } from '../runs/runs.module.js';

@Module({
  controllers: [FlowsController],
  providers: [
    FlowsService,
    FlowsQueue,
    FlowsWorker,
    FlowsMapper,
    FlowsRepository,
  ],
  exports: [FlowsService],
  imports: [RunsModule],
})
export class FlowsModule {}
