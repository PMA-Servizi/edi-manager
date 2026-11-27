import { Injectable } from '@nestjs/common';
import { CreateMessageBody, PartialMessage } from './messages.types.js';
import { db } from '@/prisma/db.js';

@Injectable()
export class MessagesRepository {
  async createMessages(
    messages: CreateMessageBody[],
  ): Promise<PartialMessage[]> {
    return await db.orm.public.Messages.createAll(messages);
  }
}
