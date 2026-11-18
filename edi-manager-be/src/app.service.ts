import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { FlowsService } from './modules/flows/flows.service.js';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly flowsService: FlowsService) {}

  onApplicationBootstrap() {
    this.logger.debug(
      `Checking env for START_JOBS_ON_STARTUP: ${process.env.START_JOBS_ON_STARTUP}`,
    );
    if (process.env.START_JOBS_ON_STARTUP === 'true') {
      this.startJobs();
    }
  }

  startJobs() {
    this.logger.debug('Starting all jobs...');
    this.flowsService.startFlows();
  }
}
