import z from 'zod';

export const CreateCustomerSchema = z.object({
  name: z
    .string()
    .min(3, 'Il nome deve avere almeno 3 caratteri')
    .max(50, 'Il nome non può avere più di 50 caratteri'),
  sapCustomerCode: z
    .string()
    .min(1, 'Il codice non può essere vuoto')
    .max(20, 'Il codice non può avere più di 20 caratteri'),
});
