<script setup lang="ts">
import CustomerModal from '@/components/customers/CustomerModal.vue'
import { customersRepository } from '@/repositories/customers.repository'
import { Icon } from '@iconify/vue'
import { NButton, NDivider } from 'naive-ui'
import { onMounted, ref } from 'vue'

const showCustomerModal = ref<boolean>(false)

onMounted(async () => {
  try {
    const customers = await customersRepository.getAll()
    console.log(customers)
  } catch (err) {
    console.error(err)
  }
})
</script>
<template>
  <section class="w-full flex flex-col">
    <header class="w-full flex justify-between items-center h-16 px-8">
      <span class="font-bold text-xl">Clienti</span>
      <NButton @click="showCustomerModal = true" round type="primary">
        <template #icon>
          <Icon icon="lucide:plus" class="text-xl" />
        </template>
        Aggiungi cliente
      </NButton>
    </header>
    <NDivider class="my-0!" />
    <div class="w-full flex-1 flex items-center justify-center"></div>
    <CustomerModal v-model:open="showCustomerModal" />
  </section>
</template>
