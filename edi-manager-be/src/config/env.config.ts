import z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  APP_PORT: z.string(),
  BASIC_AUTH_USER: z.string(),
  BASIC_AUTH_PASSWORD: z.string(),
  PIDOC_DB_HOST: z.string(),
  PIDOC_DB_PORT: z.string(),
  PIDOC_DB_DATABASE: z.string(),
  PIDOC_DB_USERNAME: z.string(),
  PIDOC_DB_PASSWORD: z.string(),
  INTERNAL_DB_PORT: z.string(),
  INTERNAL_DB_DATABASE: z.string(),
  INTERNAL_DB_USERNAME: z.string(),
  INTERNAL_DB_PASSWORD: z.string(),
  REDIS_PORT: z.string(),
  REDIS_PASSWORD: z.string(),
  START_JOBS_ON_STARTUP: z.enum(['true', 'false']),
});
