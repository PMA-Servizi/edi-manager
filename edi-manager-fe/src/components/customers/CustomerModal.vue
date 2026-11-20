<script setup lang="ts">
import { NButton, NInput } from 'naive-ui'
import BaseModal from '../shared/BaseModal.vue'
import { Icon } from '@iconify/vue'
import type { Customer } from '@backend/modules/customers/customers.types.ts'
import FormItem from '../shared/FormItem.vue'
import { DefaultCustomerForm } from '@/constants/customers.constants.ts'
import type { CustomerForm } from '@/types/customers.types.ts'
import { useForm } from 'vee-validate'
import { CreateCustomerSchema } from '@backend/modules/customers/customer.schemas.ts'

interface CustomerModalProps {
  customer?: Customer
}
const props = defineProps<CustomerModalProps>()
const open = defineModel<boolean>('open')

const { defineField, handleSubmit, errors } = useForm<CustomerForm>({
  initialValues: DefaultCustomerForm,
  validationSchema: CreateCustomerSchema,
})
const [name] = defineField('name')

const submit = async () => {
  open.value = false
}
</script>

<template>
  <BaseModal v-model:open="open" :title="props.customer ? 'Modifica cliente' : 'Crea cliente'">
    <div class="flex flex-col gap-2">
      <FormItem label="Nome" :error="errors.name ?? 'test'" required>
        <NInput type="text" placeholder="Nome del cliente..." v-model="name" />
      </FormItem>
    </div>
    <template #footer>
      <div class="flex items-center w-full justify-between">
        <NButton @click="open = false">Annulla</NButton>
        <NButton @click="submit" type="primary">
          <template #icon> <Icon icon="lucide:check" class="text-xl" /> </template>
          {{ props.customer ? 'Salva' : 'Crea' }}
        </NButton>
      </div>
    </template>
  </BaseModal>
</template>
