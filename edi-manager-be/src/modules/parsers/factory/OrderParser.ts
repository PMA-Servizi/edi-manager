import { IParser, OrdersMessageData, TextMessage } from '../parsers.types.js';
import { Parser } from './Parser.js';

export class OrderParser extends Parser implements IParser {
  async parseMessage(message: TextMessage): Promise<OrdersMessageData> {
    return {};
  }
}
