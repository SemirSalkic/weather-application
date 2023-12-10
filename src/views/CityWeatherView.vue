<script setup lang="ts">
import CityWeatherCard from '@/components/CityWeatherCard.vue'
import ForecastItem from '@/components/ForecastItem.vue'
import { useLocationStore } from '@/stores/location'
import type { ForecastListItem } from '@/stores/types'
import { useWeatherStore } from '@/stores/weather'
import { storeToRefs } from 'pinia'
import { onMounted, computed, watch } from 'vue'
import { formatDate } from '@/util'

const weatherStore = useWeatherStore()
const { forecastData, currentWeatherData } = storeToRefs(weatherStore)
const { selectedLocation, selectedLocationName } = storeToRefs(useLocationStore())

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

async function fetchWeatherAndForecastData() {
  await weatherStore.fetchWeatherData(
    selectedLocation.value?.lat || '',
    selectedLocation.value?.lon || ''
  )
  await weatherStore.fetchForecastWeatherData(
    selectedLocation.value?.lat || '',
    selectedLocation.value?.lon || ''
  )
}

onMounted(async () => {
  await fetchWeatherAndForecastData()
})

watch(selectedLocationName, async () => {
  await fetchWeatherAndForecastData()
})
</script>

<template>
  <div class="flex flex-col items-center gap-4 bg-weather-secondary px-4 py-8 text-white">
    <CityWeatherCard
      v-if="currentWeatherData && selectedLocation && selectedLocationName"
      :location="selectedLocation"
      :location-name="selectedLocationName"
      :current-weather="currentWeatherData"
    />
    <div v-if="forecastData" class="container">
      <div v-for="(forecast, indexForecast) in sortedForecast" :key="indexForecast">
        <ForecastItem :title="formatDate(indexForecast)"></ForecastItem>
        <div v-for="(subItem, index) in forecast" :key="index">
          <ForecastItem :forecast-data="subItem"></ForecastItem>
        </div>
      </div>
    </div>
  </div>
</template>
