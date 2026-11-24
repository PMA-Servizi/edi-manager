<script setup lang="ts">
import type { Union } from '@backend/modules/flows/flows.types'
import { Icon } from '@iconify/vue'
import { NTag } from 'naive-ui'

const props = defineProps<{ union: Union }>()
</script>
<template>
  <NTag round :bordered="false" class="w-max">
    <template #icon>
      <Icon icon="lucide:users" />
    </template>
    <span class="truncate">
      {{ props.union }}
    </span>
  </NTag>
</template>
