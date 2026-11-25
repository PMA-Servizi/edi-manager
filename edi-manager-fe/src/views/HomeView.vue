<script setup lang="ts">
import RunsPanel from '@/components/runs/RunsPanel.vue'
import { NDivider } from 'naive-ui'
</script>
<template>
  <div class="w-full h-full flex gap-3 p-3">
    <RunsPanel />
    <NDivider vertical class="mx-0! h-full!" />
    <span>JOBS</span>
  </div>
</template>
