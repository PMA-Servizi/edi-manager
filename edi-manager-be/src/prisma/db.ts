import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from './contract.d.js';
import contractJson from './contract.json' with { type: 'json' };
import { INTERNAL_DB_PORT } from '@/config/network.config.js';

export const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
  contract,
  url: `postgres://${process.env.INTERNAL_DB_USERNAME}:${process.env.INTERNAL_DB_PASSWORD}@db:${INTERNAL_DB_PORT}/${process.env.INTERNAL_DB_DATABASE}`,
});
