import { Injectable } from '@nestjs/common';
import type { Flow } from '../flows/flows.types.js';
import type { FetchersService } from '../fetchers/fetchers.service.js';

@Injectable()
export class RunnersService {
  constructor(private readonly fetchersService: FetchersService) {}

  async checkFlowImplementation(flow: Flow) {
    // TODO: check implementation
    return true;
  }

  async runFlow(flow: Flow) {
    if (flow.operation === 'download') await this.runDownloadFlow(flow);
    else await this.runUploadFlow(flow);
  }

  async runDownloadFlow(flow: Flow) {
    const files = await this.fetchersService.getFetcher(flow).fetchFiles(flow);

    // TODO
    // loop over files
    // for each file divide in messages and parse them
    // for each parsedMessage update PidocDB
  }

  async runUploadFlow(flow: Flow) {
    // TODO
    // fetch data -> read from PidocDB
    // create messages from data
    // create file from messages
    // push the file
  }
}
