import type { Flow } from '@/modules/flows/flows.types.js';
import type { TextFile } from '../fetchers.types.js';

export abstract class Fetcher<T> {
  abstract fetchFiles(flow: Flow): Promise<TextFile<T>[]>;
}
