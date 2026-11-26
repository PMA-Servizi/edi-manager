<script setup lang="ts">
import RunCard from '@/components/runs/RunCard.vue'
import DetailsLayout from '@/components/shared/DetailsLayout.vue'
import LoadableList from '@/components/shared/LoadableList.vue'
import { runsRepository } from '@/repositories/runs.repository'
import type { RunDto } from '@backend/modules/runs/runs.types'
import { useMessage } from 'naive-ui'
import { onMounted, ref } from 'vue'

const message = useMessage()
const loading = ref<boolean>(false)
const runs = ref<RunDto[]>([])

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
  <DetailsLayout title="Esecuzioni">
    <LoadableList emptyLabel="Nessuna esecuzione trovata" :loading="loading" :items="runs">
      <div
        class="p-3 max-w-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full self-start"
      >
        <RunCard v-for="run in runs" :key="run.id" :run="run" />
      </div>
    </LoadableList>
  </DetailsLayout>
</template>
