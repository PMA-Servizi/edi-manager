import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { INTERNAL_BACKEND_PORT } from './config/network.config.js';
import { StandardSchemaValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new StandardSchemaValidationPipe());
  await app.listen(INTERNAL_BACKEND_PORT);
}
await bootstrap();
