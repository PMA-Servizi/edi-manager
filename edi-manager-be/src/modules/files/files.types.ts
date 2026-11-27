import { FetchSource } from '../fetchers/fetchers.types.js';
import { Message } from '../messages/messages.types.js';

export type FileStatus = 'success' | 'fail' | 'processing';

export interface File {
  id: string;
  createdAt: Date;
  filename: string;
  status: FileStatus;
  source: FetchSource;
  errorMessage: string | null;
  messages: Message[];
  runId: string;
}

export interface CreateFileBody {
  filename: string;
  status?: FileStatus;
  source: FetchSource;
  errorMessage?: string;
  runId: string;
}
