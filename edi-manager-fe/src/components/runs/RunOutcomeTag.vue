<script setup lang="ts">
import type { Run } from '@backend/modules/runs/runs.types'
import { Icon } from '@iconify/vue'
import { NTag } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps<{ run: Run }>()

const tagLabel = computed<string>(() => {
  return props.run.outcome === 'success' ? 'Completata' : 'Fallita'
})
</script>
<template>
  <NTag :type="props.run.outcome === 'success' ? 'success' : 'error'">
    <template #icon>
      <Icon :icon="props.run.outcome === 'success' ? 'lucide:check' : 'lucide:x'" />
    </template>
    {{ tagLabel }}
  </NTag>
</template>
