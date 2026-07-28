<script setup lang="ts">
import { useJsonFormsControl, rendererProps } from '@jsonforms/vue'
import type { ControlElement } from '@jsonforms/core'
import { computed } from 'vue'

const props = defineProps(rendererProps<ControlElement>())

const { control, handleChange } = useJsonFormsControl(props)

const modelValue = computed({
  get: () => control.value.data ?? false,
  set: (val: boolean) => handleChange(control.value.path, val)
})

const inputId = computed(() => `switch-${control.value.path.replace(/[^a-zA-Z0-9]/g, '-')}`)
</script>

<template>
  <div
    v-if="control.visible"
    class="mb-4 last:mb-0 w-full block"
  >
    <label
      :for="inputId"
      class="flex items-center justify-between w-full py-2 px-1 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30 cursor-pointer"
    >
      <div class="min-w-0 flex-1 pr-3">
        <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ control.label }}</span>
        <p
          v-if="control.description"
          class="text-xs text-gray-500 dark:text-gray-400 mt-0.5"
        >{{ control.description }}</p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span
          v-if="control.errors"
          class="text-xs text-red-500"
        >{{ control.errors }}</span>
        <USwitch
          :id="inputId"
          :model-value="modelValue"
          :disabled="!control.enabled"
          :readonly="control.readonly"
          color="primary"
          size="md"
          @update:model-value="modelValue = $event"
        />
      </div>
    </label>
  </div>
</template>
