import { api } from '@/services/api.service'
import type { Run } from '@backend/modules/runs/runs.types'

class RunsRepository {
  async getAll(): Promise<Run[]> {
    const response = await api.get<Run[]>('/runs')
    return response.data
  }
}

export const runsRepository = new RunsRepository()
