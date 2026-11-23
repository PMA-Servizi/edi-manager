<script setup lang="ts">
import { NModal } from 'naive-ui'

interface BaseModalProps {
  title?: string
  maxWidth?: number
  maxContentHeight?: number
  closable?: boolean
}
const {
  title,
  maxWidth = 460,
  maxContentHeight = 800,
  closable = false,
} = defineProps<BaseModalProps>()
const emit = defineEmits<{ (event: 'close'): void; (event: 'open'): void }>()

const open = defineModel<boolean>('open')
</script>

<template>
  <NModal
    v-model:show="open"
    preset="card"
    class="rounded-xl! flex flex-col gap-2"
    :style="{ maxWidth: `${maxWidth}px` }"
    :title="title"
    @afterLeave="emit('close')"
    @afterEnter="emit('open')"
    :maskClosable="closable"
    :closeOnEsc="closable"
    :closable="closable"
  >
    <div
      class="overflow-y-auto ovverflow-hidden h-full pb-6"
      :style="{ maxHeight: `${maxContentHeight}px` }"
    >
      <slot />
    </div>
    <template #footer><slot name="footer" /></template>
  </NModal>
</template>
