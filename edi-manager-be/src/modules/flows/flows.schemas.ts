import z from 'zod';

export const CreateFlowSchema = z.object({
  interval: z
    .number()
    .min(60, "L'intervallo deve essere almeno 60")
    .max(10_000_000, "L'intervallo deve essere meno di 10 milioni"),
  ediRecordType: z
    .enum(
      [
        'ANPROD',
        'DESADV',
        'ORDERS',
        'ORDRSP',
        'PACLIS',
        'SELLIN',
        'INVSUP',
        'ORDLIS',
        'REMADV',
        'INVRPT',
        'SLSRPT',
        'PRICAT',
        'NOTACC',
        'NOTADD',
        'ORDPRP',
      ],
      { message: 'Valore non consentito' },
    )
    .nullable()
    .transform((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: 'custom',
          message: 'Il tipo di record è obbligatorio',
        });
        return z.NEVER;
      }
      return val;
    }),
  operation: z
    .enum(['upload', 'download'], { message: 'Valore non consentito' })
    .nullable()
    .transform((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: 'custom',
          message: "L'operazione è obbligatoria",
        });
        return z.NEVER;
      }
      return val;
    }),
  customerId: z
    .string()
    .nullable()
    .transform((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: 'custom',
          message: 'Il cliente è obbligatorio',
        });
        return z.NEVER;
      }
      return val;
    }),
  companyId: z
    .string()
    .nullable()
    .transform((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: 'custom',
          message: "L'azienda è obbligatoria",
        });
        return z.NEVER;
      }
      return val;
    }),
});
