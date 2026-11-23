<script setup lang="ts" generic="T">
import { Icon } from '@iconify/vue'
import { useThemeVars } from 'naive-ui'

const {
  emptyLabel = 'Nessun elemento trovato',
  loading = false,
  items,
} = defineProps<{
  emptyLabel?: string
  loading?: boolean
  items: T[]
}>()

const themeVars = useThemeVars()
</script>
<template>
  <div class="w-full flex-1 flex items-center justify-center">
    <Icon
      v-if="loading"
      icon="svg-spinners:ring-resize"
      :style="{ color: themeVars.textColor3 }"
      class="text-2xl"
    />
    <span
      v-else-if="!items.length"
      :style="{ color: themeVars.textColor3 }"
      class="font-semibold"
      >{{ emptyLabel }}</span
    >
    <template v-else>
      <slot />
    </template>
  </div>
</template>
