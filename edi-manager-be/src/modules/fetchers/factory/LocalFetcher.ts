import type { Flow } from '@/modules/flows/flows.types.js';
import type { IFetcher, LocalFetcherConfig } from '../fetchers.types.js';
import { Fetcher } from './Fetcher.js';

export class LocalFetcher
  extends Fetcher<LocalFetcherConfig>
  implements IFetcher<LocalFetcherConfig>
{
  config: LocalFetcherConfig;

  constructor(flow: Flow) {
    super();
    this.config = {
      source: 'LOCAL',
      path: `/app/files/${flow.company.name}/${flow.ediRecordType}`,
    };
  }

  async fetchFiles(flow: Flow) {
    // TODO
    return [];
  }
}
