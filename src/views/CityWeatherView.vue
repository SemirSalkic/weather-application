<script setup lang="ts">
import VButton from '@/components/reusable-components/VButton.vue'
import { useLocationStore } from '@/stores/location'
import { storeToRefs } from 'pinia'
//TODO: PROMIJENI IMPORT I NA OSTALIM KOMPONENETIMA
const { selectedLocation } = storeToRefs(useLocationStore())

function logSelectedLocation() {
  console.log(selectedLocation.value)
}
</script>

<template>
  <div>
    <VButton color="neutral" @click="logSelectedLocation">Log selected location</VButton>
  </div>
</template>
