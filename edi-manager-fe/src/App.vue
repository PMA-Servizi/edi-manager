<script setup lang="ts">
import {
  darkTheme,
  NConfigProvider,
  NGlobalStyle,
  NMessageProvider,
  NModalProvider,
  type GlobalThemeOverrides,
} from 'naive-ui'
import Layout from './components/shared/Layout.vue'
import Sidebar from './components/shared/Sidebar.vue'

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
        <Layout>
          <template #sidebar>
            <Sidebar />
          </template>
          <RouterView />
        </Layout>
        <NGlobalStyle />
      </NModalProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
