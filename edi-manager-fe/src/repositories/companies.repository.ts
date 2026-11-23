import { api } from '@/services/api.service'
import type {
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
} from '@backend/modules/companies/companies.types'

class CompaniesRepository {
  async getAll(): Promise<Company[]> {
    const response = await api.get<Company[]>('/companies')
    return response.data
  }

  async create(body: CreateCompanyDto): Promise<string> {
    const response = await api.post<string>('/companies', body)
    return response.data
  }

  async update(id: string, body: UpdateCompanyDto): Promise<string> {
    const response = await api.patch<string>(`/companies/${id}`, body)
    return response.data
  }
}
export const companiesRepository = new CompaniesRepository()
