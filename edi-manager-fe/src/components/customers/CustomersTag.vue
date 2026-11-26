<script setup lang="ts">
import type { Customer } from '@backend/modules/customers/customers.types'
import { Icon } from '@iconify/vue'
import { NTag, NTooltip } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps<{ customers: Customer[] }>()

const onlyOneCustomer = computed<boolean>(() => {
  return props.customers.length === 1
})
</script>
<template>
  <NTooltip :disabled="onlyOneCustomer" trigger="hover">
    <template #trigger>
      <NTag round :bordered="false" class="w-max">
        <template #icon>
          <Icon icon="lucide:circle-euro" />
        </template>
        <span class="truncate" v-if="onlyOneCustomer && props.customers[0]">
          {{ props.customers[0].name }}
        </span>
        <span v-else> {{ props.customers.length }} clienti </span>
      </NTag>
    </template>
    <div class="flex flex-col gap-1.5">
      <span v-for="customer in customers" :key="customer.id">{{ customer.name }}</span>
    </div>
  </NTooltip>
</template>
