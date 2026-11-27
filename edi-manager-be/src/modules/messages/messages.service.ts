import { Injectable } from '@nestjs/common';
import { CreateMessageBody, PartialMessage } from './messages.types.js';
import { MessagesRepository } from './messages.repository.js';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async createMessages(
    messages: CreateMessageBody[],
  ): Promise<PartialMessage[]> {
    return await this.messagesRepository.createMessages(messages);
  }
}
