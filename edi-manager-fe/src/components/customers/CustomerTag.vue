<script setup lang="ts">
import type { Customer } from '@backend/modules/customers/customers.types'
import { Icon } from '@iconify/vue'
import { NTag } from 'naive-ui'

const props = defineProps<{ customer: Customer }>()
</script>
<template>
  <NTag round :bordered="false" class="w-max">
    <template #icon>
      <Icon icon="lucide:circle-euro" />
    </template>
    <span class="truncate">
      {{ props.customer.name }}
    </span>
  </NTag>
</template>
