import type { Flow } from '../flows/flows.types.js';
import type { Fetcher } from './factory/Fetcher.js';

export interface FetcherConfigMap {
  LOCAL: LocalFetcherConfig;
}

export type FetchSource = keyof FetcherConfigMap;
export type FetcherConfig = FetcherConfigMap[FetchSource];
export type AnyFetcher = {
  [K in FetchSource]: Fetcher<FetcherConfigMap[K]>;
}[FetchSource];

export interface LocalFetcherConfig {
  source: FetchSource;
  path: string;
}

export interface TextFile<T> {
  fetcherConfig: T;
  content: string;
  filename: string;
}

export interface IFetcher<T> {
  config: T;
  fetchFiles(flow: Flow): Promise<TextFile<T>[]>;
}
