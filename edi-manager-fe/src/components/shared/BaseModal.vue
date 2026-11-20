<script setup lang="ts">
import { NModal } from 'naive-ui'

interface BaseModalProps {
  title?: string
  maxWidth?: number
  maxContentHeight?: number
}

const { title, maxWidth = 460, maxContentHeight = 1600 } = defineProps<BaseModalProps>()

const open = defineModel<boolean>('open')
</script>

<template>
  <NModal
    v-model:show="open"
    preset="card"
    class="rounded-xl! flex flex-col gap-2"
    :style="{ maxWidth: `${maxWidth}px` }"
    :title="title"
  >
    <div
      class="overflow-y-auto ovverflow-hidden h-full"
      :style="{ maxHeight: `${maxContentHeight}px` }"
    >
      <slot />
    </div>
    <template #footer><slot name="footer" /></template>
  </NModal>
</template>
