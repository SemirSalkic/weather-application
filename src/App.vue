<template>
  <main class="min-h-screen bg-weather-secondary">
    <NavigationBar />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
</script>

<style>
html,
body {
  overflow-x: hidden;
}
</style>
