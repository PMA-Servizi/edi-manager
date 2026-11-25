import { Controller } from '@nestjs/common';
import { RunsService } from './runs.service.js';
import { type Run } from './runs.types.js';
import { EntityNotFoundError } from '@/shared/errors.js';
import { NotFoundException } from '@/shared/exceptions.js';

@Controller('/runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  async getRuns(): Promise<Run[]> {
    try {
      return this.runsService.getRuns();
    } catch (err) {
      if (err instanceof EntityNotFoundError)
        throw new NotFoundException(err.error);
      throw err;
    }
  }
}
