import {
  Injectable,
  Logger,
  type OnApplicationBootstrap,
} from '@nestjs/common';
import { FlowsService } from './modules/flows/flows.service.js';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly flowsService: FlowsService) {}

  async onApplicationBootstrap() {
    this.logger.debug(
      `START_JOBS_ON_STARTUP: ${process.env.START_JOBS_ON_STARTUP}`,
    );
    if (process.env.START_JOBS_ON_STARTUP === 'true') await this.startJobs();
  }

  async startJobs() {
    this.logger.debug('Starting all jobs...');
    await this.flowsService.startFlows();
  }
}
