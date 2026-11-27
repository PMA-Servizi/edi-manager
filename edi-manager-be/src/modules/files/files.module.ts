import { Module } from '@nestjs/common';
import { FilesService } from './files.service.js';
import { FilesRepository } from './files.repository.js';

@Module({
  providers: [FilesService, FilesRepository],
  exports: [FilesService],
})
export class FilesModule {}
