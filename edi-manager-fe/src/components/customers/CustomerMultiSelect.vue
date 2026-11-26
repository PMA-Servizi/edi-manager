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
const selectedCustomers = defineModel<Customer[]>({ default: () => [] })

const customers = ref<Customer[]>([])
const selectedCustomerIds = ref<string[]>([])
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

const setCustomers = (ids: string[]) => {
  console.log(ids)
  selectedCustomers.value = customers.value.filter((customer) => ids.includes(customer.id))
}

watch(
  () => selectedCustomers.value,
  (newCustomers) => {
    selectedCustomerIds.value = newCustomers.map((customer) => customer.id)
  },
  { immediate: true },
)

onMounted(loadCustomers)
</script>
<template>
  <NSelect
    v-model:value="selectedCustomerIds"
    @update-value="setCustomers"
    multiple
    :options="customerOptions"
    :consistentMenuWidth="false"
    :placeholder="placeholder"
    :status="invalid ? 'error' : undefined"
    :loading="loading"
    :disabled="loading"
  />
</template>
