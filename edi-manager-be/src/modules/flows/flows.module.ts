import { Module } from '@nestjs/common';
import { FlowsController } from './flows.controller.js';
import { FlowsService } from './flows.service.js';
import { FlowsQueue } from './flows.queue.js';
import { FlowsWorker } from './flows.worker.js';

@Module({
  controllers: [FlowsController],
  providers: [FlowsService, FlowsQueue, FlowsWorker],
  exports: [FlowsService],
})
export class FlowsModule {}
