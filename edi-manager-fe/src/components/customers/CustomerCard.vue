<script setup lang="ts">
import type { Customer } from '@backend/modules/customers/customers.types'
import { NButton, useThemeVars } from 'naive-ui'
import LabeledData from '../shared/LabeledData.vue'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{ customer: Customer }>()

const emit = defineEmits<{
  (event: 'edit', customer: Customer): void
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
    class="flex flex-col h-min p-3 gap-3 w-full"
    @mouseenter="hovered = true"
    @mousemove="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="flex justify-between gap-3 items-center mb-4">
      <span class="text-lg font-bold truncate">{{ props.customer.name }}</span>
      <NButton v-if="hovered" @click="emit('edit', props.customer)" circle ghost size="small">
        <template #icon>
          <Icon icon="lucide:edit-2" class="text-sm" />
        </template>
      </NButton>
    </div>

    <LabeledData label="Codice su SAP" :value="props.customer.sapCustomerCode" />
  </div>
</template>
