<script setup lang="ts">
import { EdiRecordTypes } from '@/constants/flows.constants'
import type { Flow } from '@backend/modules/flows/flows.types'
import { useThemeVars, NButton, NDivider, useMessage } from 'naive-ui'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import CompanyTag from '../companies/CompanyTag.vue'
import OperationTag from './OperationTag.vue'
import { flowsRepository } from '@/repositories/flows.repository.ts'
import UnionTag from '../shared/UnionTag.vue'
import CustomersTag from '../customers/CustomersTag.vue'

const props = defineProps<{ flow: Flow }>()
const emit = defineEmits<{
  (event: 'edit', flow: Flow): void
  (event: 'toggled', flow: Flow): void
}>()

const hovered = ref<boolean>(false)
const loading = ref<boolean>(false)

const themeVars = useThemeVars()
const message = useMessage()

const recordTypeLabel = computed<string>(() => {
  return (
    EdiRecordTypes.find((type) => type.value === props.flow.ediRecordType)?.label ??
    props.flow.ediRecordType
  )
})

const toggleFlow = async () => {
  try {
    loading.value = true
    await flowsRepository.toggle(props.flow.id)
    message.success(props.flow.enabled ? 'Flusso interrotto' : 'Flusso attivato')
    emit('toggled', props.flow)
  } catch {
    message.error(
      props.flow.enabled
        ? 'Errore nella disattivazione del flusso'
        : "Errore nell'attivazione del flusso",
    )
  } finally {
    loading.value = false
  }
}
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
          <CustomersTag :customers="props.flow.customers" />
          <UnionTag :union="props.flow.union" />
        </div>
      </div>
      <NDivider vertical class="mx-0! h-12!" />
      <OperationTag :flow="props.flow" />
      <span class="truncate">Ogni {{ props.flow.interval }} secondi</span>
    </div>
    <div class="flex gap-3 items-center">
      <NButton
        v-if="hovered"
        @click="emit('edit', props.flow)"
        circle
        ghost
        size="small"
        :disabled="loading"
      >
        <template #icon>
          <Icon icon="lucide:edit-2" class="text-sm" />
        </template>
      </NButton>
      <NButton
        @click="toggleFlow"
        :type="props.flow.enabled ? 'error' : 'success'"
        :loading="loading"
        :disabled="loading"
      >
        <template #icon>
          <Icon :icon="props.flow.enabled ? 'lucide:pause' : 'lucide:play'" />
        </template>
        {{ props.flow.enabled ? 'Arresta' : 'Avvia' }}
      </NButton>
    </div>
  </div>
</template>
