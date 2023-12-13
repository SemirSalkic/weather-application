<script setup lang="ts">
import { computed, useSlots } from 'vue'
import LoadAnimation from '../../assets/svg/LoadAnimation.vue'

export interface VButtonProps {
  label?: string
  type?: ButtonType
  color?: 'white' | 'neutral' | 'error'
  disabled?: boolean
  loading?: boolean
}

export type ButtonType = 'button' | 'submit' | 'reset'

const props = withDefaults(defineProps<VButtonProps>(), {
  label: 'Continue',
  type: 'button',
  color: undefined,
  disabled: false,
  loading: false
})

const slots = useSlots()
const hasIcon = computed<boolean>(() => !!slots?.icon)

const white = computed(() => props.color === 'white')
const neutral = computed(() => props.color === 'neutral')
const error = computed(() => props.color === 'error')
const basic = computed(() => !props.color)
</script>

<template>
  <button
    :type="type"
    class="inline-flex justify-center rounded-full px-4 py-2 text-sm font-medium shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    :class="[
      {
        'border-slate-700 bg-white text-black hover:opacity-70 active:opacity-80': white
      },
      {
        'border-neutral-700 bg-neutral-600 text-white hover:bg-neutral-500 active:bg-neutral-600':
          neutral
      },
      {
        'border-red-700 bg-red-600 text-white hover:bg-red-500 active:bg-red-600': error
      },
      {
        ' border-weather-primary bg-weather-secondary text-white hover:opacity-80 active:opacity-90':
          basic
      }
    ]"
    :disabled="disabled"
  >
    <template v-if="hasIcon">
      <slot name="icon"> </slot>
    </template>
    <LoadAnimation v-if="loading" class="h-5 w-5"></LoadAnimation>
    <span v-else>
      {{ label }}
    </span>
  </button>
</template>
