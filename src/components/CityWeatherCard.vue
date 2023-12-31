<script setup lang="ts">
import { timestampToDateTime, capitalizeFirstLetters } from '../util/index'
import type { WeatherData, Location } from '@/stores/types'
import VButtonIcon from '@/components/reusable-components/VButtonIcon.vue'
import ConfirmationDialog from '@/components/reusable-components/ConfirmationDialog.vue'
import { PlusCircleIcon, MinusCircleIcon, ArrowRightCircleIcon } from '@heroicons/vue/24/outline'
import { useWeatherStore } from '@/stores/weather'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useLocationStore } from '@/stores/location'
import router, { RouteName } from '@/router'

const props = withDefaults(
  defineProps<{
    currentWeather: WeatherData
    location: Location
    locationName: string
    isClickable?: boolean
  }>(),
  {
    isClickable: false
  }
)

const weatherStore = useWeatherStore()
const { locationWeatherList } = storeToRefs(weatherStore)
const { selectedLocation, selectedLocationName } = storeToRefs(useLocationStore())

const removeListItemDialog = ref(false)

const formatTemperature = (temp: number) => Math.round(temp || 0) + '°C'

const temp = computed(() => formatTemperature(props.currentWeather?.main.temp))
const tempMin = computed(() => 'Min: ' + formatTemperature(props.currentWeather?.main.temp_min))
const tempMax = computed(() => 'Max: ' + formatTemperature(props.currentWeather?.main.temp_max))
const feelsLike = computed(
  () => 'Feels like: ' + formatTemperature(props.currentWeather?.main.feels_like)
)

const addLocationWeatherItem = () => {
  weatherStore.addLocationWeatherItem(
    props.location,
    props.currentWeather,
    selectedLocationName.value
  )
}

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

function navigateToSelectedCity() {
  selectedLocation.value = props.location
  selectedLocationName.value = props.locationName
  const country = props.location.address.country.replace(/\s/g, '-').toLocaleLowerCase()
  const city = props.location.address.name.replace(/\s/g, '-').toLocaleLowerCase()
  router.push({
    name: RouteName.CityWeatherView,
    params: { country: country, city: city },
    query: {
      locationId: props.location.place_id,
      locationName: props.locationName
    }
  })
}
</script>

<template>
  <div
    v-if="currentWeather"
    class="container mx-auto rounded-lg bg-weather-primary px-4 py-4 text-white"
  >
    <div class="mb-2 flex flex-col rounded-lg bg-weather-secondary px-4 py-4">
      <div class="flex items-start justify-between">
        <span class="text-xl font-bold">{{ locationName }}</span>
        <div class="flex">
          <VButtonIcon v-if="!isInLocationWeatherList" @click="addLocationWeatherItem">
            <PlusCircleIcon class="h-8 w-8"></PlusCircleIcon>
          </VButtonIcon>
          <VButtonIcon v-else @click="removeListItemDialog = true">
            <MinusCircleIcon class="h-8 w-8 hover:text-red-600"></MinusCircleIcon>
          </VButtonIcon>
          <VButtonIcon v-if="isClickable" @click="navigateToSelectedCity">
            <ArrowRightCircleIcon class="h-8 w-8"></ArrowRightCircleIcon>
          </VButtonIcon>
        </div>
      </div>
      <span>Time: {{ timestampToDateTime(currentWeather?.dt) }}</span>
    </div>
    <div class="flex items-end justify-around rounded-lg bg-weather-secondary py-4 text-center">
      <div class="flex flex-col text-xs md:text-base">
        <span class="text-base font-semibold md:text-4xl">{{ temp }}</span>
        <span class="flex flex-col">
          <span>{{ tempMin }}</span>
          <span>{{ tempMax }}</span>
        </span>
        <span>{{ feelsLike }}</span>
      </div>
      <div class="flex flex-col items-center">
        <img
          class="h-auto w-16 md:w-20"
          :src="`http://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}.png`"
          :alt="currentWeather?.weather[0].description"
        />
        <span class="text-xs md:text-lg">{{
          capitalizeFirstLetters(currentWeather?.weather[0].description)
        }}</span>
      </div>
      <div class="flex flex-col text-xs md:text-sm">
        <span>Clouds: {{ currentWeather?.clouds.all }}%</span>
        <span>Humidity: {{ currentWeather?.main.humidity }}%</span>
        <span>Visibility: {{ currentWeather?.visibility }}m</span>
        <span>Pressure: {{ currentWeather?.main.pressure }}hPa</span>
        <span>Wind Speed: {{ currentWeather?.wind.speed }}m/s</span>
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
