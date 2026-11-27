import { File } from '../files/files.types.js';
import { Line } from '../lines/lines.types.js';

export type MessageStatus = 'success' | 'fail' | 'skipped' | 'processing';

export interface Message {
  id: string;
  createdAt: Date;
  status: MessageStatus;
  file: File;
  lines: Line[];
}

export interface PartialMessage {
  id: string;
  createdAt: Date;
  status: MessageStatus;
}

export interface CreateMessageBody {
  fileId: string;
}
