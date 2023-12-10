<template>
  <div class="my-4 rounded-lg bg-weather-primary px-2 py-2">
    <div
      v-if="!title"
      class="flex items-center justify-around gap-2 rounded-lg bg-weather-secondary px-2 text-center"
    >
      <span class="font-semibold md:text-lg">{{ timestampToTime(forecastData?.dt) }}</span>
      <span class="text-sm">{{
        forecastData?.main?.temp ? Math.round(forecastData.main.temp) + '°C' : ''
      }}</span>
      <span class="text-sm md:w-1/5">{{
        capitalizeFirstLetters(forecastData?.weather[0]?.description)
      }}</span>
      <div class="flex flex-col md:w-1/4">
        <span class="text-sm">Humidity: {{ forecastData?.main?.humidity }}%</span>
        <span class="text-sm">Wind Speed: {{ forecastData?.wind?.speed }}km/h</span>
      </div>
    </div>
    <div v-else class="text-center text-lg font-semibold">
      {{ title }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ForecastListItem } from '@/stores/types'
import { capitalizeFirstLetters, timestampToTime } from '@/util'

withDefaults(
  defineProps<{
    forecastData?: ForecastListItem
    title?: string
  }>(),
  {
    forecastData: undefined,
    title: ''
  }
)
</script>
