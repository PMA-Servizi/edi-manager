import { Controller, Get } from '@nestjs/common';
import { FlowsService } from './flows.service.js';
import { Flow } from './flows.types.js';

@Controller('flows')
export class FlowsController {
  constructor(private readonly flowsService: FlowsService) {}

  @Get()
  async getFlows(): Promise<Flow<unknown>[]> {
    return await this.flowsService.getFlows();
  }
}
