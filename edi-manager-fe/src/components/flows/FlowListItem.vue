<script setup lang="ts">
import { EdiRecordTypes } from '@/constants/flows.constants'
import type { Flow } from '@backend/modules/flows/flows.types'
import { useThemeVars, NButton, NDivider } from 'naive-ui'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import CompanyTag from '../companies/CompanyTag.vue'
import CustomerTag from '../customers/CustomerTag.vue'
import OperationTag from './OperationTag.vue'

const props = defineProps<{ flow: Flow }>()
const emit = defineEmits<{
  (event: 'edit', flow: Flow): void
}>()

const hovered = ref<boolean>(false)

const themeVars = useThemeVars()

const recordTypeLabel = computed<string>(() => {
  return (
    EdiRecordTypes.find((type) => type.value === props.flow.ediRecordType)?.label ??
    props.flow.ediRecordType
  )
})
</script>
<template>
  <div
    :style="{
      backgroundColor: themeVars.cardColor,
      borderRadius: themeVars.borderRadius,
    }"
    @mouseenter="hovered = true"
    @mousemove="hovered = true"
    @mouseleave="hovered = false"
    class="flex items-center justify-between gap-3 px-3 py-1.5"
  >
    <div class="flex gap-3 items-center">
      <div class="flex flex-col gap-0.5">
        <span class="text-lg font-semibold truncate">{{ recordTypeLabel }}</span>
        <div class="flex gap-3 items-center">
          <CompanyTag :company="props.flow.company" />
          <CustomerTag :customer="props.flow.customer" />
        </div>
      </div>
      <NDivider vertical class="mx-0! h-12!" />
      <OperationTag :flow="props.flow" />
      <span class="truncate">Ogni {{ props.flow.interval }} secondi</span>
    </div>
    <div class="flex gap-3 items-center">
      <NButton v-if="hovered" @click="emit('edit', props.flow)" circle ghost size="small">
        <template #icon>
          <Icon icon="lucide:edit-2" class="text-sm" />
        </template>
      </NButton>
      <NButton :type="props.flow.enabled ? 'error' : 'success'">
        <template #icon>
          <Icon :icon="props.flow.enabled ? 'lucide:pause' : 'lucide:play'" />
        </template>
        {{ props.flow.enabled ? 'Arresta' : 'Avvia' }}
      </NButton>
    </div>
  </div>
</template>
