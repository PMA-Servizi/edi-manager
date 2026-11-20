import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { RunsService } from './runs.service.js';
import { Run } from './runs.types.js';
import { EntityNotFoundError } from '@/shared/errors.js';

@Controller('/runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  async getRuns(): Promise<Run[]> {
    try {
      return this.runsService.getRuns();
    } catch (err) {
      if (err instanceof EntityNotFoundError)
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      throw err;
    }
  }
}
