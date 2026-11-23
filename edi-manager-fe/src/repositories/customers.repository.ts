import { api } from '@/services/api.service'
import {
  type CreateCustomerDto,
  type Customer,
  type UpdateCustomerDto,
} from '@backend/modules/customers/customers.types'

class CustomersRepository {
  async getAll(): Promise<Customer[]> {
    const response = await api.get<Customer[]>('/customers')
    return response.data
  }

  async create(body: CreateCustomerDto): Promise<string> {
    const respose = await api.post<string>('/customers', body)
    return respose.data
  }

  async update(id: string, body: UpdateCustomerDto): Promise<string> {
    const respose = await api.patch<string>(`/customers/${id}`, body)
    return respose.data
  }
}

export const customersRepository = new CustomersRepository()
