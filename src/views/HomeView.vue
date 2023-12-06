<script setup lang="ts">
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useLocationStore } from '@/stores/location'

const locationStore = useLocationStore()
const locationsQuery = ref('')

const debouncedGetLocations = useDebounceFn(() => {
  locationStore.fetchLocations(locationsQuery.value)
}, 500)

function fetchLocations() {
  if (locationsQuery.value.trim() !== '') {
    debouncedGetLocations()
    return
  }
  locationStore.locations = null
}
</script>

<template>
  <div class="mx-auto max-w-3xl mt-4 px-4">
    <div class="pt-4 mb-8 relative">
      <input
        ref="input"
        v-model="locationsQuery"
        class="py-2 text-white px-1 w-full bg-transparent border-b focus:border-weather-primary focus:outline-none"
        type="text"
        placeholder="Enter a location"
        @input="fetchLocations"
      />
      <div
        v-if="locationStore.locations || locationStore.locationsError"
        class="absolute bg-weather-primary rounded-lg text-white w-full shadow-md py-2 px-1 mt-2"
      >
        <p v-if="locationStore.locationsError" class="py-2 px-2">
          There was an error, please try again.
        </p>
        <p
          v-if="!locationStore.locationsError && locationStore.locations?.length === 0"
          class="py-2 px-2"
        >
          No results found, please try another location.
        </p>
        <ul v-else class="flex flex-col gap-1">
          <li
            v-for="location in locationStore.locations"
            :key="location.place_id"
            class="py-2 px-2 cursor-pointer hover:bg-weather-secondary/40 rounded-lg"
          >
            {{ location.display_name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
