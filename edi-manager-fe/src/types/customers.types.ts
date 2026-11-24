import type { CreateCustomerSchema } from '@backend/modules/customers/customer.schemas'
import z from 'zod'

export type CustomerForm = z.input<typeof CreateCustomerSchema>
