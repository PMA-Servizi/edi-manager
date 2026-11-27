import { Injectable } from '@nestjs/common';
import { CreateFileBody } from './files.types.js';
import { FilesRepository } from './files.repository.js';

@Injectable()
export class FilesService {
  constructor(private readonly filesRepository: FilesRepository) {}

  async createFile(body: CreateFileBody): Promise<string> {
    return await this.filesRepository.createFile(body);
  }
}
