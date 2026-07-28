<script setup lang="ts">
import { useJsonFormsControl, rendererProps } from '@jsonforms/vue'
import type { ControlElement } from '@jsonforms/core'
import { computed } from 'vue'

const props = defineProps(rendererProps<ControlElement>())

const { control, handleChange } = useJsonFormsControl(props)

const dateValue = computed({
  get: () => control.value.data ?? '',
  set: (val: string) => handleChange(control.value.path, val)
})

const inputId = computed(() => `datepicker-${control.value.path.replace(/[^a-zA-Z0-9]/g, '-')}`)
const inputType = computed(() => control.value.schema?.format === 'time' ? 'time' : control.value.schema?.format === 'date-time' ? 'datetime-local' : 'date')
const placeholder = computed(() => control.value.schema?.format === 'time' ? 'Select time...' : control.value.schema?.format === 'date-time' ? 'Select date and time...' : 'Select date...')
const minDate = computed(() => control.value.schema?.minimum)
const maxDate = computed(() => control.value.schema?.maximum)
</script>

<template>
  <UFormField
    v-if="control.visible"
    :label="control.label"
    :error="control.errors || undefined"
    :required="control.required"
    :description="control.description || undefined"
    class="mb-4 last:mb-0 w-full block"
    :ui="{ container: 'space-y-1.5' }"
  >
    <UInput
      :id="inputId"
      :type="inputType"
      :model-value="dateValue"
      :disabled="!control.enabled"
      :readonly="control.readonly"
      class="w-full"
      :placeholder="placeholder"
      :min="minDate"
      :max="maxDate"
      @update:model-value="dateValue = $event"
    />
  </UFormField>
</template>
