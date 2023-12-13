<script setup lang="ts">
import { PlusCircleIcon, MinusCircleIcon, SunIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="p-6">
    <p class="text-center text-3xl font-semibold">Welcome to our weather application</p>
    <p class="mt-4 text-lg">
      This weather application, built with Vue 3, TypeScript, and Tailwind, offers a user-friendly
      platform to keep track of the weather conditions in your favorite cities.
    </p>
    <p class="mt-4 text-2xl font-semibold">How it Works:</p>
    <ol class="mt-2 flex list-decimal flex-col gap-2 text-lg">
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
        the <PlusCircleIcon class="inline h-6 w-6"></PlusCircleIcon> icon located at the top right
        corner of the current weather card. This action will add the city to your favorites on the
        home page, allowing you to access its weather information anytime.
      </li>
      <li>
        <strong>Removing a City:</strong> If you decide to stop tracking a city, you can do it from
        either the home page or while looking at a specific city.
        <ul class="list-inside list-disc">
          <li>
            <strong>From the Home Page:</strong> Look for the city card of the city you want to
            remove. In the top right corner of the city card, you'll see a
            <MinusCircleIcon class="inline h-6 w-6" h-6 w-6”></MinusCircleIcon> icon. Simply click
            on this icon to stop tracking the city.
          </li>
          <li>
            <strong>From a Specific City's Page:</strong> If you're currently viewing a specific
            city's weather, you can also remove the city from there. Look for the
            <MinusCircleIcon class="inline h-6 w-6" h-6 w-6”></MinusCircleIcon> icon, located near
            the city's name in the top right corner of the city card. Clicking on this icon will
            stop tracking the city.
          </li>
        </ul>
      </li>
      <li>
        <strong>Navigating Back to the Home Page:</strong> To go back to the home page at any time,
        simply click on the "<SunIcon class="inline h-6 w-6" /> Weather Application" logo, located
        in the top left corner of the page. This will take you back to the home page where you can
        see all your tracked cities.
      </li>
    </ol>
    <p class="mt-6 text-lg">
      This application is designed to provide you with real-time weather updates and allows for easy
      navigation between your tracked cities. Enjoy staying ahead of the weather!
    </p>
  </div>
</template>
