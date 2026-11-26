import { FlowOperations, Unions } from '@/constants/flows.constants'
import type { Flow } from '@backend/modules/flows/flows.types'

export const getUnionLabel = (flow: Flow): string => {
  return Unions.find((union) => union.value === flow.union)?.label ?? flow.union
}

export const getOperationLabel = (flow: Flow): string => {
  return (
    FlowOperations.find((operation) => operation.value === flow.operation)?.label ?? flow.operation
  )
}
