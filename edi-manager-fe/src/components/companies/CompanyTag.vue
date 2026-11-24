<script setup lang="ts">
import type { Company } from '@backend/modules/companies/companies.types'
import { Icon } from '@iconify/vue'
import { NTag } from 'naive-ui'

const props = defineProps<{ company: Company }>()
</script>
<template>
  <NTag round :bordered="false" class="w-max pl-4!">
    <template #icon>
      <Icon icon="lucide:building" class="text-[18px]!" />
    </template>
    <span class="truncate">
      {{ props.company.name }}
    </span>
  </NTag>
</template>
