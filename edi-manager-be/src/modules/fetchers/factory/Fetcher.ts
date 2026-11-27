import { Flow } from '@/modules/flows/flows.types.js';
import type { TextFile } from '../fetchers.types.js';

export abstract class Fetcher {
  abstract fetchFiles(flow: Flow): Promise<TextFile[]>;
}
