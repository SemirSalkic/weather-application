<script setup lang="ts">
import CityWeatherCard from '@/components/CityWeatherCard.vue'
import { useWeatherStore } from '@/stores/weather'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const weatherStore = useWeatherStore()
const { locationWeatherList } = storeToRefs(weatherStore)

async function updateLocationWeatherList() {
  const fetchPromises = locationWeatherList.value.map((item) =>
    weatherStore.fetchWeatherData(item.locationData.lat, item.locationData.lon)
  )
  // Wait for all fetch operations to complete
  const fetchedWeatherDataList = await Promise.all(fetchPromises)
  fetchedWeatherDataList.forEach((fetchedWeatherData) => {
    if (fetchedWeatherData) {
      // Find the item that has the same id
      const item = locationWeatherList.value.find(
        (item) => item.cityWeatherData.id === fetchedWeatherData.id
      )
      // If an item was found, update it
      if (item) {
        item.cityWeatherData = fetchedWeatherData
      }
    }
  })
}

onMounted(async () => {
  await updateLocationWeatherList()
})
</script>

<template>
  <div class="mt-8 flex flex-col gap-6">
    <div v-for="item in locationWeatherList" :key="item.cityWeatherData.id">
      <CityWeatherCard
        :location="item.locationData"
        :current-weather="item.cityWeatherData"
        :location-name="item.locationName"
        :is-clickable="true"
      />
    </div>
  </div>
</template>
