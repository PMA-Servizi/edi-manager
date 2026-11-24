<script setup lang="ts">
import { FlowOperations } from '@/constants/flows.constants'
import type { Flow } from '@backend/modules/flows/flows.types'
import { Icon } from '@iconify/vue'
import { NTag } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps<{ flow: Flow }>()

const operationLabel = computed<string>(() => {
  return (
    FlowOperations.find((operation) => operation.value === props.flow.operation)?.label ??
    props.flow.operation
  )
})
</script>
<template>
  <NTag round class="w-max pl-5!" :bordered="false" type="info">
    <template #icon>
      <Icon
        :icon="props.flow.operation === 'download' ? 'lucide:download' : 'lucide:upload'"
        class="text-[18px]!"
      />
    </template>
    <span class="truncate">
      {{ operationLabel }}
    </span>
  </NTag>
</template>
