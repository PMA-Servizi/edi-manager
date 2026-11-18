import { Controller, Get } from '@nestjs/common';
import { FlowsService } from './flows.service.js';

@Controller('/flows')
export class FlowsController {
  constructor(private readonly flowsService: FlowsService) {}

  @Get()
  getFlows(): void {
    return this.flowsService.getFlows();
  }
}
