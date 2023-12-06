import axios from 'axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Location } from './types'

export const useLocationStore = defineStore('location', () => {
  const locations = ref<Location[] | null>(null)
  const locationsError = ref(false)
  async function fetchLocations(locationQuery: string, limit = 5) {
    locations.value = null
    try {
      const res = await axios.get<Location[]>(
        `https://us1.locationiq.com/v1/autocomplete?q=${locationQuery}&tag=place%3Acity%2C%20place%3Atown%2C%20place%3Avillage&limit=${limit}&dedupe=1&key=${
          import.meta.env.VITE_LOCATIONIQ_API_KEY
        }`
      )
      locations.value = res.data
      return res
    } catch (error) {
      locationsError.value = true
      console.log(error)
    }
  }

  return { locations, locationsError, fetchLocations }
})
