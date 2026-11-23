<script setup lang="ts">
import CustomerCard from '@/components/customers/CustomerCard.vue'
import CustomerModal from '@/components/customers/CustomerModal.vue'
import DetailsLayout from '@/components/shared/DetailsLayout.vue'
import LoadableList from '@/components/shared/LoadableList.vue'
import { customersRepository } from '@/repositories/customers.repository'
import type { Customer } from '@backend/modules/customers/customers.types'
import { Icon } from '@iconify/vue'
import { NButton, NDivider, useMessage } from 'naive-ui'
import { onMounted, ref } from 'vue'

const showCustomerModal = ref<boolean>(false)
const loading = ref<boolean>(false)
const message = useMessage()
const customers = ref<Customer[]>([])
const customerToEdit = ref<Customer>()

const loadCustomers = async () => {
  try {
    loading.value = true
    customers.value = await customersRepository.getAll()
  } catch {
    message.error('Errore nel caricamento dei clienti')
  } finally {
    loading.value = false
  }
}

const editCustomer = (customer: Customer) => {
  customerToEdit.value = customer
  showCustomerModal.value = true
}

onMounted(loadCustomers)
</script>
<template>
  <DetailsLayout title="Clienti">
    <template #header>
      <NButton @click="showCustomerModal = true" round type="primary">
        <template #icon>
          <Icon icon="lucide:plus" class="text-xl" />
        </template>
        Crea cliente
      </NButton>
    </template>
    <LoadableList emptyLabel="Nessun cliente trovato" :loading="loading" :items="customers">
      <div
        class="max-w-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full p-3 self-start"
      >
        <CustomerCard
          v-for="customer in customers"
          :key="customer.id"
          :customer="customer"
          @edit="editCustomer"
        />
      </div>
    </LoadableList>
    <CustomerModal
      v-model:open="showCustomerModal"
      @success="loadCustomers"
      @close="customerToEdit = undefined"
      :customer="customerToEdit"
    />
  </DetailsLayout>
</template>
