import { Module } from '@nestjs/common';
import { FetchersService } from './fetchers.service.js';

@Module({
  providers: [FetchersService],
  exports: [FetchersService],
})
export class FetchersModule {}
