<script setup lang="ts">
import CityWeatherCard from '@/components/CityWeatherCard.vue'
import { useWeatherStore } from '@/stores/weather'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import LoadAnimation from '@/assets/svg/LoadAnimation.vue'
import InformationContainer from '@/components/InformationContainer.vue'

const weatherStore = useWeatherStore()
const { locationWeatherList } = storeToRefs(weatherStore)
const loading = ref(false)

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
  loading.value = true
  await updateLocationWeatherList()
  loading.value = false
})
</script>

<template>
  <div class="mt-8">
    <div v-if="loading" class="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <LoadAnimation class="h-16 w-16"></LoadAnimation>
    </div>
    <div v-else class="flex flex-col">
      <div v-if="locationWeatherList.length === 0" class="px-4">
        <InformationContainer
          class="container text-white"
          title="You haven't added any locations to your favorites yet. Start exploring and add some!"
        ></InformationContainer>
      </div>
      <div
        v-for="item in locationWeatherList"
        v-else
        :key="item.cityWeatherData.id"
        class="mx-4 mb-6"
      >
        <CityWeatherCard
          :location="item.locationData"
          :current-weather="item.cityWeatherData"
          :location-name="item.locationName"
          :is-clickable="true"
        />
      </div>
    </div>
  </div>
</template>
