import { Injectable } from '@nestjs/common';
import type { Flow } from '../flows/flows.types.js';
import { FetchersService } from '../fetchers/fetchers.service.js';
import { FilesService } from '../files/files.service.js';
import { ParsersService } from '../parsers/parsers.service.js';
import { MessagesService } from '../messages/messages.service.js';

// TODO: capire clean up jobs per pulizia entità dopo un tot

@Injectable()
export class RunnersService {
  constructor(
    private readonly fetchersService: FetchersService,
    private readonly parsersService: ParsersService,
    private readonly filesService: FilesService,
    private readonly messagesService: MessagesService,
  ) {}

  async checkFlowImplementation(flow: Flow) {
    if (flow.operation === 'download') {
      if (!this.fetchersService.getFetcher(flow)) return false;
      // TODO: complete check with other factories
    } else {
      // TODO: complete check with other factories
    }

    return true;
  }

  async runFlow(flow: Flow, runId: string) {
    if (flow.operation === 'download') await this.runDownloadFlow(flow, runId);
    else await this.runUploadFlow(flow);
  }

  async runDownloadFlow(flow: Flow, runId: string) {
    console.log('Running flow: ', flow.id, ' - RUNNER');
    // TODO: da capire come filtrare solo certi file. Per data? Eliminare quelli elaborati?
    const files = await this.fetchersService.getFetcher(flow).fetchFiles(flow);
    console.log('Files data: ', files);
    for (const file of files) {
      const fileId = await this.filesService.createFile({
        filename: file.filename,
        source: file.source,
        runId,
      });
      const parser = this.parsersService.getParser(flow);
      const messages = parser.getMessages(fileId, file.content);
      await this.messagesService.createMessages(
        messages.map((message) => ({ fileId: message.fileId })),
      );
      for (const message of messages) {
        console.log(message);
        const messageData = await parser.parseMessage(message);
        console.log(messageData);
        // TODO: carica dati parsati su DB
      }
    }
  }

  async runUploadFlow(flow: Flow) {
    // TODO
    // fetch data -> read from PidocDB
    // create messages from data
    // create file from messages
    // push the file
  }
}
