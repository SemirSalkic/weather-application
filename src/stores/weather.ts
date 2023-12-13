import axios from 'axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Forecast, WeatherData, WeatherDataWithLocation, Location } from './types'
import { STORE_WEATHER, VITE_BASE_WEATHER_URL, VITE_OPENWEATHER_API_KEY } from '@/util/const'
import { useLocalStorage } from '@vueuse/core'

export const useWeatherStore = defineStore(STORE_WEATHER, () => {
  const currentWeatherData = ref<WeatherData | null>(null)
  const forecastData = ref<Forecast | null>(null)
  const locationWeatherList = useLocalStorage<WeatherDataWithLocation[]>(
    'weatherDataWithLocationList',
    []
  )

  function constructWeatherAPIUrl(endpoint: string, lat: string, lon: string) {
    return `${VITE_BASE_WEATHER_URL}/${endpoint}?lat=${lat}&lon=${lon}&units=metric&appid=${VITE_OPENWEATHER_API_KEY}`
  }

  function removeLocationWeatherItem(id: number) {
    locationWeatherList.value = locationWeatherList.value?.filter(
      (item) => item.cityWeatherData.id !== id
    )
  }

  function addLocationWeatherItem(
    locationData: Location,
    cityWeatherData: WeatherData,
    locationName: string
  ) {
    const itemExists = locationWeatherList.value?.some(
      (item) => item.cityWeatherData.id === cityWeatherData.id
    )
    if (itemExists) return
    const item = { locationData, cityWeatherData, locationName }
    locationWeatherList.value?.push(item)
  }

  async function fetchWeatherData(lat: string, lon: string) {
    if (!lat || !lon) return
    try {
      const res = await axios.get<WeatherData>(constructWeatherAPIUrl('weather', lat, lon))
      currentWeatherData.value = res.data
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchForecastWeatherData(lat: string, lon: string) {
    if (!lat || !lon) return
    try {
      const res = await axios.get<Forecast>(constructWeatherAPIUrl('forecast', lat, lon))
      forecastData.value = res.data
      return res.data
    } catch (error) {
      console.error(error)
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
