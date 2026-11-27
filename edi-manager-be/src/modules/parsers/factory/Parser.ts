import { MessageData, TextMessage } from '../parsers.types.js';
import {
  END_OF_LINE_CHARACTER,
  LINES_IDENTIFIERS,
} from '@/modules/lines/lines.constants.js';

export abstract class Parser {
  getMessages(fileId: string, content: string): TextMessage[] {
    const lines = content.split(END_OF_LINE_CHARACTER);
    console.log(lines);
    const messages: TextMessage[] = [];
    let messageLines = [];
    for (const line of lines) {
      if (line.startsWith(LINES_IDENTIFIERS.BGM)) {
        if (messageLines.length) {
          messages.push({
            lines: messageLines,
            fileId: fileId,
          });
          messageLines = [];
        }
        messageLines.push(line);
      } else if (messageLines.length) messageLines.push(line);
      // TODO: errore se inizia con qualcosa di diverso?
    }

    return messages;
  }

  abstract parseMessage(message: TextMessage): Promise<MessageData>;
}
