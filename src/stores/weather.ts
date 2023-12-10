import axios from 'axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Forecast, WeatherData, WeatherDataWithLocation } from './types'
import { STORE_WEATHER, VITE_BASE_WEATHER_URL, VITE_OPENWEATHER_API_KEY } from '@/util/const'
import { useLocalStorage } from '@vueuse/core'

export const useWeatherStore = defineStore(STORE_WEATHER, () => {
  const currentWeatherData = ref<WeatherData | null>(null)
  const forecastData = ref<Forecast | null>(null)
  const locationWeatherList = useLocalStorage<WeatherDataWithLocation[]>(
    'weatherDataWithLocationList',
    []
  )

  function removeLocationWeatherItem(id: number) {
    locationWeatherList.value = locationWeatherList.value?.filter(
      (item) => item.cityWeatherData.id !== id
    )
  }

  function addLocationWeatherItem(cityWeatherData: WeatherData, locationName: string) {
    const item = { cityWeatherData, locationName }
    locationWeatherList.value?.push(item)
  }

  async function fetchWeatherData(lat: string, lon: string) {
    if (!lat || !lon) return
    try {
      const res = await axios.get<WeatherData>(
        `${VITE_BASE_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${VITE_OPENWEATHER_API_KEY}`
      )
      currentWeatherData.value = res.data
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchForecastWeatherData(lat: string, lon: string) {
    if (!lat || !lon) return
    try {
      const res = await axios.get<Forecast>(
        `${VITE_BASE_WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${VITE_OPENWEATHER_API_KEY}`
      )
      forecastData.value = res.data
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    currentWeatherData,
    forecastData,
    locationWeatherList,
    addLocationWeatherItem,
    removeLocationWeatherItem,
    fetchWeatherData,
    fetchForecastWeatherData
  }
})
