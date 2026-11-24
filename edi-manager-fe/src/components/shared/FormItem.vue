<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useThemeVars } from 'naive-ui'

interface FormItemProps {
  icon?: string
  label?: string
  error?: string
  required?: boolean
}
const props = defineProps<FormItemProps>()

const themeVars = useThemeVars()
</script>
<template>
  <div class="flex flex-col w-full relative gap-1">
    <div class="flex items-center gap-1">
      <Icon
        v-if="props.icon"
        :icon="props.icon"
        :style="{ color: themeVars.textColor3 }"
        class="text-sm"
      />
      <span v-if="props.label" :style="{ color: themeVars.textColor3 }">{{ props.label }}</span>
      <span v-if="props.required" class="font-bold" :style="{ color: themeVars.errorColor }"
        >*</span
      >
    </div>
    <slot />
    <Transition name="fade">
      <div
        v-if="props.error"
        class="absolute top-full mt-0 left-0 font-thin text-xs truncate max-w-80"
        :style="{ color: themeVars.errorColor }"
      >
        {{ error }}
      </div>
    </Transition>
  </div>
</template>
