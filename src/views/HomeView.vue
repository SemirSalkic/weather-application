<script setup lang="ts">
import CityWeatherCard from '@/components/CityWeatherCard.vue'
import { useWeatherStore } from '@/stores/weather'
import { storeToRefs } from 'pinia'

const { locationWeatherList } = storeToRefs(useWeatherStore())

//TODO: Dodaj klik na karticu
//TODO: Napravi refresh dugme i update API
</script>

<template>
  <div class="mt-8 flex flex-col gap-6">
    <div v-for="item in locationWeatherList" :key="item.cityWeatherData.id">
      <CityWeatherCard
        :selected-location-name="item.locationName"
        :current-weather="item.cityWeatherData"
        :is-clickable="true"
      />
    </div>
  </div>
</template>
