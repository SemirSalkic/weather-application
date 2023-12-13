<script setup lang="ts">
import { computed } from 'vue'
import VDialog from '@/components/action-components/VDialog.vue'
import VButton from '@/components/action-components/VButton.vue'

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
      <span class="mb-2 pr-6 text-lg font-medium text-black">
        {{ title }}
      </span>
      <slot name="content"></slot>
      <div class="flex justify-end gap-2">
        <VButton class="self-center rounded-md" label="Cancel" @click="emit('cancel')"></VButton>
        <VButton
          class="self-center rounded-md"
          color="error"
          :label="confirmText"
          :disabled="disabledConfirm"
          @click="emit('confirm')"
        ></VButton>
      </div>
    </div>
  </VDialog>
</template>
