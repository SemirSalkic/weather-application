import axios from 'axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Location } from './types'
import { StorageSerializers, useLocalStorage } from '@vueuse/core'
import { STORE_LOCATION, VITE_BASE_LOCATION_URL, VITE_LOCATIONIQ_API_KEY } from '@/util/const'

export const useLocationStore = defineStore(STORE_LOCATION, () => {
  const locations = ref<Location[] | null>(null)
  const locationsError = ref(false)
  const selectedLocationName = useLocalStorage<string>('selectedLocationName', '')

  // Selected location is stored in local storage and serialized as JSON because when storing a null value
  // it gets stored as an empty string not as null, hence we use object serializer
  const selectedLocation = useLocalStorage<Location | null>('selectedLocation', null, {
    serializer: StorageSerializers.object
  })

  async function fetchLocations(locationQuery: string, limit = 5) {
    locationsError.value = false
    if (!locationQuery) return
    try {
      const res = await axios.get<Location[]>(
        `${VITE_BASE_LOCATION_URL}/autocomplete?q=${locationQuery}&tag=place%3Aprovince%2Cplace%3Acity%2Cplace%3Atown%2Cplace%3Avillage&limit=${limit}&dedupe=1&key=${VITE_LOCATIONIQ_API_KEY}`
      )
      locations.value = res.data
      return res
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) locations.value = []
      else locationsError.value = true
      console.log(error)
    }
  }

  function $reset() {
    locations.value = null
    selectedLocation.value = null
    locationsError.value = false
  }

  return {
    locations,
    selectedLocationName,
    selectedLocation,
    locationsError,
    fetchLocations,
    $reset
  }
})
