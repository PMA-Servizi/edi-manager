import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service.js';
import { MessagesRepository } from './messages.repository.js';

@Module({
  providers: [MessagesService, MessagesRepository],
  exports: [MessagesService],
})
export class MessagesModule {}
