import type { Flow } from '@/modules/flows/flows.types.js';
import type {
  IFetcher,
  LocalFetcherConfig,
  TextFile,
} from '../fetchers.types.js';
import { Fetcher } from './Fetcher.js';
import { FlowExecutionError } from '@/shared/errors.js';
import { readFile, readdir } from 'fs/promises';

export class LocalFetcher
  extends Fetcher
  implements IFetcher<LocalFetcherConfig>
{
  readonly baseLocalPath: string = '/app';

  constructor(readonly config: LocalFetcherConfig) {
    super();
  }

  async fetchFiles(flow: Flow): Promise<TextFile[]> {
    const files: TextFile[] = [];

    // TODO: capire se cartelle con nome azienda forse è meglio ricavarle in altro modo. Path da inserire? Campo a parte?
    const directoryPath = `${this.baseLocalPath}/${this.config.basePath}/${flow.company.name}/${flow.ediRecordType}`;

    let filenames: string[] = [];
    try {
      filenames = await readdir(directoryPath);
    } catch {
      throw new FlowExecutionError(
        `Errore nella lettura della directory ${directoryPath}`,
      );
    }
    console.log('Found filenames: ', filenames.join(', '));

    for (const filename of filenames) {
      try {
        console.log('Reading ', filename);
        const data = await readFile(`${directoryPath}/${filename}`, 'utf8');
        const newFile: TextFile = {
          filename,
          content: data,
          source: 'LOCAL',
        };
        console.log('File content: ', data);
        files.push(newFile);
      } catch {
        throw new FlowExecutionError(
          `Errore nella lettura del file ${filename} dentro a ${directoryPath}`,
        );
      }
    }

    return files;
  }
}
