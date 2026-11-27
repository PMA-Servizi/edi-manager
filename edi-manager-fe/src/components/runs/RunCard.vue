<script setup lang="ts">
import type { RunDto } from '@backend/modules/runs/runs.types'
import { useThemeVars } from 'naive-ui'
import RunStatusTag from './RunStatusTag.vue'
import LabeledData from '../shared/LabeledData.vue'
import { getOperationLabel, getUnionLabel } from '@/utils/flows.utils.ts'
import { formateDateTime } from '@/utils/dates.utils.ts'

const props = defineProps<{ run: RunDto }>()

const themeVars = useThemeVars()
</script>
<template>
  <div
    class="run-card w-full p-4 flex flex-col cursor-pointer"
    :style="{
      borderRadius: themeVars.borderRadius,
      outlineColor: themeVars.primaryColorHover,
    }"
  >
    <div class="flex gap-3 justify-between">
      <span class="font-bold text-lg mb-3">
        {{ props.run.flow.ediRecordType }}
      </span>
      <RunStatusTag :run="props.run" />
    </div>
    <div class="grid grid-cols-2 gap-1.5">
      <LabeledData label="Operazione" :value="getOperationLabel(props.run.flow)" />
      <LabeledData label="Azienda" :value="props.run.flow.company.name" />
      <LabeledData label="Consorzio" :value="getUnionLabel(props.run.flow)" />
    </div>
    <span class="mt-3 font-semibold" :style="{ color: themeVars.textColor3 }">{{
      formateDateTime(props.run.createdAt)
    }}</span>
  </div>
</template>

<style scoped>
.run-card {
  background-color: v-bind('themeVars.actionColor');
  &:hover {
    background-color: v-bind('themeVars.hoverColor');
  }
}
</style>
