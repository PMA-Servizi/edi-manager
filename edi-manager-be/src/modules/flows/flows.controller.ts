import { Controller, Get } from '@nestjs/common';
import { FlowsService } from './flows.service.js';
import { Flow, FlowJob } from './flows.types.js';

@Controller('/flows')
export class FlowsController {
  constructor(private readonly flowsService: FlowsService) {}

  @Get()
  async getFlows(): Promise<Flow[]> {
    return await this.flowsService.getFlows();
  }

  @Get('/jobs')
  async getFlowJobs(): Promise<FlowJob[]> {
    return await this.flowsService.getFlowJobs();
  }
}
