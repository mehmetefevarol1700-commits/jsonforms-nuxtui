<script setup lang="ts">
import { useJsonFormsEnumControl, rendererProps } from '@jsonforms/vue'
import type { ControlElement } from '@jsonforms/core'
import { computed } from 'vue'

const props = defineProps(rendererProps<ControlElement>())

const { control, handleChange } = useJsonFormsEnumControl(props)

const items = computed(() =>
  (control.value.options || []).map((opt: { label: string; value: any }) => ({
    label: opt.label,
    value: opt.value
  }))
)

const modelValue = computed({
  get: () => {
    const d = control.value.data
    return d !== undefined && d !== null ? d : undefined
  },
  set: (val: any) => handleChange(control.value.path, val)
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
      :items="items"
      :model-value="modelValue"
      :disabled="!control.enabled"
      :readonly="control.readonly"
      class="w-full"
      placeholder="Seçiniz..."
      :ui="{
        root: 'relative',
        button: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-sm transition-all duration-200 hover:border-primary-300/50 dark:hover:border-primary-700/50 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:shadow-sm',
        list: 'bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg overflow-hidden',
        option: 'px-4 py-2.5 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors cursor-pointer',
        selectedIcon: 'text-primary-500 dark:text-primary-400',
        trailingIcon: 'text-gray-400 dark:text-gray-500'
      }"
      @update:model-value="modelValue = $event"
    />
  </UFormField>
</template>
