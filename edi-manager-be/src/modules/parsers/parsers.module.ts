import { Module } from '@nestjs/common';
import { ParsersService } from './parsers.service.js';

@Module({
  providers: [ParsersService],
  exports: [ParsersService],
})
export class ParsersModule {}
