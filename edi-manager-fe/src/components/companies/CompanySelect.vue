<script setup lang="ts">
import { companiesRepository } from '@/repositories/companies.repository'
import type { Company } from '@backend/modules/companies/companies.types'
import { NSelect, useMessage } from 'naive-ui'
import { computed, onMounted, ref, watch } from 'vue'

interface CompanySelectProps {
  placeholder?: string
  invalid?: boolean
}
const { placeholder = 'Seleziona azienda', invalid = false } = defineProps<CompanySelectProps>()
const selectedCompany = defineModel<Company | null>()

const companies = ref<Company[]>([])
const selectedCompanyId = ref<string | null>(null)
const loading = ref<boolean>(false)
const message = useMessage()

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

const companyOptions = computed<{ label: string; value: string }[]>(() => {
  return companies.value.map((company) => {
    return {
      label: company.name,
      value: company.id,
    }
  })
})

watch(
  selectedCompanyId,
  (newId) => {
    if (!newId) {
      selectedCompany.value = null
      return
    }

    const targetCompany = companies.value.find((company) => company.id === newId)
    if (!targetCompany) selectedCompany.value = null
    else selectedCompany.value = targetCompany
  },
  { immediate: true },
)

watch(
  selectedCompany,
  (newCompany) => {
    if (!newCompany) {
      selectedCompanyId.value = null
      return
    }
    if (newCompany.id === selectedCompanyId.value) return
    selectedCompanyId.value = newCompany.id
  },
  { immediate: true },
)

onMounted(loadCompanies)
</script>
<template>
  <NSelect
    v-model:value="selectedCompanyId"
    :options="companyOptions"
    :consistentMenuWidth="false"
    :placeholder="placeholder"
    :status="invalid ? 'error' : undefined"
    :loading="loading"
    :disabled="loading"
  />
</template>
