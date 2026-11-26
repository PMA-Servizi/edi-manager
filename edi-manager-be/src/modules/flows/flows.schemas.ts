import z from 'zod';

export const union = z
  .enum(['metel', 'ediel'], {
    message: 'Sono consentiti solo i consorzi Ediel e Metel',
  })
  .nullable()
  .refine((val) => !!val, 'Il consorzio è obbligatorio');

export const flowInterval = z
  .number({ message: "L'intervallo è obbligatorio" })
  .min(60, "L'intervallo deve essere almeno 60")
  .max(10_000_000, "L'intervallo deve essere meno di 10 milioni");

export const flowEdiType = z
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
  .refine((val) => !!val, 'Il tipo di record è obbligatorio');

export const ediOperation = z
  .enum(['upload', 'download'], {
    message: 'Valore non consentito',
  })
  .nullable()
  .refine((val) => !!val, "L'operazione è obbligatoria");

export const CreateFlowSchema = z.object({
  interval: flowInterval,
  ediRecordType: flowEdiType,
  operation: ediOperation,
  customerId: z.string().nonempty('Il cliente è obbligatorio'),
  companyId: z.string().nonempty("L'azienda è obbligatoria"),
  union,
});

export const UpdateFlowSchema = CreateFlowSchema.partial();
