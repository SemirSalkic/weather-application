<script setup lang="ts">
import CityWeatherCard from '@/components/CityWeatherCard.vue'
import { useLocationStore } from '@/stores/location'
import type { ForecastList } from '@/stores/types'
import { useWeatherStore } from '@/stores/weather'
import { storeToRefs } from 'pinia'
import { onMounted, computed, watch } from 'vue'

const weatherStore = useWeatherStore()
const { forecastData, currentWeatherData } = storeToRefs(weatherStore)
const { selectedLocation, selectedLocationName } = storeToRefs(useLocationStore())

// Computed property to group forecast items by date
const sortedForecast = computed(() => {
  if (forecastData.value?.list) {
    // Reduce the forecast list to group items by date
    return forecastData.value.list.reduce(
      (acc: Record<string, ForecastList[]>, curr: ForecastList) => {
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
  <div class="flex flex-col items-center bg-weather-secondary px-4 py-8 text-white">
    <CityWeatherCard
      v-if="currentWeatherData && selectedLocation && selectedLocationName"
      :location="selectedLocation"
      :location-name="selectedLocationName"
      :current-weather="currentWeatherData"
    />
    <div v-if="forecastData">
      <h3 class="mb-4 text-xl font-semibold">5-Day Forecast</h3>
      <ul>
        <li v-for="(forecast, indexForecast) in sortedForecast" :key="indexForecast">
          <p>{{ indexForecast }}</p>
          <ul>
            <li v-for="(subItem, index) in forecast" :key="index">
              {{ subItem.dt_txt }} - {{ Math.round(subItem.main.temp) }} °C -
              {{ subItem.weather[0].description }} - Feels like:
              {{ Math.round(subItem.main.feels_like) }} °C
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
