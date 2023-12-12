<script setup lang="ts">
import type { ForecastListItem } from '@/stores/types'
import { capitalizeFirstLetters, timestampToTime } from '@/util'

withDefaults(
  defineProps<{
    forecastData?: ForecastListItem
  }>(),
  {
    forecastData: undefined
  }
)
</script>

<template>
  <div class="my-4 rounded-lg bg-weather-primary px-2 py-2">
    <div
      class="grid grid-cols-5 items-center justify-around gap-2 rounded-lg bg-weather-secondary text-center"
    >
      <span class="text-xs font-semibold md:text-lg">{{ timestampToTime(forecastData?.dt) }}</span>
      <span class="text-xs font-semibold md:text-base">{{
        forecastData?.main?.temp ? Math.round(forecastData.main.temp) + '°C' : ''
      }}</span>
      <span class="text-xs md:text-sm">{{
        capitalizeFirstLetters(forecastData?.weather[0]?.description)
      }}</span>
      <div class="col-span-2 flex flex-col text-xs md:text-sm">
        <span>Humidity: {{ forecastData?.main?.humidity }}%</span>
        <span>Wind Speed: {{ forecastData?.wind?.speed }}km/h</span>
      </div>
    </div>
  </div>
</template>
