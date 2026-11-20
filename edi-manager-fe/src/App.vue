<script setup lang="ts">
import { darkTheme, NConfigProvider, NGlobalStyle } from 'naive-ui'
</script>

<template>
  <NConfigProvider :theme="darkTheme" class="h-screen">
    <RouterView />
    <NGlobalStyle />
  </NConfigProvider>
</template>
