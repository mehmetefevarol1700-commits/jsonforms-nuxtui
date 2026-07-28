<script setup lang="ts">
import { useJsonFormsControl, rendererProps } from '@jsonforms/vue'
import type { ControlElement } from '@jsonforms/core'
import { computed } from 'vue'

const props = defineProps(rendererProps<ControlElement>())

const { control, handleChange } = useJsonFormsControl(props)

const colorValue = computed({
  get: () => control.value.data ?? '#3B82F6',
  set: (val: string) => handleChange(control.value.path, val)
})

const inputId = computed(() => `colorpicker-${control.value.path.replace(/[^a-zA-Z0-9]/g, '-')}`)
</script>

<template>
  <UFormField
    v-if="control.visible"
    :label="control.label"
    :error="control.errors || undefined"
    :required="control.required"
    :description="control.description || undefined"
    class="mb-4 last:mb-0 w-full block"
    :ui="{ container: 'space-y-2' }"
  >
    <div class="flex items-center gap-4 flex-wrap">
      <input
        :id="inputId"
        type="color"
        :value="colorValue"
        :disabled="!control.enabled"
        :readonly="control.readonly"
        class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transition-transform hover:scale-105 p-0.5 bg-white dark:bg-gray-800"
        @input="colorValue = ($event.target as HTMLInputElement).value"
      >
      <div class="flex-1 min-w-0">
        <UInput
          :model-value="colorValue"
          :disabled="!control.enabled"
          :readonly="control.readonly"
          class="font-mono text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-lg px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          placeholder="#RRGGBB"
          @update:model-value="colorValue = $event"
        />
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          HEX format (e.g., #3B82F6)
        </p>
      </div>
    </div>
  </UFormField>
</template>
