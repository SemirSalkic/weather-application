<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { SunIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'
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
const locationInput = ref()
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
  locations.value = null
  locationsError.value = false
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

function emptyLocationQuery() {
  locationsQuery.value = ''
  locations.value = null
  locationsError.value = false
  locationInput.value?.focus()
}

onClickOutside(target, () => (closeList.value = true))
</script>

<template>
  <header class="sticky top-0 z-10 bg-weather-primary shadow-lg">
    <nav class="container flex items-center justify-between gap-4 py-6 text-white">
      <div class="flex flex-1 items-center gap-6 lg:flex-none lg:basis-3/4">
        <RouterLink :to="{ name: RouteName.Home }" class="flex items-center gap-2">
          <SunIcon class="h-7 w-7 text-yellow-400" />
          <span class="hidden text-lg font-bold md:block">Weather Application</span>
        </RouterLink>
        <div ref="target" class="relative flex-1">
          <div class="relative">
            <input
              ref="locationInput"
              v-model="locationsQuery"
              name="location-input"
              class="w-full rounded-lg border-2 bg-transparent py-2 pl-2 pr-9 text-white focus:border-weather-secondary focus:outline-none"
              type="text"
              placeholder="Enter a location"
              @input="fetchLocations()"
              @click="closeList = false"
            />
            <VButtonIcon
              v-if="locationsQuery"
              class="absolute right-1 top-1/2 -translate-y-1/2 transform cursor-pointer text-white"
              @click="emptyLocationQuery()"
            >
              <XCircleIcon class="h-auto w-7" />
            </VButtonIcon>
          </div>
          <div
            v-if="(locations || locationsError) && !closeList"
            class="absolute mt-2 w-full rounded-lg border-2 border-weather-secondary bg-weather-primary px-1 py-2 text-white shadow-md"
          >
            <p v-if="locationsError" class="px-2 py-2">There was an error, please try again.</p>
            <p v-if="!locationsError && locations?.length === 0" class="px-2 py-2">
              No results found, please try another location.
            </p>
            <ul v-else class="flex flex-col gap-2 px-1">
              <li
                v-for="location in locations"
                :key="location.place_id"
                class="cursor-pointer rounded-lg border-2 px-2 py-2 hover:bg-weather-secondary/40"
                @click="navigateToSelectedCity(location, formatAddress(location.address))"
              >
                {{ formatAddress(location.address) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <VButtonIcon @click="isDialogOpen = true">
        <InformationCircleIcon class="h-7 w-7" />
      </VButtonIcon>
    </nav>
    <VDialog v-model="isDialogOpen" class="flex max-w-5xl flex-col gap-4 px-4 py-6">
      <AboutApplication></AboutApplication>
      <VButton
        class="w-52 self-center rounded-md"
        label="Close"
        @click="isDialogOpen = false"
      ></VButton>
    </VDialog>
  </header>
</template>
