<script setup lang="ts">
import { RoutesConfig } from '@/config/routes.config'
import type { Route } from '@/types/routes.types'
import { renderIcon } from '@/utils/icons.utils'
import { type MenuOption, NDivider, NLayout, NLayoutSider, NMenu, useThemeVars } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Logo from './Logo.vue'

const router = useRouter()
const themeVars = useThemeVars()

const activeKey = ref<Route>('HOME')

type SidebarOption = MenuOption & { key: Route }
const sidebarOptions = ref<SidebarOption[]>([
  { label: 'Dashboard', key: 'HOME', icon: renderIcon('lucide:home') },
  { label: 'Campagne', key: 'COMPANIES', icon: renderIcon('lucide:building') },
  { label: 'Clienti', key: 'CUSTOMERS', icon: renderIcon('lucide:circle-euro') },
])

const handleKeySelect = (key: Route) => {
  router.push({ name: RoutesConfig[key].name })
}
</script>
<template>
  <div class="rounded-tr rounded-br w-80" :style="{ backgroundColor: themeVars.cardColor }">
    <div class="flex flex-col gap-2">
      <div class="pl-8 py-4 flex items-center gap-2">
        <Logo :width="24" :height="24" />
        <span class="text-lg font-bold">EDI Manager</span>
      </div>
      <NDivider class="my-0!" />
      <NMenu :options="sidebarOptions" v-model:value="activeKey" @update:value="handleKeySelect" />
    </div>
  </div>
</template>
