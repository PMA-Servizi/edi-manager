import z from 'zod';
import type { CustomErrorSchema } from './schemas.js';
import type { EXCPETIONS } from './constants.js';

export type CustomError = z.infer<typeof CustomErrorSchema>;
export type Exception = (typeof EXCPETIONS)[number];
