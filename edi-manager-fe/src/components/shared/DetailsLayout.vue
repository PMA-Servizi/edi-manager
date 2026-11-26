<script setup lang="ts">
import { NDivider } from 'naive-ui'

const props = defineProps<{ title: string }>()
</script>
<template>
  <section class="w-full flex flex-col">
    <header class="w-full flex justify-between items-center h-16 px-6">
      <span class="font-bold text-lg">{{ props.title }}</span>
      <slot name="header" />
    </header>
    <NDivider class="my-0!" />
    <div class="flex-1 overflow-y-auto">
      <slot />
    </div>
  </section>
</template>
