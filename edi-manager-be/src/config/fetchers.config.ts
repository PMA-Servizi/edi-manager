import { LocalFetcher } from '@/modules/fetchers/factory/LocalFetcher.js';
import type { AnyFetcher } from '@/modules/fetchers/fetchers.types.js';
import type { Flow, Union } from '@/modules/flows/flows.types.js';

export const FETCHERS_CONFIG: Record<Union, (flow: Flow) => AnyFetcher> = {
  ediel: (flow) => new LocalFetcher(flow),
  metel: (flow) => new LocalFetcher(flow),
};
