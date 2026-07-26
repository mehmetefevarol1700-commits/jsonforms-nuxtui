<script setup lang="ts">
import { useJsonFormsControl, rendererProps } from '@jsonforms/vue'
import type { ControlElement } from '@jsonforms/core'
import { computed } from 'vue'

const props = defineProps(rendererProps<ControlElement>())

const { control, handleChange } = useJsonFormsControl(props)

const isRange = computed(() => control.value.uischema?.options?.range === true || Array.isArray(control.value.data))

const singleValue = computed({
  get: () => control.value.data ?? 0,
  set: (val: number) => handleChange(control.value.path, val)
})

const rangeValue = computed({
  get: () => control.value.data ?? [0, 100],
  set: (val: number[]) => handleChange(control.value.path, val)
})

const min = computed(() => control.value.schema?.minimum ?? 0)
const max = computed(() => control.value.schema?.maximum ?? 100)
const step = computed(() => control.value.schema?.multipleOf ?? 1)

const inputId = computed(() => `slider-${control.value.path.replace(/[^a-zA-Z0-9]/g, '-')}`)
</script>

<template>
  <UFormField
    v-if="control.visible"
    :label="control.label"
    :error="control.errors || undefined"
    :required="control.required"
    :description="control.description || undefined"
    class="mb-4 last:mb-0 w-full block"
    :ui="{ container: 'space-y-3' }"
  >
    <template #help>
      <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{{ isRange ? rangeValue.map(v => Number(v.toFixed(1))).join(' - ') : Number(singleValue.toFixed(1)) }}</span>
        <span>{{ min }} - {{ max }}</span>
      </div>
    </template>

    <div class="relative">
      <USlider
        v-if="!isRange"
        :id="inputId"
        :model-value="singleValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="!control.enabled"
        class="w-full"
        color="primary"
        @update:model-value="singleValue = $event"
        :ui="{
          rail: 'h-2 rounded-full bg-gray-200 dark:bg-gray-700',
          track: 'h-2 rounded-full bg-primary-500',
          thumb: 'w-5 h-5 rounded-full bg-white border-2 border-primary-500 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
          tick: 'h-1 rounded bg-gray-300 dark:bg-gray-600'
        }"
      />

      <USlider
        v-else
        :id="inputId"
        :model-value="rangeValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="!control.enabled"
        class="w-full"
        color="primary"
        range
        @update:model-value="rangeValue = $event"
        :ui="{
          rail: 'h-2 rounded-full bg-gray-200 dark:bg-gray-700',
          track: 'h-2 rounded-full bg-primary-500',
          thumb: 'w-5 h-5 rounded-full bg-white border-2 border-primary-500 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
          tick: 'h-1 rounded bg-gray-300 dark:bg-gray-600'
        }"
      />
    </div>
  </UFormField>
</template>