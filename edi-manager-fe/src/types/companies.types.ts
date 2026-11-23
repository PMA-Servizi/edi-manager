import type { CreateCompanySchema } from '@backend/modules/companies/companies.schemas'
import z from 'zod/v3'

export type CompanyForm = z.input<typeof CreateCompanySchema>
