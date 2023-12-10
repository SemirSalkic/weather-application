// Location interface
export interface Location {
  place_id: string
  osm_id: string
  osm_type: string
  licence: string
  lat: string
  lon: string
  boundingbox: string[]
  class: string
  type: string
  display_name: string
  display_place: string
  display_address: string
  address: Address
}

export interface Address {
  name: string
  state: string
  postcode: string
  country: string
  country_code: string
  county: string
  suburb: string
}

// Weather interface
export interface WeatherData {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  rain: Rain
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

export interface Coord {
  lon: number
  lat: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}

export interface Wind {
  speed: number
  deg: number
  gust: number
}

export interface Rain {
  '1h': number
}

export interface Clouds {
  all: number
}

export interface Sys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

// Forecast interface
export interface Forecast {
  cod: string
  message: number
  cnt: number
  list: ForecastListItem[]
  city: City
}

export interface ForecastListItem {
  dt: number
  main: MainForecast
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  rain?: RainForecast
  sys: SysForecast
  dt_txt: string
}

export interface RainForecast {
  '3h': number
}

export interface MainForecast {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  sea_level: number
  grnd_level: number
  humidity: number
  temp_kf: number
}

export interface SysForecast {
  pod: string
}

export interface City {
  id: number
  name: string
  coord: Coord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export interface WeatherDataWithLocation {
  locationData: Location
  cityWeatherData: WeatherData
  locationName: string
}
