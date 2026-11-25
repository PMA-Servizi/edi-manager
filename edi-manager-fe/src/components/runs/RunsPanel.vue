<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LoadableList from '../shared/LoadableList.vue'
import type { Run } from '@backend/modules/runs/runs.types.ts'
import { runsRepository } from '@/repositories/runs.repository.ts'
import { useMessage } from 'naive-ui'
import RunCard from './RunCard.vue'

const message = useMessage()
const loading = ref<boolean>(false)
const runs = ref<Run[]>([])

const loadRuns = async () => {
  try {
    loading.value = true
    runs.value = await runsRepository.getAll()
  } catch {
    message.error('Errore nel caricamento dei clienti')
  } finally {
    loading.value = false
  }
}

onMounted(loadRuns)
</script>
<template>
  <div class="flex flex-col flex-1 gap-3">
    <div class="flex flex-col">
      <span class="font-bold text-lg">Runs</span>
      <span>Dettagli di quali flussi hanno girato</span>
    </div>
    <LoadableList emptyLabel="Nessuna esecuzione trovata" :loading="loading" :items="runs">
      <div class="flex flex-col gap-3 w-full self-start">
        <RunCard v-for="run in runs" :key="run.id" :run="run" />
      </div>
    </LoadableList>
  </div>
</template>
