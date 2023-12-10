<script setup lang="ts">
import { computed } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import VButtonIcon from '@/components/action-components/VButtonIcon.vue'

defineOptions({
  inheritAttrs: false
})

export interface VDialogProps {
  modelValue: boolean
  static?: boolean
}

const props = withDefaults(defineProps<VDialogProps>(), {
  modelValue: false,
  static: false
})

const showDialog = computed({
  get() {
    return props.modelValue
  },
  set(newValue: boolean) {
    emit('update:modelValue', newValue)
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <TransitionRoot appear :show="showDialog" as="template">
    <Dialog
      as="div"
      :static="static"
      class="relative z-10"
      @close="!static ? (showDialog = false) : null"
    >
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="relative min-w-[200px] transform rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all sm:min-w-[450px]"
              v-bind="$attrs"
            >
              <div v-if="!static" class="absolute right-1 top-1 z-10">
                <VButtonIcon @click="showDialog = false">
                  <XMarkIcon class="h-5 w-5"></XMarkIcon>
                </VButtonIcon>
              </div>
              <slot></slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
