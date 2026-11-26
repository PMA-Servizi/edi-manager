<script setup lang="ts">
import { NButton, NInputNumber, NSelect, useMessage } from 'naive-ui'
import BaseModal from '../shared/BaseModal.vue'
import { Icon } from '@iconify/vue'
import FormItem from '../shared/FormItem.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { validateOnInputIfErrored } from '@/utils/validation.utils.ts'
import { ref } from 'vue'
import type { Flow } from '@backend/modules/flows/flows.types.ts'
import type { FlowForm, FlowFormData } from '@/types/flows.types.ts'
import {
  DefaultFlowForm,
  EdiRecordTypes,
  FlowOperations,
  Unions,
} from '@/constants/flows.constants.ts'
import { flowsRepository } from '@/repositories/flows.repository.ts'
import CompanySelect from '../companies/CompanySelect.vue'
import CustomerSelect from '../customers/CustomerSelect.vue'
import { FlowFormSchema } from '@/schemas/flows.schemas.ts'
import { handleCustomError, isCustomError } from '@/utils/errors.utils.ts'

interface FlowModalProps {
  flow?: Flow
}
const props = defineProps<FlowModalProps>()
const open = defineModel<boolean>('open')
const emit = defineEmits<{
  (event: 'success', newFlowId: string): void
  (event: 'close'): void
}>()

const loading = ref<boolean>(false)
const message = useMessage()

const { defineField, handleSubmit, errors, resetForm, setValues } = useForm<FlowForm, FlowFormData>(
  {
    initialValues: DefaultFlowForm,
    validationSchema: toTypedSchema(FlowFormSchema),
  },
)
const [interval, intervalProps] = defineField<'interval'>('interval', validateOnInputIfErrored)
const [operation, operationProps] = defineField<'operation'>('operation', validateOnInputIfErrored)
const [union, unionProps] = defineField<'union'>('union', validateOnInputIfErrored)
const [ediRecordType, ediRecordTypeProps] = defineField<'ediRecordType'>(
  'ediRecordType',
  validateOnInputIfErrored,
)
const [company, companyProps] = defineField<'company'>('company', validateOnInputIfErrored)
const [customer, customerProps] = defineField<'customer'>('customer', validateOnInputIfErrored)

const submit = handleSubmit(async (values) => {
  try {
    loading.value = true
    if (props.flow) {
      const newFlowId = await flowsRepository.update(props.flow.id, values)
      message.success(`Flusso aggiornato`)
      emit('success', newFlowId)
    } else {
      const newFlowId = await flowsRepository.create(values)
      message.success(`Flusso creato`)
      emit('success', newFlowId)
    }
    open.value = false
  } catch (err) {
    if (isCustomError(err, 'DUPLICATED'))
      handleCustomError({
        err,
        slug: 'DUPLICATED',
        cb: () => {
          message.error(`Flusso già esistente`)
        },
      })
    else if (props.flow) message.error('Errore nel salvataggio')
    else message.error('Errore nella creazione del flusso')
  } finally {
    loading.value = false
  }
})

const handleClose = () => {
  resetForm()
  emit('close')
}

const handleOpen = () => {
  if (!props.flow) return
  setValues({
    interval: props.flow.interval,
    operation: props.flow.operation,
    ediRecordType: props.flow.ediRecordType,
    company: props.flow.company,
    customer: props.flow.customer,
    union: props.flow.union,
  })
}
</script>

<template>
  <BaseModal
    v-model:open="open"
    :title="props.flow ? 'Modifica flusso' : 'Crea flusso'"
    @close="handleClose"
    @open="handleOpen"
    :closable="!loading"
  >
    <div class="flex flex-col gap-3">
      <div class="flex gap-3">
        <FormItem label="Tipo di Record EDI" :error="errors.ediRecordType" required class="flex-2">
          <NSelect
            v-model:value="ediRecordType"
            v-bind="ediRecordTypeProps"
            :options="EdiRecordTypes"
            filterable
            :consistentMenuWidth="false"
            placeholder="Tipo di record..."
            :status="!!errors.ediRecordType ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
      </div>
      <div class="flex gap-3">
        <FormItem
          label="Consorzio"
          :error="errors.union"
          required
          class="flex-1"
          icon="lucide:users"
        >
          <NSelect
            v-model:value="union"
            v-bind="unionProps"
            :options="Unions"
            :consistentMenuWidth="false"
            placeholder="Operazione..."
            :status="!!errors.union ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
        <FormItem label="Operazione" :error="errors.operation" required class="flex-1">
          <NSelect
            v-model:value="operation"
            v-bind="operationProps"
            :options="FlowOperations"
            :consistentMenuWidth="false"
            placeholder="Operazione..."
            :status="!!errors.operation ? 'error' : undefined"
            :loading="loading"
            :disabled="loading"
          />
        </FormItem>
      </div>

      <div class="flex gap-3">
        <FormItem
          label="Azienda"
          :error="errors.company"
          required
          class="flex-1"
          icon="lucide:building"
        >
          <CompanySelect v-model="company" v-bind="companyProps" :invalid="!!errors.company" />
        </FormItem>
        <FormItem
          label="Cliente"
          :error="errors.customer"
          required
          class="flex-1"
          icon="lucide:circle-euro"
        >
          <CustomerSelect v-model="customer" v-bind="customerProps" :invalid="!!errors.customer" />
        </FormItem>
      </div>
      <FormItem
        label="Intervallo di attivazione del flusso (in secondi)"
        :error="errors.interval"
        required
        class="flex-1"
      >
        <NInputNumber
          placeholder="Intervallo..."
          v-model:value="interval"
          :min="60"
          :max="10_000_000"
          :showButton="false"
          v-bind="intervalProps"
          :status="!!errors.interval ? 'error' : undefined"
          :loading="loading"
          :disabled="loading"
        />
      </FormItem>
    </div>
    <template #footer>
      <div class="flex items-center w-full justify-between">
        <NButton @click="open = false" :disabled="loading">Annulla</NButton>
        <NButton @click="submit" type="primary" :loading="loading">
          <template #icon> <Icon icon="lucide:check" class="text-xl" /> </template>
          {{ props.flow ? 'Salva' : 'Crea' }}
        </NButton>
      </div>
    </template>
  </BaseModal>
</template>
