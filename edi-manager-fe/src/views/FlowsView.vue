<script setup lang="ts">
import FlowListItem from '@/components/flows/FlowListItem.vue'
import FlowModal from '@/components/flows/FlowModal.vue'
import DetailsLayout from '@/components/shared/DetailsLayout.vue'
import LoadableList from '@/components/shared/LoadableList.vue'
import { flowsRepository } from '@/repositories/flows.repository'
import type { Flow } from '@backend/modules/flows/flows.types'
import { Icon } from '@iconify/vue'
import { NButton, useMessage } from 'naive-ui'
import { onMounted, ref } from 'vue'

const showFlowModal = ref<boolean>(false)
const loading = ref<boolean>(false)
const message = useMessage()
const flows = ref<Flow[]>([])
const flowToEdit = ref<Flow>()

const loadFlows = async () => {
  try {
    loading.value = true
    flows.value = await flowsRepository.getAll()
  } catch {
    message.error('Errore nel caricamento delle aziende')
  } finally {
    loading.value = false
  }
}

const editFlow = (flow: Flow) => {
  flowToEdit.value = flow
  showFlowModal.value = true
}

const toggleFlow = async (flow: Flow) => {
  const targetFlow = flows.value.find((f) => f.id === flow.id)
  if (!targetFlow) await loadFlows()
  else {
    targetFlow.enabled = !targetFlow.enabled
  }
}

onMounted(loadFlows)
</script>
<template>
  <DetailsLayout title="Flussi">
    <template #header>
      <NButton @click="showFlowModal = true" round type="primary">
        <template #icon>
          <Icon icon="lucide:plus" class="text-xl" />
        </template>
        Crea flusso
      </NButton>
    </template>
    <LoadableList emptyLabel="Nessun flusso trovato" :loading="loading" :items="flows">
      <div class="w-full flex flex-col gap-3 p-3 self-start">
        <FlowListItem
          v-for="flow in flows"
          :key="flow.id"
          :flow="flow"
          @edit="editFlow"
          @toggled="toggleFlow"
        />
      </div>
    </LoadableList>
    <FlowModal
      v-model:open="showFlowModal"
      @success="loadFlows"
      @close="flowToEdit = undefined"
      :flow="flowToEdit"
    />
  </DetailsLayout>
</template>
