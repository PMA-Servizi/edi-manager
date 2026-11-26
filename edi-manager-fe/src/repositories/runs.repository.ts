import { api } from '@/services/api.service'
import type { RunDto } from '@backend/modules/runs/runs.types'

class RunsRepository {
  async getAll(): Promise<RunDto[]> {
    const response = await api.get<RunDto[]>('/runs')
    return response.data
  }
}

export const runsRepository = new RunsRepository()
