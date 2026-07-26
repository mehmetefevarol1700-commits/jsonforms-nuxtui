<script setup lang="ts">
import { useJsonFormsControl, rendererProps } from '@jsonforms/vue'
import type { ControlElement } from '@jsonforms/core'
import { computed } from 'vue'

const props = defineProps(rendererProps<ControlElement>())

const { control, handleChange } = useJsonFormsControl(props)

const inputValue = computed({
  get: () => {
    const d = control.value.data
    if (d === null || d === undefined) return ''
    return String(d)
  },
  set: (val: string) => {
    const trimmed = val.trim()
    if (trimmed === '') {
      handleChange(control.value.path, null)
      return
    }
    const num = Number(trimmed)
    if (!isNaN(num)) handleChange(control.value.path, num)
  }
})

const inputId = computed(() => `input-${control.value.path.replace(/[^a-zA-Z0-9]/g, '-')}`)
const min = computed(() => control.value.schema?.minimum)
const max = computed(() => control.value.schema?.maximum)
const step = computed(() => control.value.schema?.multipleOf || 1)
</script>

<template>
  <UFormField
    v-if="control.visible"
    :label="control.label"
    :error="control.errors || undefined"
    :required="control.required"
    :description="control.description || undefined"
    class="mb-4 last:mb-0 w-full block"
    :ui="{ container: 'space-y-1' }"
  >
    <UInput
      :id="inputId"
      type="number"
      :model-value="inputValue"
      :disabled="!control.enabled"
      :readonly="control.readonly"
      :min="min"
      :max="max"
      :step="step"
      class="w-full hide-number-stepper"
      size="sm"
      variant="outline"
      @update:model-value="inputValue = $event"
    />
  </UFormField>
</template>
