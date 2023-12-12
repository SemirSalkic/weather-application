<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: ''
  }
)
</script>

<template>
  <div class="rounded-lg bg-weather-primary px-2 py-2 text-center text-sm font-semibold md:text-lg">
    {{ title }}
  </div>
</template>
