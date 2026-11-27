import type { Flow } from '../flows/flows.types.js';
import type { Fetcher } from './factory/Fetcher.js';

export interface FetcherConfigMap {
  LOCAL: LocalFetcherConfig;
}

export type FetchSource = keyof FetcherConfigMap;
export type FetcherConfig = FetcherConfigMap[FetchSource];

export interface LocalFetcherConfig {
  source: FetchSource;
  basePath: string;
}

export interface TextFile {
  content: string;
  filename: string;
}

export interface IFetcher<T> {
  config: T;
  fetchFiles(flow: Flow): Promise<TextFile[]>;
}
