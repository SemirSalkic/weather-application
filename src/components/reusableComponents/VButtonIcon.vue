<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  {
    disabled: false
  }
)

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    v-bind="$attrs"
    type="button"
    class="grid h-8 w-8 place-items-center rounded-full hover:cursor-pointer hover:opacity-60 active:opacity-80 disabled:pointer-events-none disabled:opacity-50"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style scoped></style>
