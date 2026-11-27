<script setup lang="ts">
import type { RunDto, RunStatus } from '@backend/modules/runs/runs.types'
import { Icon } from '@iconify/vue'
import { NTag } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps<{ run: RunDto }>()

const runStatusLabelMap = ref<Record<RunStatus, string>>({
  success: 'Completata',
  fail: 'Fallita',
  processing: 'In corso',
})
const runStatusIconMap = ref<Record<RunStatus, string>>({
  success: 'lucide:check',
  fail: 'lucide:x',
  processing: 'lucide:hourglass',
})
const runStatusTypeMap = ref<
  Record<RunStatus, 'success' | 'error' | 'info' | 'default' | 'warning' | 'primary' | undefined>
>({
  success: 'success',
  fail: 'error',
  processing: 'info',
})
</script>
<template>
  <NTag :type="runStatusTypeMap[props.run.status]">
    <template #icon>
      <Icon :icon="runStatusIconMap[props.run.status]" />
    </template>
    {{ runStatusLabelMap[props.run.status] }}
  </NTag>
</template>
