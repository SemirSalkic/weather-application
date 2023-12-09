<template>
  <div class="bg-weather-primary container mx-auto rounded-lg px-4 py-4">
    <div class="flex flex-col mb-2 bg-weather-secondary px-4 py-4 rounded-lg">
      <span class="text-xl font-bold">{{ selectedLocationName }}</span>
      <span>Time: {{ convertTimestampToDate(currentWeather?.dt) }}</span>
    </div>
    <div class="flex justify-around items-center w-full bg-weather-secondary px-4 py-4 rounded-lg">
      <div class="flex flex-col">
        <span class="text-4xl font-semibold"
          >{{ Math.round(currentWeather?.main.temp || 0) }}°C</span
        >
        <div>
          {{ Math.round(currentWeather?.main.temp_min || 0) }}°C -
          {{ Math.round(currentWeather?.main.temp_max || 0) }}°C
        </div>
        <span>Feels like: {{ Math.round(currentWeather?.main.feels_like || 0) }}°C</span>
      </div>
      <div class="flex flex-col items-center">
        <img
          class="w-20 h-auto"
          :src="`http://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}.png`"
          :alt="currentWeather?.weather[0].description"
        />
        <span class="text-lg">{{
          capitalizeFirstLetters(currentWeather?.weather[0].description)
        }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-sm">Humidity : {{ currentWeather?.main.humidity }}%</span>
        <span class="text-sm">Wind Speed: {{ currentWeather?.wind.speed }} m/s</span>
        <span class="text-sm">Pressure: {{ currentWeather?.main.pressure }} hPa</span>
        <span class="text-sm">Visibility: {{ currentWeather?.visibility }} m</span>
        <span class="text-sm">Clouds: {{ currentWeather?.clouds.all }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertTimestampToDate, capitalizeFirstLetters } from '../util/index'
import type { WeatherData } from '@/stores/types'

defineProps<{
  selectedLocationName: string
  currentWeather: WeatherData | null
}>()

//TODO: Dodaj ikone + ili - u zavisnosti da li se ovo vec nalazi u sacuvanoj listi []
</script>
