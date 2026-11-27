import { Injectable } from '@nestjs/common';
import type { Flow } from '../flows/flows.types.js';
import { FETCHERS_CONFIG } from '@/config/fetchers.config.js';
import type { Fetcher } from './factory/Fetcher.js';

@Injectable()
export class FetchersService {
  getFetcher(flow: Flow): Fetcher {
    const { fetcherClass, config } = FETCHERS_CONFIG[flow.union];
    return new fetcherClass(config);
  }
}
