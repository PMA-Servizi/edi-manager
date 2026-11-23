<script setup lang="ts">
import { NModal } from 'naive-ui'

type ModalSize = 'md' | 'lg'
interface BaseModalProps {
  title?: string
  maxWidth?: number
  maxContentHeight?: number
  closable?: boolean
  size?: ModalSize
}
const {
  title,
  maxContentHeight = 800,
  closable = false,
  size = 'md',
} = defineProps<BaseModalProps>()
const emit = defineEmits<{ (event: 'close'): void; (event: 'open'): void }>()

const open = defineModel<boolean>('open')

const sizeWidthMap: Record<ModalSize, number> = {
  md: 460,
  lg: 600,
}
</script>

<template>
  <NModal
    v-model:show="open"
    preset="card"
    class="rounded-xl! flex flex-col gap-2"
    :style="{ width: `${sizeWidthMap[size]}px` }"
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
