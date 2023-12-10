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

<template>
  <div class="my-4 rounded-lg bg-weather-primary px-2 py-2">
    <div
      v-if="!title"
      class="grid grid-cols-5 items-center justify-around gap-2 rounded-lg bg-weather-secondary px-2 text-center"
    >
      <span class="font-semibold md:text-lg">{{ timestampToTime(forecastData?.dt) }}</span>
      <span class="font-semibold">{{
        forecastData?.main?.temp ? Math.round(forecastData.main.temp) + '°C' : ''
      }}</span>
      <span class="text-sm">{{
        capitalizeFirstLetters(forecastData?.weather[0]?.description)
      }}</span>
      <div class="col-span-2 flex flex-col">
        <span class="text-sm">Humidity: {{ forecastData?.main?.humidity }}%</span>
        <span class="text-sm">Wind Speed: {{ forecastData?.wind?.speed }}km/h</span>
      </div>
    </div>
    <div v-else class="text-center text-lg font-semibold">
      {{ title }}
    </div>
  </div>
</template>
