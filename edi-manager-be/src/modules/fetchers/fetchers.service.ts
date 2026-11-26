import { Injectable } from '@nestjs/common';
import type { Flow } from '../flows/flows.types.js';
import { FETCHERS_CONFIG } from '@/config/fetchers.config.js';
import type { AnyFetcher } from './fetchers.types.js';

@Injectable()
export class FetchersService {
  getFetcher(flow: Flow): AnyFetcher {
    return FETCHERS_CONFIG[flow.union](flow);
  }
}
