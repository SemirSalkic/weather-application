<template>
  <header class="bg-weather-primary sticky top-0 shadow-lg">
    <nav class="flex gap-6 items-center justify-between container text-white py-6">
      <RouterLink :to="{ name: 'home' }" class="flex items-center">
        <SunIcon class="w-7 h-7" />
        <span class="ml-2 text-lg font-bold">Weather Application</span>
      </RouterLink>
      <VButtonIcon @click="isDialogOpen = true">
        <InformationCircleIcon class="w-7 h-7" />
      </VButtonIcon>

      <VDialog v-model="isDialogOpen" class="px-4 py-6 flex flex-col gap-4 max-w-5xl">
        <AboutApplication></AboutApplication>
        <VButton
          class="rounded-md w-52 self-center"
          color="neutral"
          label="Close"
          @click="isDialogOpen = false"
        ></VButton>
      </VDialog>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { SunIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import VButtonIcon from './reusable-components/VButtonIcon.vue'
import VDialog from './reusable-components/VDialog.vue'
import VButton from './reusable-components/VButton.vue'
import AboutApplication from './AboutApplication.vue'

const isDialogOpen = ref(false)
</script>
