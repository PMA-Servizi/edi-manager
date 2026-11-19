import { Controller } from '@nestjs/common';
import { RunsService } from './runs.service.js';
import { Run } from './runs.types.js';

@Controller('/runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  async getRuns(): Promise<Run[]> {
    return this.runsService.getRuns();
  }
}
