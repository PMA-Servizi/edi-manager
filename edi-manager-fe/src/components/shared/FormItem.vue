<script setup lang="ts">
import { useThemeVars } from 'naive-ui'

interface FormItemProps {
  label?: string
  error?: string
  required?: boolean
}
const props = defineProps<FormItemProps>()

const themeVars = useThemeVars()
</script>
<template>
  <div class="flex flex-col w-full relative gap-2 overflow-visible">
    <div class="flex items-center gap-1">
      <span v-if="props.label" :style="{ color: themeVars.textColor3 }">{{ props.label }}</span>
      <span v-if="props.required" class="font-bold" :style="{ color: themeVars.errorColor }"
        >*</span
      >
    </div>
    <slot />
    <div
      v-if="props.error"
      class="absolute -bottom-2 left-0 font-thin text-sm"
      :style="{ color: themeVars.errorColor }"
    >
      {{ error }}
    </div>
  </div>
</template>
