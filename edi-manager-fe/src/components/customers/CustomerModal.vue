<script setup lang="ts">
import { NButton, NInput, useMessage } from 'naive-ui'
import BaseModal from '../shared/BaseModal.vue'
import { Icon } from '@iconify/vue'
import type { Customer } from '@backend/modules/customers/customers.types.ts'
import FormItem from '../shared/FormItem.vue'
import { DefaultCustomerForm } from '@/constants/customers.constants.ts'
import type { CustomerForm } from '@/types/customers.types.ts'
import { useForm } from 'vee-validate'
import { CreateCustomerSchema } from '@backend/modules/customers/customer.schemas.ts'
import { toTypedSchema } from '@vee-validate/zod'
import { validateOnInputIfErrored } from '@/utils/validation.utils.ts'
import { customersRepository } from '@/repositories/customers.repository.ts'
import { ref } from 'vue'

interface CustomerModalProps {
  customer?: Customer
}
const props = defineProps<CustomerModalProps>()
const open = defineModel<boolean>('open')
const emit = defineEmits<{
  (event: 'success', newCustomerId: string): void
  (event: 'close'): void
}>()

const loading = ref<boolean>(false)
const message = useMessage()

const { defineField, handleSubmit, errors, resetForm, setValues } = useForm<CustomerForm>({
  initialValues: DefaultCustomerForm,
  validationSchema: toTypedSchema(CreateCustomerSchema),
})
const [name, nameProps] = defineField('name', validateOnInputIfErrored)
const [sapCustomerCode, sapCustomerCodeProps] = defineField(
  'sapCustomerCode',
  validateOnInputIfErrored,
)

const submit = handleSubmit(async (values) => {
  try {
    loading.value = true
    if (props.customer) {
      const newCustomerId = await customersRepository.update(props.customer.id, values)
      message.success(`Cliente aggiornato`)
      emit('success', newCustomerId)
    } else {
      const newCustomerId = await customersRepository.create(values)
      message.success(`${values.name} creato`)
      emit('success', newCustomerId)
    }
    open.value = false
  } catch {
    if (props.customer) message.error('Errore nel salvataggio')
    else message.error('Errore nella creazione del cliente')
  } finally {
    loading.value = false
  }
})

const handleClose = () => {
  resetForm()
  emit('close')
}

const handleOpen = () => {
  if (!props.customer) return
  setValues({
    name: props.customer.name,
    sapCustomerCode: props.customer.sapCustomerCode,
  })
}
</script>

<template>
  <BaseModal
    v-model:open="open"
    :title="props.customer ? 'Modifica cliente' : 'Crea cliente'"
    @close="handleClose"
    @open="handleOpen"
    :closable="!loading"
  >
    <div class="flex flex-col gap-3">
      <FormItem label="Nome" :error="errors.name" required>
        <NInput
          type="text"
          placeholder="Nome del cliente..."
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
      <FormItem label="Codice SAP" :error="errors.sapCustomerCode" required>
        <NInput
          type="text"
          placeholder="Codice SAP del cliente..."
          v-model:value="sapCustomerCode"
          minlength="1"
          maxlength="20"
          showCount
          v-bind="sapCustomerCodeProps"
          :status="!!errors.sapCustomerCode ? 'error' : undefined"
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
          {{ props.customer ? 'Salva' : 'Crea' }}
        </NButton>
      </div>
    </template>
  </BaseModal>
</template>
