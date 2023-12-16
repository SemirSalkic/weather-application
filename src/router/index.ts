import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityWeatherView from '../views/CityWeatherView.vue'
import PageNotFoundView from '../views/PageNotFoundView.vue'

export const enum RouteName {
  Home = 'Home',
  CityWeatherView = 'CityWeatherView',
  PageNotFound = 'PageNotFound'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.Home,
      component: HomeView
    },
    {
      path: '/city-weather-view/:country/:city',
      name: RouteName.CityWeatherView,
      component: CityWeatherView,
      props: (route) => ({
        locationId: route.query.locationId,
        locationName: route.query.locationName
      })
    },
    {
      path: '/:pathMatch(.*)*',
      component: PageNotFoundView
    }
  ]
})

export default router
