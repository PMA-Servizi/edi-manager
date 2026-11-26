import { Module } from '@nestjs/common';
import { RunnersService } from './runnsers.service.js';
import { FetchersModule } from '../fetchers/fetchers.module.js';

@Module({
  imports: [FetchersModule],
  providers: [RunnersService],
  exports: [RunnersService],
})
export class RunnersModule {}
