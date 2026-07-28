<script setup lang="ts">
import { useJsonFormsEnumControl, rendererProps } from '@jsonforms/vue'
import type { ControlElement } from '@jsonforms/core'
import { computed } from 'vue'

const props = defineProps(rendererProps<ControlElement>())

const { control, handleChange } = useJsonFormsEnumControl(props)

const items = computed(() =>
  (control.value.options || []).map((opt: { label: string, value: unknown }) => ({
    label: opt.label,
    value: opt.value
  }))
)

const modelValue = computed({
  get: () => {
    const d = control.value.data
    return d !== undefined && d !== null ? d : undefined
  },
  set: (val: unknown) => handleChange(control.value.path, val)
})

const inputId = computed(() => `select-${control.value.path.replace(/[^a-zA-Z0-9]/g, '-')}`)
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
    <USelect
      :id="inputId"
      :items="items as any"
      :model-value="modelValue"
      :disabled="!control.enabled"
      :readonly="control.readonly"
      class="w-full"
      placeholder="Select..."
      @update:model-value="modelValue = $event"
    />
  </UFormField>
</template>
