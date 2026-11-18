import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';
import { INTERNAL_DB_PORT } from './src/config/network.config.js';

export default definePrismaConfig({
  orm: ormConfig({
    contract: './src/prisma/contract.prisma',
    db: {
      connection: `postgres://${process.env.INTERNAL_DB_USERNAME}:${process.env.INTERNAL_DB_PASSWORD}@db:${INTERNAL_DB_PORT}/${process.env.INTERNAL_DB_DATABASE}`,
    },
  }),
});
