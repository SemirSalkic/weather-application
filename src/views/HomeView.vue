<script setup lang="ts">
import { ref } from 'vue'
import router, { RouteName } from '@/router'
import { useDebounceFn } from '@vueuse/core'
import { useLocationStore } from '@/stores/location'
import { onClickOutside } from '@vueuse/core'
import type { Address, Location } from '../stores/types'

const locationStore = useLocationStore()
const locationsQuery = ref('')
const target = ref()
const closeList = ref(false)

const debouncedGetLocations = useDebounceFn(
  () => locationStore.fetchLocations(locationsQuery.value),
  500
)

function formatAddress(address: Address) {
  const formattedAddress = [
    address.name,
    address.county || address.state,
    address.country,
    address.postcode || address.suburb
  ]
    .filter(Boolean)
    .join(', ')
  return formattedAddress
}

function fetchLocations() {
  if (locationsQuery.value.trim() !== '') {
    debouncedGetLocations()
    return
  }
  locationStore.$reset()
}

function navigateToSelectedCity(location: Location) {
  locationStore.selectedLocation = location
  locationStore.locations = null
  const country = location.address.country.replace(/\s/g, '-').toLocaleLowerCase()
  const city = location.address.name.replace(/\s/g, '-').toLocaleLowerCase()
  router.push({
    name: RouteName.CityWeatherView,
    params: { country: country, city: city }
  })
}

onClickOutside(target, () => (closeList.value = true))
</script>

<template>
  <div class="mx-auto max-w-3xl mt-4 px-4">
    <div ref="target" class="pt-4 mb-8 relative">
      <input
        v-model="locationsQuery"
        class="py-2 text-white px-2 w-full bg-transparent border-2 rounded-lg focus:border-weather-primary focus:outline-none"
        type="text"
        placeholder="Enter a location"
        @input="fetchLocations"
        @click="closeList = false"
      />
      <div
        v-if="(locationStore.locations || locationStore.locationsError) && !closeList"
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
        <ul v-else class="flex flex-col gap-2 px-1">
          <li
            v-for="location in locationStore.locations"
            :key="location.place_id"
            class="py-2 px-2 cursor-pointer border-2 hover:bg-weather-secondary/40 rounded-lg"
            @click="navigateToSelectedCity(location)"
          >
            {{ formatAddress(location.address) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
