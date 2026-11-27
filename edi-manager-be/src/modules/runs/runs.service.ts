import { Injectable } from '@nestjs/common';
import { RunsRepository } from './runs.repository.js';
import type { CreateRunBody, Run, UpdateRunBody } from './runs.types.js';
import { FlowExecutionError } from '@/shared/errors.js';

@Injectable()
export class RunsService {
  constructor(private readonly runsRepository: RunsRepository) {}

  async getRuns(): Promise<Run[]> {
    return await this.runsRepository.getRuns();
  }

  async createRun(body: CreateRunBody): Promise<string> {
    return await this.runsRepository.createRun(body);
  }

  async updateRun(id: string, body: UpdateRunBody): Promise<string> {
    try {
      return await this.runsRepository.updateRun(id, body);
    } catch {
      throw new FlowExecutionError(
        `Errore nell'aggiornamento dell'esecuzione con id ${id}`,
      );
    }
  }
}
