<template>
  <div class="min-h-screen bg-weather-secondary">
    <NavigationBar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
</script>
