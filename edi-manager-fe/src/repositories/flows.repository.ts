import { api } from '@/services/api.service'
import type { CreateFlowDto, Flow } from '@backend/modules/flows/flows.types'

class FlowsRepository {
  async getAll(): Promise<Flow[]> {
    const response = await api.get<Flow[]>('/flows')
    return response.data
  }

  async create(body: CreateFlowDto): Promise<string> {
    const response = await api.post<string>('/flows', body)
    return response.data
  }
}
export const flowsRepository = new FlowsRepository()
