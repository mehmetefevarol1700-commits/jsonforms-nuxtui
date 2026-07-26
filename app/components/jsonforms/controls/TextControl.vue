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

const inputId = computed(() => `input-${control.value.path.replace(/[^a-zA-Z0-9]/g, '-')}`)
const inputType = computed(() => {
  const fmt = control.value.schema?.format
  if (fmt === 'email') return 'email'
  if (fmt === 'uri' || fmt === 'url') return 'url'
  if (fmt === 'tel') return 'tel'
  if (fmt === 'password') return 'password'
  return 'text'
})
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
      :model-value="inputValue"
      :disabled="!control.enabled"
      :readonly="control.readonly"
      :placeholder="control.description || 'Metin girin...'"
      class="w-full"
      size="md"
      variant="outline"
      :ui="{
        root: 'relative',
        base: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-sm transition-all duration-200 hover:border-primary-300/50 dark:hover:border-primary-700/50 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500',
        leading: 'text-gray-400 dark:text-gray-500',
        trailing: 'text-gray-400 dark:text-gray-500'
      }"
      @update:model-value="inputValue = $event"
    />
  </UFormField>
</template>