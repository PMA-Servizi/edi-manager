import { Module } from '@nestjs/common';
import { RunnersService } from './runners.service.js';
import { FetchersModule } from '../fetchers/fetchers.module.js';
import { FilesModule } from '../files/files.module.js';
import { ParsersModule } from '../parsers/parsers.module.js';
import { MessagesModule } from '../messages/messages.module.js';

@Module({
  imports: [FetchersModule, FilesModule, ParsersModule, MessagesModule],
  providers: [RunnersService],
  exports: [RunnersService],
})
export class RunnersModule {}
