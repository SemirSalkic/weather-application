<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { SunIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import VButtonIcon from '@/components/action-components/VButtonIcon.vue'
import VDialog from '@/components/action-components/VDialog.vue'
import VButton from '@/components/action-components/VButton.vue'
import AboutApplication from './AboutApplication.vue'
import router, { RouteName } from '@/router'
import { useDebounceFn } from '@vueuse/core'
import { useLocationStore } from '@/stores/location'
import { onClickOutside } from '@vueuse/core'
import type { Address, Location } from '../stores/types'
import { storeToRefs } from 'pinia'

const isDialogOpen = ref(false)

const locationStore = useLocationStore()
const { locations, locationsError, selectedLocation, selectedLocationName } =
  storeToRefs(locationStore)
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

function navigateToSelectedCity(location: Location, locationName: string) {
  selectedLocation.value = location
  locations.value = null
  selectedLocationName.value = locationName
  locationsQuery.value = locationName
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
  <header class="bg-weather-primary sticky top-0 shadow-lg z-10">
    <nav class="container text-white py-6 flex justify-between items-center gap-4">
      <div class="flex flex-1 items-center gap-6 lg:flex-none lg:basis-3/4">
        <RouterLink :to="{ name: RouteName.Home }" class="flex items-center gap-2">
          <SunIcon class="w-7 h-7 text-yellow-400" />
          <span class="text-lg font-bold hidden md:block">Weather Application</span>
        </RouterLink>
        <div ref="target" class="relative flex-1">
          <input
            v-model="locationsQuery"
            class="py-2 text-white px-2 w-full bg-transparent border-2 rounded-lg focus:border-weather-secondary focus:outline-none"
            type="text"
            placeholder="Enter a location"
            @input="fetchLocations"
            @click="closeList = false"
          />
          <div
            v-if="(locations || locationsError) && !closeList"
            class="absolute bg-weather-primary rounded-lg text-white w-full shadow-md py-2 px-1 mt-2 border-2 border-weather-secondary"
          >
            <p v-if="locationsError" class="py-2 px-2">There was an error, please try again.</p>
            <p v-if="!locationsError && locations?.length === 0" class="py-2 px-2">
              No results found, please try another location.
            </p>
            <ul v-else class="flex flex-col gap-2 px-1">
              <li
                v-for="location in locations"
                :key="location.place_id"
                class="py-2 px-2 cursor-pointer border-2 hover:bg-weather-secondary/40 rounded-lg"
                @click="navigateToSelectedCity(location, formatAddress(location.address))"
              >
                {{ formatAddress(location.address) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
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
