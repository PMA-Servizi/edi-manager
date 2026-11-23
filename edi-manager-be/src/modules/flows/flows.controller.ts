import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { FlowsService } from './flows.service.js';
import { type CreateFlowDto, Flow, FlowJob } from './flows.types.js';
import { CreateFlowSchema } from './flows.schemas.js';
import { DuplicatedEntityError } from '@/shared/errors.js';

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

  @Post()
  async createFlow(
    @Body({ schema: CreateFlowSchema }) body: CreateFlowDto,
  ): Promise<string> {
    try {
      return await this.flowsService.createFlow(body);
    } catch (err) {
      if (err instanceof DuplicatedEntityError)
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      throw err;
    }
  }
}
