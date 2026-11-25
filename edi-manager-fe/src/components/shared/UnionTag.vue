<script setup lang="ts">
import { Unions } from '@/constants/flows.constants'
import type { Union } from '@backend/modules/flows/flows.types'
import { Icon } from '@iconify/vue'
import { NTag } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps<{ union: Union }>()

const unionName = computed<string>(() => {
  return Unions.find((union) => union.value === props.union)?.label ?? props.union
})
</script>
<template>
  <NTag round :bordered="false" class="w-max">
    <template #icon>
      <Icon icon="lucide:users" />
    </template>
    <span class="truncate">
      {{ unionName }}
    </span>
  </NTag>
</template>
