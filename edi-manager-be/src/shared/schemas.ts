import z from 'zod';
import { EXCPETIONS, RESOURCES } from './constants.js';

export const CustomErrorSchema = z.object({
  slug: z.enum(EXCPETIONS),
  message: z.string(),
  resource: z.enum(RESOURCES),
  context: z.array(z.string()).optional(),
});
