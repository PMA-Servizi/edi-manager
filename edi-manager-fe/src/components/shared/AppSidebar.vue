<script setup lang="ts">
import type { RouteName } from '@/types/routes.types'
import { renderIcon } from '@/utils/icons.utils'
import { type MenuOption, NDivider, NMenu, useThemeVars } from 'naive-ui'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Logo from './AppLogo.vue'

const router = useRouter()
const route = useRoute()
const themeVars = useThemeVars()

const activeKey = ref<RouteName>('home')

type SidebarOption = MenuOption & { key: RouteName }
const sidebarOptions = ref<SidebarOption[]>([
  { label: 'Dashboard', key: 'home', icon: renderIcon('lucide:home') },
  { label: 'Esecuzioni', key: 'runs', icon: renderIcon('lucide:clipboard-list') },
  { label: 'Flussi', key: 'flows', icon: renderIcon('lucide:route-arrow-right') },
  { label: 'Aziende', key: 'companies', icon: renderIcon('lucide:building') },
  { label: 'Clienti', key: 'customers', icon: renderIcon('lucide:circle-euro') },
])

const handleKeySelect = (key: RouteName) => {
  router.push({ name: key })
}

watch(
  () => route.matched[0]?.name,
  (newName) => {
    if (newName && newName !== activeKey.value) activeKey.value = newName as RouteName
  },
  { immediate: true },
)
</script>
<template>
  <div class="rounded-tr-xl rounded-br-xl w-80" :style="{ backgroundColor: themeVars.cardColor }">
    <div class="flex flex-col">
      <div class="pl-8 h-16 flex items-center gap-2">
        <Logo :width="24" :height="24" />
        <span class="text-lg font-bold">EDI Manager</span>
      </div>
      <NDivider class="my-0!" />
      <NMenu :options="sidebarOptions" v-model:value="activeKey" @update:value="handleKeySelect" />
    </div>
  </div>
</template>
