<script setup lang="ts">
import CityWeatherCard from '@/components/CityWeatherCard.vue'
import LoadAnimation from '@/assets/svg/LoadAnimation.vue'
import ForecastItem from '@/components/ForecastItem.vue'
import InformationContainer from '@/components/InformationContainer.vue'
import { useLocationStore } from '@/stores/location'
import type { ForecastListItem } from '@/stores/types'
import { useWeatherStore } from '@/stores/weather'
import { storeToRefs } from 'pinia'
import { computed, watch, ref } from 'vue'
import { formatAddress, formatDate } from '@/util'

const props = defineProps<{
  locationId: string
  locationName?: string
}>()

const weatherStore = useWeatherStore()
const locationStore = useLocationStore()
const { forecastData, currentWeatherData } = storeToRefs(weatherStore)
const { selectedLocation, selectedLocationName } = storeToRefs(locationStore)
const loading = ref(false)
const locationNotFound = ref(false)
const weatherDataNotFound = ref(false)

// Computed property to group forecast items by date
const sortedForecast = computed(() => {
  if (forecastData.value?.list) {
    // Reduce the forecast list to group items by date
    return forecastData.value.list.reduce(
      (acc: Record<string, ForecastListItem[]>, curr: ForecastListItem) => {
        // Extract the date part from the datetime string
        const date = curr.dt_txt.split(' ')[0]
        // Update the accumulator with the current forecast item
        acc[date] = [...(acc[date] || []), curr]
        return acc // Return the updated accumulator
      },
      {} // Initial value for the accumulator
    )
  }
  return {} // Return an empty object if forecast data is not available
})

async function fetchLocationData() {
  try {
    loading.value = true
    locationNotFound.value = false
    if (props.locationName && props.locationName !== selectedLocationName.value) {
      const location = (await locationStore.fetchLocations(props.locationName))?.find(
        (loc) => loc.place_id === props.locationId
      )

      selectedLocation.value = location || null
      selectedLocationName.value = location ? formatAddress(location.address) : ''
      locationNotFound.value = !location
    }
  } catch (error) {
    locationNotFound.value = true
  } finally {
    loading.value = false
  }
}

async function fetchWeatherData() {
  try {
    loading.value = true
    weatherDataNotFound.value = false
    if (!selectedLocation.value) return (weatherDataNotFound.value = true)
    const { lat, lon } = selectedLocation.value
    await Promise.all([
      weatherStore.fetchWeatherData(lat, lon),
      weatherStore.fetchForecastWeatherData(lat, lon)
    ])
  } catch (error) {
    weatherDataNotFound.value = true
  } finally {
    loading.value = false
  }
}

watch(
  () => props.locationName,
  async () => {
    await fetchLocationData()
    await fetchWeatherData()
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="loading" class="fixed left-0 top-0 flex h-full w-full items-center justify-center">
    <LoadAnimation class="h-16 w-16"></LoadAnimation>
  </div>
  <InformationContainer
    v-else-if="!loading && (locationNotFound || weatherDataNotFound)"
    class="container mt-8 text-white"
    :title="
      (locationNotFound ? 'Location data not found! ' : 'Weather data not found! ') +
      'Please go back to the home page or use the search bar to find another location.'
    "
  ></InformationContainer>
  <div v-else class="flex flex-col items-center gap-4 bg-weather-secondary px-4 py-8 text-white">
    <CityWeatherCard
      v-if="currentWeatherData && selectedLocation && selectedLocationName"
      :location="selectedLocation"
      :location-name="selectedLocationName"
      :current-weather="currentWeatherData"
    />
    <div v-if="forecastData" class="container">
      <div v-for="(forecast, indexForecast) in sortedForecast" :key="indexForecast">
        <InformationContainer :title="formatDate(indexForecast)"></InformationContainer>
        <div v-for="(subItem, index) in forecast" :key="index">
          <ForecastItem :forecast-data="subItem"></ForecastItem>
        </div>
      </div>
    </div>
  </div>
</template>
