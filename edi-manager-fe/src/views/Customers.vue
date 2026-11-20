<script setup lang="ts">
import { customersRepository } from '@/repositories/customers.repository'
import { onMounted } from 'vue'

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
  <div class="w-full h-full flex items-center justify-center">
    <span>CUSTOMERS</span>
  </div>
</template>
