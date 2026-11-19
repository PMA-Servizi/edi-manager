import { Module } from '@nestjs/common';
import { RunsRepository } from './runs.repository.js';
import { RunsService } from './runs.service.js';
import { RunsController } from './runs.controller.js';

@Module({
  controllers: [RunsController],
  providers: [RunsService, RunsRepository],
  exports: [RunsService],
})
export class RunsModule {}
