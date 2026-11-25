<script setup lang="ts">
import type { Run } from '@backend/modules/runs/runs.types'
import { useThemeVars } from 'naive-ui'
import RunOutcomeTag from './RunOutcomeTag.vue'

const props = defineProps<{ run: Run }>()

const themeVars = useThemeVars()
</script>
<template>
  <div
    class="w-full p-4 flex justify-between items-center"
    :style="{ backgroundColor: themeVars.actionColor, borderRadius: themeVars.borderRadius }"
  >
    {{ props.run.flow.ediRecordType }}
    <RunOutcomeTag :run="props.run" />
  </div>
</template>
