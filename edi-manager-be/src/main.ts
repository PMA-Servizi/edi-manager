import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { INTERNAL_PORT } from './config/network.config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(INTERNAL_PORT);
}
await bootstrap();
