import type { Flow } from '../flows/flows.types.js';

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
  source: keyof FetcherConfigMap;
}

export interface IFetcher<T> {
  config: T;
  fetchFiles(flow: Flow): Promise<TextFile[]>;
}
