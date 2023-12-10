<script setup lang="ts">
import { computed } from 'vue'
import VDialog from '@/components/action-components/VDialog.vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    confirmText?: string
    disabledConfirm?: boolean
  }>(),
  {
    confirmText: 'Confirm',
    disabledConfirm: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const showDialog = computed({
  get() {
    return props.modelValue
  },
  set(newValue: boolean) {
    emit('update:modelValue', newValue)
  }
})
</script>

<template>
  <VDialog v-model="showDialog" :static="true">
    <div class="grid gap-4">
      <span class="mb-2 text-lg font-medium text-black pr-6">
        {{ title }}
      </span>
      <slot name="content"></slot>
      <div class="flex justify-end">
        <button
          class="mr-4 rounded-lg bg-weather-secondary px-4 py-2 text-white hover:bg-opacity-80 active:bg-opacity-70"
          @click="emit('cancel')"
        >
          Cancel
        </button>
        <button
          class="rounded-lg bg-red-700 px-4 py-2 text-white hover:bg-opacity-80 disabled:pointer-events-none disabled:opacity-50 active:bg-opacity-70"
          :disabled="disabledConfirm"
          @click="emit('confirm')"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </VDialog>
</template>
