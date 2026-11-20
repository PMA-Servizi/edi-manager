<script setup lang="ts">
import { darkTheme, NConfigProvider, NGlobalStyle } from 'naive-ui'
import Layout from './components/shared/Layout.vue'
import Sidebar from './components/shared/Sidebar.vue'
</script>

<template>
  <NConfigProvider :theme="darkTheme" class="h-screen">
    <Layout>
      <template #sidebar>
        <Sidebar />
      </template>
      <RouterView />
    </Layout>
    <NGlobalStyle />
  </NConfigProvider>
</template>
