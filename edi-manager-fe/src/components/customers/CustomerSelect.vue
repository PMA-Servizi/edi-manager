<script setup lang="ts">
import { customersRepository } from '@/repositories/customers.repository'
import type { Customer } from '@backend/modules/customers/customers.types'
import { NSelect, useMessage } from 'naive-ui'
import { computed, onMounted, ref, watch } from 'vue'

interface CustomerSelectProps {
  placeholder?: string
  invalid?: boolean
}
const { placeholder = 'Seleziona cliente', invalid = false } = defineProps<CustomerSelectProps>()
const selectedCustomer = defineModel<Customer | null>()

const customers = ref<Customer[]>([])
const selectedCustomerId = ref<string | null>(null)
const loading = ref<boolean>(false)
const message = useMessage()

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

const customerOptions = computed<{ label: string; value: string }[]>(() => {
  return customers.value.map((customer) => {
    return {
      label: customer.name,
      value: customer.id,
    }
  })
})

watch(
  selectedCustomerId,
  (newId) => {
    if (!newId) {
      selectedCustomer.value = null
      return
    }

    const targetCompany = customers.value.find((customer) => customer.id === newId)
    if (!targetCompany) selectedCustomer.value = null
    else selectedCustomer.value = targetCompany
  },
  { immediate: true },
)

watch(
  selectedCustomer,
  (newCustomer) => {
    if (!newCustomer) {
      selectedCustomerId.value = null
      return
    }
    if (newCustomer.id === selectedCustomerId.value) return
    selectedCustomerId.value = newCustomer.id
  },
  { immediate: true },
)

onMounted(loadCustomers)
</script>
<template>
  <NSelect
    v-model:value="selectedCustomerId"
    :options="customerOptions"
    :consistentMenuWidth="false"
    :placeholder="placeholder"
    :status="invalid ? 'error' : undefined"
    :loading="loading"
    :disabled="loading"
  />
</template>
