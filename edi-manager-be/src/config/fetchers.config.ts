import type { Fetcher } from '@/modules/fetchers/factory/Fetcher.js';
import { LocalFetcher } from '@/modules/fetchers/factory/LocalFetcher.js';
import type {
  FetcherConfig,
  LocalFetcherConfig,
} from '@/modules/fetchers/fetchers.types.js';
import type { Union } from '@/modules/flows/flows.types.js';

export const EDIEL_CONFIG: LocalFetcherConfig = {
  source: 'LOCAL',
  basePath: '/files/ediel',
};
export const METEL_CONFIG: LocalFetcherConfig = {
  source: 'LOCAL',
  basePath: '/files/metel',
};

export const FETCHERS_CONFIG: Record<
  Union,
  {
    fetcherClass: new (config: FetcherConfig) => Fetcher;
    config: FetcherConfig;
  }
> = {
  ediel: { fetcherClass: LocalFetcher, config: EDIEL_CONFIG },
  metel: { fetcherClass: LocalFetcher, config: METEL_CONFIG },
};
