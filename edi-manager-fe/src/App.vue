<script setup lang="ts">
import {
  darkTheme,
  NConfigProvider,
  NGlobalStyle,
  NMessageProvider,
  NModalProvider,
  type GlobalThemeOverrides,
} from 'naive-ui'
import AppLayout from './components/shared/AppLayout.vue'
import AppSidebar from './components/shared/AppSidebar.vue'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#E8B931',
    primaryColorHover: '#F3CB55',
    primaryColorPressed: '#C99A1E',
    primaryColorSuppl: '#D9A928',
    fontFamily: "'Nunito', sans-serif",
    borderRadius: '8px',
    borderRadiusSmall: '4px',
  },
}
</script>

<template>
  <NConfigProvider :theme="darkTheme" :theme-overrides="themeOverrides" class="h-screen">
    <NMessageProvider>
      <NModalProvider>
        <AppLayout>
          <template #sidebar>
            <AppSidebar />
          </template>
          <RouterView />
        </AppLayout>
        <NGlobalStyle />
      </NModalProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
