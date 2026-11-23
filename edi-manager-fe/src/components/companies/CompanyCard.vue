<script setup lang="ts">
import { NButton, useThemeVars } from 'naive-ui'
import LabeledData from '../shared/LabeledData.vue'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import type { Company } from '@backend/modules/companies/companies.types.ts'

const props = defineProps<{ company: Company }>()

const emit = defineEmits<{
  (event: 'edit', company: Company): void
}>()

const hovered = ref<boolean>(false)

const themeVars = useThemeVars()
</script>
<template>
  <div
    :style="{
      backgroundColor: themeVars.cardColor,
      borderRadius: themeVars.borderRadius,
    }"
    class="flex flex-col h-min p-3 gap-1.5 w-full"
    @mouseenter="hovered = true"
    @mousemove="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="flex justify-between gap-3 items-center mb-4">
      <span class="text-lg font-bold truncate">{{ props.company.name }}</span>
      <NButton v-if="hovered" @click="emit('edit', props.company)" circle ghost size="small">
        <template #icon>
          <Icon icon="lucide:edit-2" class="text-sm" />
        </template>
      </NButton>
    </div>

    <LabeledData label="Ragione sociale" :value="props.company.businessName" />
    <LabeledData label="Divisione" :value="props.company.division" />
    <LabeledData label="Codice EDI" :value="props.company.ediCompanyCode" />
  </div>
</template>
