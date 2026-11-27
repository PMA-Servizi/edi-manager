export interface TextMessage {
  lines: string[];
  fileId: string;
}

export interface OrdersMessageData {}

// TODO: complete interfaces

export interface MessageDataMap {
  ANPROD: OrdersMessageData;
  DESADV: OrdersMessageData;
  ORDERS: OrdersMessageData;
  ORDRSP: OrdersMessageData;
  PACLIS: OrdersMessageData;
  SELLIN: OrdersMessageData;
  INVSUP: OrdersMessageData;
  ORDLIS: OrdersMessageData;
  REMADV: OrdersMessageData;
  INVRPT: OrdersMessageData;
  SLSRPT: OrdersMessageData;
  PRICAT: OrdersMessageData;
  NOTACC: OrdersMessageData;
  NOTADD: OrdersMessageData;
  ORDPRP: OrdersMessageData;
}

export type EdiRecordType = keyof MessageDataMap;
export type MessageData = MessageDataMap[EdiRecordType];

export interface IParser {
  getMessages(fileId: string, content: string): TextMessage[];
  parseMessage(message: TextMessage): Promise<MessageData>;
}
