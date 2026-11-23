<script setup lang="ts">
import { NButton, NDivider, NInput, NSelect, useMessage } from 'naive-ui'
import BaseModal from '../shared/BaseModal.vue'
import { Icon } from '@iconify/vue'
import FormItem from '../shared/FormItem.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { validateOnInputIfErrored } from '@/utils/validation.utils.ts'
import { ref } from 'vue'
import type { Company, CreateCompanyDto } from '@backend/modules/companies/companies.types.ts'
import type { CompanyForm } from '@/types/companies.types.ts'
import {
  CompanyEdiCodeTypes,
  Countries,
  DefaultCompanyForm,
  Provinces,
} from '@/constants/companies.constants.ts'
import { CreateCompanySchema } from '@backend/modules/companies/companies.schemas.ts'
import { companiesRepository } from '@/repositories/companies.repository.ts'

interface CompanyModalProps {
  company?: Company
}
const props = defineProps<CompanyModalProps>()
const open = defineModel<boolean>('open')
const emit = defineEmits<{
  (event: 'success', newCompanyId: string): void
  (event: 'close'): void
}>()

const loading = ref<boolean>(false)
const message = useMessage()

const { defineField, handleSubmit, errors, resetForm, setValues } = useForm<
  CompanyForm,
  CreateCompanyDto
>({
  initialValues: DefaultCompanyForm,
  validationSchema: toTypedSchema(CreateCompanySchema),
})
const [name, nameProps] = defineField('name', validateOnInputIfErrored)
const [division, divisionProps] = defineField('division', validateOnInputIfErrored)
const [ediCompanyCode, ediCompanyCodeProps] = defineField(
  'ediCompanyCode',
  validateOnInputIfErrored,
)
const [ediCompanyCodeType, ediCompanyCodeTypeProps] = defineField(
  'ediCompanyCodeType',
  validateOnInputIfErrored,
)
const [businessName, businessNameProps] = defineField('businessName', validateOnInputIfErrored)
const [address, addressProps] = defineField('address', validateOnInputIfErrored)
const [city, cityProps] = defineField('city', validateOnInputIfErrored)
const [province, provinceProps] = defineField('province', validateOnInputIfErrored)
const [postalCode, postalCodeProps] = defineField('postalCode', validateOnInputIfErrored)
const [country, countryProps] = defineField('country', validateOnInputIfErrored)
const [courtOfLaw, courtOfLawProps] = defineField('courtOfLaw', validateOnInputIfErrored)
const [cciaa, cciaaProps] = defineField('cciaa', validateOnInputIfErrored)
const [shareCapital, shareCapitalProps] = defineField('shareCapital', validateOnInputIfErrored)
const [raeeRegistrationNumber, raeeRegistrationNumberProps] = defineField(
  'raeeRegistrationNumber',
  validateOnInputIfErrored,
)
const [pileRegistrationNumber, pileRegistrationNumberProps] = defineField(
  'pileRegistrationNumber',
  validateOnInputIfErrored,
)

const submit = handleSubmit(async (values) => {
  try {
    loading.value = true
    if (props.company) {
      const newCompanyId = await companiesRepository.update(props.company.id, values)
      message.success(`Cliente aggiornato`)
      emit('success', newCompanyId)
    } else {
      const newCompanyId = await companiesRepository.create(values)
      message.success(`${values.name} creato`)
      emit('success', newCompanyId)
    }
    open.value = false
  } catch {
    if (props.company) message.error('Errore nel salvataggio')
    else message.error("Errore nella creazione dell'azienda")
  } finally {
    loading.value = false
  }
})

const handleClose = () => {
  resetForm()
  emit('close')
}

const handleOpen = () => {
  if (!props.company) return
  setValues({
    name: props.company.name,
    businessName: props.company.businessName,
    division: props.company.division,
    city: props.company.city,
    province: props.company.province,
    country: props.company.country,
    postalCode: props.company.postalCode,
    address: props.company.address,
    raeeRegistrationNumber: props.company.raeeRegistrationNumber,
    pileRegistrationNumber: props.company.pileRegistrationNumber,
    shareCapital: props.company.shareCapital,
    cciaa: props.company.cciaa,
    courtOfLaw: props.company.courtOfLaw,
    ediCompanyCode: props.company.ediCompanyCode,
    ediCompanyCodeType: props.company.ediCompanyCodeType,
  })
}
</script>

<template>
  <BaseModal
    v-model:open="open"
    :title="props.company ? 'Modifica azienda' : 'Crea azienda'"
    @close="handleClose"
    @open="handleOpen"
    :closable="!loading"
    size="lg"
  >
    <div class="flex flex-col gap-3">
      <div class="flex gap-3">
        <FormItem label="Nome" :error="errors.name" required class="flex-2">
          <NInput
            type="text"
            placeholder="Nome dell'azienda..."
            v-model:value="name"
            minlength="3"
            maxlength="50"
            showCount
            v-bind="nameProps"
            :status="!!errors.name ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
        <FormItem label="Divisione" :error="errors.division" required class="flex-1">
          <NInput
            type="text"
            placeholder="Divisione..."
            v-model:value="division"
            minlength="1"
            maxlength="20"
            showCount
            v-bind="divisionProps"
            :status="!!errors.division ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
      </div>
      <div class="flex gap-3">
        <FormItem label="Codice EDI" :error="errors.ediCompanyCode" required class="flex-1">
          <NInput
            type="text"
            placeholder="Codice EDI..."
            v-model:value="ediCompanyCode"
            minlength="1"
            maxlength="20"
            showCount
            v-bind="ediCompanyCodeProps"
            :status="!!errors.ediCompanyCode ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
        <FormItem
          label="Tipo di codice EDI"
          :error="errors.ediCompanyCodeType"
          required
          class="flex-1"
        >
          <NSelect
            v-model:value="ediCompanyCodeType"
            v-bind="ediCompanyCodeTypeProps"
            :options="CompanyEdiCodeTypes"
            placeholder="Tipo di codice EDI..."
            :status="!!errors.ediCompanyCodeType ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
      </div>
      <div class="flex gap-3">
        <FormItem label="Ragione Sociale" :error="errors.businessName" required class="flex-1">
          <NInput
            type="text"
            placeholder="Ragione sociale..."
            v-model:value="businessName"
            minlength="1"
            maxlength="90"
            showCount
            v-bind="businessNameProps"
            :status="!!errors.businessName ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
        <FormItem label="Capitale Sociale" :error="errors.shareCapital" required class="flex-1">
          <NInput
            type="text"
            placeholder="Capitale sociale..."
            v-model:value="shareCapital"
            minlength="1"
            maxlength="35"
            showCount
            v-bind="shareCapitalProps"
            :status="!!errors.shareCapital ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
      </div>
      <NDivider class="my-0!" />
      <div class="flex gap-3">
        <FormItem label="Indirizzo" :error="errors.address" required class="flex-2">
          <NInput
            type="text"
            placeholder="Indirizzo..."
            v-model:value="address"
            minlength="1"
            maxlength="90"
            showCount
            v-bind="addressProps"
            :status="!!errors.address ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
        <FormItem label="CAP" :error="errors.postalCode" class="flex-1" required>
          <NInput
            type="text"
            placeholder="CAP..."
            v-model:value="postalCode"
            minlength="5"
            maxlength="5"
            showCount
            v-bind="postalCodeProps"
            :status="!!errors.postalCode ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
      </div>
      <div class="flex gap-3">
        <FormItem label="Nazione" :error="errors.country" required class="flex-1">
          <NSelect
            v-model:value="country"
            v-bind="countryProps"
            :options="Countries"
            filterable
            :consistentMenuWidth="false"
            placeholder="Nazione..."
            :status="!!errors.country ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
        <FormItem label="Provincia" :error="errors.province" class="flex-1" required>
          <NSelect
            v-model:value="province"
            v-bind="provinceProps"
            :options="Provinces"
            filterable
            :consistentMenuWidth="false"
            placeholder="Provincia..."
            :status="!!errors.province ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
        <FormItem label="Città" :error="errors.city" class="flex-2" required>
          <NInput
            type="text"
            placeholder="Città..."
            v-model:value="city"
            minlength="1"
            maxlength="90"
            showCount
            v-bind="cityProps"
            :status="!!errors.city ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
      </div>
      <NDivider class="my-0!" />
      <div class="flex gap-3">
        <FormItem label="Codice CCIAA" :error="errors.cciaa" required class="flex-1">
          <NInput
            type="text"
            placeholder="Codice CCIAA..."
            v-model:value="cciaa"
            minlength="1"
            maxlength="35"
            showCount
            v-bind="cciaaProps"
            :status="!!errors.cciaa ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
        <FormItem label="Tribunale di registrazione" :error="errors.courtOfLaw" class="flex-1">
          <NInput
            type="text"
            placeholder="Tribunale..."
            v-model:value="courtOfLaw"
            maxlength="35"
            showCount
            v-bind="courtOfLawProps"
            :status="!!errors.courtOfLaw ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
      </div>
      <div class="flex gap-3">
        <FormItem
          label="Numero di registrazione RAEE"
          :error="errors.raeeRegistrationNumber"
          required
          class="flex-1"
        >
          <NInput
            type="text"
            placeholder="Numero di regitrazione..."
            v-model:value="raeeRegistrationNumber"
            minlength="1"
            maxlength="16"
            showCount
            v-bind="raeeRegistrationNumberProps"
            :status="!!errors.raeeRegistrationNumber ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
        <FormItem
          label="Numero Registro Pile e Accumulatori"
          :error="errors.pileRegistrationNumber"
          required
          class="flex-1"
        >
          <NInput
            type="text"
            placeholder="Numero di iscrizione..."
            v-model:value="pileRegistrationNumber"
            minlength="1"
            maxlength="16"
            showCount
            v-bind="pileRegistrationNumberProps"
            :status="!!errors.pileRegistrationNumber ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center w-full justify-between">
        <NButton @click="open = false" :disabled="loading">Annulla</NButton>
        <NButton @click="submit" type="primary" :loading="loading">
          <template #icon> <Icon icon="lucide:check" class="text-xl" /> </template>
          {{ props.company ? 'Salva' : 'Crea' }}
        </NButton>
      </div>
    </template>
  </BaseModal>
</template>
