import { Injectable } from '@nestjs/common';
import { RunsRepository } from './runs.repository.js';
import { Run } from './runs.types.js';

@Injectable()
export class RunsService {
  constructor(private readonly runsRepository: RunsRepository) {}

  async getRuns(): Promise<Run[]> {
    return await this.runsRepository.getRuns();
  }
}
