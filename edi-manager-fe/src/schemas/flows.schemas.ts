import type { Company } from '@backend/modules/companies/companies.types'
import type { Customer } from '@backend/modules/customers/customers.types'
import { ediOperation, flowEdiType, flowInterval } from '@backend/modules/flows/flows.schemas'
import { z } from 'zod'

export const FlowFormSchema = z
  .object({
    interval: flowInterval,
    operation: ediOperation.nullable().refine((val) => !!val, "L'operazione è obbligatoria"),
    ediRecordType: flowEdiType.nullable().refine((val) => !!val, "L'operazione è obbligatoria"),
    company: z
      .custom<Company>()
      .nullable()
      .refine((val) => !!val, "L'azienda è obbligatoria"),
    customer: z.custom<Customer>().refine((val) => !!val, 'Il cliente è obbligatorio'),
  })
  .transform((form) => {
    return {
      interval: form.interval,
      operation: form.operation,
      ediRecordType: form.ediRecordType,
      companyId: form.company.id,
      customerId: form.customer.id,
    }
  })
