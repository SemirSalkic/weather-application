<script setup lang="ts">
import { convertTimestampToDate, capitalizeFirstLetters } from '../util/index'
import type { WeatherData } from '@/stores/types'
import VButtonIcon from '@/components/action-components/VButtonIcon.vue'
import ConfirmationDialog from '@/components/action-components/ConfirmationDialog.vue'
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/vue/24/outline'
import { useWeatherStore } from '@/stores/weather'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    currentWeather: WeatherData
    selectedLocationName: string
    isClickable?: boolean
  }>(),
  {
    isClickable: false //TODO: Napravi da se moze kliknuti na karticu
  }
)

const weatherStore = useWeatherStore()
const { locationWeatherList } = storeToRefs(weatherStore)

const removeListItemDialog = ref(false)

const isInLocationWeatherList = computed(() => {
  if (!props.currentWeather) return false
  return locationWeatherList.value.some(
    (item) => item.cityWeatherData.id === props.currentWeather?.id
  )
})

function removeListItem() {
  weatherStore.removeLocationWeatherItem(props.currentWeather.id)
  removeListItemDialog.value = false
}
</script>

<template>
  <div
    v-if="currentWeather"
    class="container mx-auto rounded-lg bg-weather-primary px-4 py-4 text-white"
  >
    <div class="relative mb-2 flex flex-col rounded-lg bg-weather-secondary px-4 py-4">
      <span class="text-xl font-bold">{{ selectedLocationName }}</span>
      <span>Time: {{ convertTimestampToDate(currentWeather?.dt) }}</span>
      <div class="absolute right-2 top-3 flex">
        <VButtonIcon
          v-if="!isInLocationWeatherList"
          @click="weatherStore.addLocationWeatherItem(currentWeather, selectedLocationName)"
        >
          <PlusCircleIcon class="h-8 w-8"></PlusCircleIcon>
        </VButtonIcon>
        <VButtonIcon v-else @click="removeListItemDialog = true">
          <MinusCircleIcon class="h-8 w-8 hover:text-red-600"></MinusCircleIcon>
        </VButtonIcon>
      </div>
    </div>
    <div class="flex w-full items-center justify-around rounded-lg bg-weather-secondary px-4 py-4">
      <div class="flex flex-col items-center">
        <span class="text-4xl font-semibold"
          >{{ Math.round(currentWeather?.main.temp || 0) }}°C</span
        >
        <span>
          Min: {{ Math.round(currentWeather?.main.temp_min || 0) }}°C Max:
          {{ Math.round(currentWeather?.main.temp_max || 0) }}°C
        </span>
        <span>Feels like: {{ Math.round(currentWeather?.main.feels_like || 0) }}°C</span>
      </div>
      <div class="flex flex-col items-center">
        <img
          class="h-auto w-20"
          :src="`http://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}.png`"
          :alt="currentWeather?.weather[0].description"
        />
        <span class="text-lg">{{
          capitalizeFirstLetters(currentWeather?.weather[0].description)
        }}</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-sm">Clouds: {{ currentWeather?.clouds.all }}%</span>
        <span class="text-sm">Humidity: {{ currentWeather?.main.humidity }}%</span>
        <span class="text-sm">Visibility: {{ currentWeather?.visibility }}m</span>
        <span class="text-sm">Pressure: {{ currentWeather?.main.pressure }}hPa</span>
        <span class="text-sm">Wind Speed: {{ currentWeather?.wind.speed }}m/s</span>
      </div>
    </div>
  </div>

  <ConfirmationDialog
    v-model="removeListItemDialog"
    title="Are you sure you want to remove this location from your favorites?"
    @confirm="removeListItem()"
    @cancel="removeListItemDialog = false"
  >
    <template #content>
      <span>Location: {{ selectedLocationName }}</span>
    </template>
  </ConfirmationDialog>
</template>
