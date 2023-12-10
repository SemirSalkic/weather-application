<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="p-6">
    <p class="text-3xl font-semibold text-center">Welcome to our weather application</p>
    <p class="mt-4 text-lg">
      This weather application, built with Vue 3, TypeScript, and Tailwind, offers a user-friendly
      platform to keep track of the weather conditions in your favorite cities.
    </p>
    <p class="mt-4 text-2xl font-semibold">How it Works:</p>
    <ol class="list-decimal list-inside mt-2 text-lg flex flex-col gap-2">
      <li>
        <strong>City Search:</strong> Begin by typing the name of the city you're interested into
        the search bar. Our application will provide a list of matching results.
      </li>
      <li>
        <strong>Weather Overview:</strong> Click on your desired city from the search results. This
        will redirect you to a detailed page showing the current weather conditions of the selected
        city.
      </li>
      <li>
        <strong>City Tracking:</strong> To keep an eye on the weather of a particular city, click on
        the <PlusCircleIcon class="w-6 h-6 inline"></PlusCircleIcon> icon located at the top right
        corner of the page. This action will add the city to your personalized list on the home
        page, allowing you to access its weather information anytime.
      </li>
      <li>
        <strong>Removing a City:</strong> If you decide to stop tracking a city, simply go to the
        home page, select the city, and scroll down to the bottom of the page. You'll find an option
        to remove the city from your list.
      </li>
    </ol>
    <p class="mt-6 text-lg">
      This application is designed to provide you with real-time weather updates and allows for easy
      navigation between your tracked cities. Enjoy staying ahead of the weather!
    </p>
  </div>
</template>
