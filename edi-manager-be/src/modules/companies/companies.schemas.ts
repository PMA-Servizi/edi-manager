import z from 'zod';
import { ediCompanyCodeType } from './companies.constants.js';

export const CreateCompanySchema = z.object({
  name: z
    .string()
    .nonempty('Il nome è obbligatorio')
    .max(50, 'Il nome non può avere più di 50 caratteri'),
  division: z
    .string()
    .nonempty('La divisione è obbligatoria')
    .max(20, 'La divisione non può avere più di 20 caratteri'),
  ediCompanyCode: z
    .string()
    .nonempty('Il codice EDI è obbligatorio')
    .max(20, 'Il codice EDI non può avere più di 35 caratteri'),
  ediCompanyCodeType: z.enum(
    Object.values(ediCompanyCodeType),
    `Il tipo di codice EDI può assumere solo i seguenti valori: ${Object.values(ediCompanyCodeType).join(', ')}`,
  ),
  businessName: z
    .string()
    .nonempty('La ragione sociale è obbligatoria')
    .max(90, 'La ragione sociale non può avere più di 70 caratteri'),
  address: z
    .string()
    .nonempty()
    .max(90, "L'indirizzo non può avere più di 70 caratteri"),
  city: z
    .string()
    .nonempty()
    .max(90, 'La città non può avere più di 35 caratteri'),
  province: z.string().length(2, 'La provincia deve essere di 2 caratteri'),
  postalCode: z
    .string()
    .regex(/^\d+$/, 'Il codice postale può contenere solo numeri')
    .length(5, 'Il codice postale deve avere 5 caratteri'),
  country: z
    .string()
    .nonempty('La nazione è obbligatoria')
    .max(3, 'La nazione non può avere più di 3 caratteri'),
  courtOfLaw: z
    .string()
    .max(35, 'Il tribunale non può avere più di 35 caratteri')
    .optional()
    .nullable(),
  cciaa: z
    .string()
    .nonempty('Il codice CCIAA è obbligatorio')
    .max(35, 'Il codice CCIAA non può avere più di 35 caratteri'),
  shareCapital: z
    .string()
    .nonempty('Il capitale sociale è obbligatorio')
    .max(35, 'Il capitale sociale non può avere più di 35 caratteri'),
  raeeRegistrationNumber: z
    .string()
    .nonempty('Il numero di registrazione RAEE è obbligatorio')
    .max(
      16,
      'Il numero di registrazione RAEE non può avere più di 16 caratteri',
    ),
  pileRegistrationNumber: z
    .string()
    .nonempty(
      'Il numero di iscrizione Resgistro Pile e Accumulatori è obbligatorio',
    )
    .max(
      16,
      'Il numero di iscrizione Resgistro Pile e Accumulatori non può avere più di 16 caratteri',
    ),
});
