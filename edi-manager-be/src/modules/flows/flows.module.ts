import { Module } from '@nestjs/common';
import { FlowsController } from './flows.controller.js';
import { FlowsService } from './flows.service.js';
import { FlowsQueue } from './flows.queue.js';

@Module({
  controllers: [FlowsController],
  providers: [FlowsService, FlowsQueue],
  exports: [FlowsService],
})
export class FlowsModule {}
