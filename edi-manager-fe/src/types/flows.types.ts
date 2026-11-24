import type { FlowFormSchema } from '@/schemas/flows.schemas'
import z from 'zod'

export type FlowForm = z.input<typeof FlowFormSchema>
export type FlowFormData = z.output<typeof FlowFormSchema>
