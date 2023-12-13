<script setup lang="ts">
import type { ForecastListItem } from '@/stores/types'
import { timestampToTime, capitalizeFirstLetters } from '@/util'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    forecastData?: ForecastListItem
  }>(),
  {
    forecastData: undefined
  }
)

const iconUrl = computed(
  () => `http://openweathermap.org/img/wn/${props.forecastData?.weather[0].icon}.png`
)
const temperature = computed(() =>
  props.forecastData?.main?.temp ? Math.round(props.forecastData.main.temp) + '°C' : ''
)
const description = computed(() =>
  capitalizeFirstLetters(props.forecastData?.weather[0]?.description)
)
const humidity = computed(() => props.forecastData?.main?.humidity)
const windSpeed = computed(() => props.forecastData?.wind?.speed)
</script>

<template>
  <div class="my-4 rounded-lg bg-weather-primary px-2 py-2">
    <div
      class="grid grid-cols-5 items-center justify-around gap-2 rounded-lg bg-weather-secondary text-center"
    >
      <span class="text-xs font-semibold md:text-lg">{{ timestampToTime(forecastData?.dt) }}</span>
      <span class="text-xs font-semibold md:text-base">{{ temperature }}</span>
      <img class="h-auto w-16 justify-self-center" :src="iconUrl" :alt="description" />
      <span class="hidden text-xs md:block md:text-sm">{{ description }}</span>
      <div class="col-span-2 flex flex-col text-xs md:col-span-1 md:text-sm">
        <span>Humidity: {{ humidity }}%</span>
        <span>Wind Speed: {{ windSpeed }}km/h</span>
      </div>
    </div>
  </div>
</template>
