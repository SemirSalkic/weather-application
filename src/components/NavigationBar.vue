<template>
  <header class="bg-weather-primary sticky top-0 shadow-lg">
    <nav class="flex gap-6 items-center shadow-lg justify-between container text-white py-6">
      <RouterLink :to="{ name: 'home' }" class="flex items-center">
        <SunIcon class="w-7 h-7" />
        <span class="ml-2 text-lg font-bold">Weather Application</span>
      </RouterLink>
      <VButtonIcon>
        <InformationCircleIcon class="w-7 h-7" />
      </VButtonIcon>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { SunIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import VButtonIcon from './reusableComponents/VButtonIcon.vue'
</script>
