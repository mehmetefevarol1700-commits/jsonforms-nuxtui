<script setup lang="ts">
import { useJsonFormsControl, rendererProps } from '@jsonforms/vue'
import type { ControlElement } from '@jsonforms/core'
import { computed } from 'vue'

const props = defineProps(rendererProps<ControlElement>())

const { control, handleChange } = useJsonFormsControl(props)

const inputValue = computed({
  get: () => control.value.data ?? '',
  set: (val: string) => handleChange(control.value.path, val)
})

const inputId = computed(() => `textarea-${control.value.path.replace(/[^a-zA-Z0-9]/g, '-')}`)
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
    <UTextarea
      :id="inputId"
      :model-value="inputValue"
      :disabled="!control.enabled"
      :readonly="control.readonly"
      class="w-full"
      :rows="4"
      placeholder="Detaylı bilgi girin..."
      :ui="{
        root: 'relative',
        base: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-sm transition-all duration-200 resize-y min-h-[100px] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500',
        wrapper: 'relative'
      }"
      @update:model-value="inputValue = $event"
    />
  </UFormField>
</template>