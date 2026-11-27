import type { Flow } from '@/modules/flows/flows.types.js';
import type {
  IFetcher,
  LocalFetcherConfig,
  TextFile,
} from '../fetchers.types.js';
import { Fetcher } from './Fetcher.js';
import { readdir, readFile } from 'fs';
import { FlowExecutionError } from '@/shared/errors.js';

export class LocalFetcher
  extends Fetcher
  implements IFetcher<LocalFetcherConfig>
{
  readonly baseLocalPath: string = '/app';

  constructor(readonly config: LocalFetcherConfig) {
    super();
  }

  async fetchFiles(flow: Flow) {
    const files: TextFile[] = [];
    // TODO: capire se cartelle con nome azienda forse è meglio ricavarle in altro modo. Path da inserire? Campo a parte?
    const directoryPath = `${this.baseLocalPath}/${this.config.basePath}/${flow.company.name}/${flow.ediRecordType}`;

    readdir(directoryPath, (err, filenames) => {
      console.log('Found filenames: ', filenames.join(', '));
      if (err) throw new FlowExecutionError(err.message);
      for (const filename of filenames) {
        console.log('Reading ', filename);
        readFile(`${directoryPath}/${filename}`, 'utf8', (err, data) => {
          if (err) throw new FlowExecutionError(err.message);
          const newFile: TextFile = {
            filename,
            content: data,
          };
          console.log('File content: ', data);
          files.push(newFile);
        });
      }
    });

    return files;
  }
}
