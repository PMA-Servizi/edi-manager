import { api } from '@/services/api.service'
import { type Customer } from '@backend/modules/customers/customers.types'

class CustomersRepository {
  async getAll(): Promise<Customer[]> {
    const response = await api.get<Customer[]>('/customers')
    return response.data
  }
}

export const customersRepository = new CustomersRepository()
