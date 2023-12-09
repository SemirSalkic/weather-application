<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { SunIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import VButtonIcon from '@/components/reusable-components/VButtonIcon.vue'
import VDialog from '@/components/reusable-components/VDialog.vue'
import VButton from '@/components/reusable-components/VButton.vue'
import AboutApplication from './AboutApplication.vue'
import { RouteName } from '@/router'

const isDialogOpen = ref(false)
</script>

<template>
  <header class="bg-weather-primary sticky top-0 shadow-lg">
    <nav class="flex items-center justify-between container text-white py-6">
      <RouterLink :to="{ name: RouteName.Home }" class="flex items-center gap-2">
        <SunIcon class="w-7 h-7" />
        <span class="text-lg font-bold">Weather Application</span>
      </RouterLink>
      <VButtonIcon @click="isDialogOpen = true">
        <InformationCircleIcon class="w-7 h-7" />
      </VButtonIcon>
    </nav>
    <VDialog v-model="isDialogOpen" class="px-4 py-6 flex flex-col gap-4 max-w-5xl">
      <AboutApplication></AboutApplication>
      <VButton
        class="rounded-md w-52 self-center"
        color="neutral"
        label="Close"
        @click="isDialogOpen = false"
      ></VButton>
    </VDialog>
  </header>
</template>
