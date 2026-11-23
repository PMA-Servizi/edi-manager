<script setup lang="ts">
import { useThemeVars } from 'naive-ui'

const props = defineProps<{ label: string; value?: string | number }>()

const themeVars = useThemeVars()
</script>
<template>
  <div class="flex flex-col">
    <span class="text-sm truncate" :style="{ color: themeVars.textColor3 }">{{ props.label }}</span>
    <slot>
      <span v-if="props.value" class="font-semibold truncate">{{ props.value }}</span>
    </slot>
  </div>
</template>
