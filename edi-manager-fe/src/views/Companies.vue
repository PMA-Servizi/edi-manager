<script setup lang="ts">
import CompanyCard from '@/components/companies/CompanyCard.vue'
import CompanyModal from '@/components/companies/CompanyModal.vue'
import DetailsLayout from '@/components/shared/DetailsLayout.vue'
import LoadableList from '@/components/shared/LoadableList.vue'
import { companiesRepository } from '@/repositories/companies.repository'
import type { Company } from '@backend/modules/companies/companies.types'
import { Icon } from '@iconify/vue'
import { NButton, useMessage } from 'naive-ui'
import { onMounted, ref } from 'vue'

const showCompanyModal = ref<boolean>(false)
const loading = ref<boolean>(false)
const message = useMessage()
const companies = ref<Company[]>([])
const companyToEdit = ref<Company>()

const loadCompanies = async () => {
  try {
    loading.value = true
    companies.value = await companiesRepository.getAll()
  } catch {
    message.error('Errore nel caricamento delle aziende')
  } finally {
    loading.value = false
  }
}

const editCustomer = (company: Company) => {
  companyToEdit.value = company
  showCompanyModal.value = true
}

onMounted(loadCompanies)
</script>
<template>
  <DetailsLayout title="Aziende">
    <template #header>
      <NButton @click="showCompanyModal = true" round type="primary">
        <template #icon>
          <Icon icon="lucide:plus" class="text-xl" />
        </template>
        Crea azienda
      </NButton>
    </template>
    <LoadableList emptyLabel="Nessuna azienda trovata" :loading="loading" :items="companies">
      <div
        class="max-w-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full p-3 self-start"
      >
        <CompanyCard
          v-for="company in companies"
          :key="company.id"
          :company="company"
          @edit="editCustomer"
        />
      </div>
    </LoadableList>
    <CompanyModal
      v-model:open="showCompanyModal"
      @success="loadCompanies"
      @close="companyToEdit = undefined"
      :company="companyToEdit"
    />
  </DetailsLayout>
</template>
