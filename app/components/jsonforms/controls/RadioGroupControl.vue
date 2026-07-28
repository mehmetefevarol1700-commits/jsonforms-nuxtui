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

const inputId = computed(() => `radio-${control.value.path.replace(/[^a-zA-Z0-9]/g, '-')}`)
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
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      role="radiogroup"
      :aria-label="control.label"
    >
      <label
        v-for="item in items"
        :key="item.value"
        class="group relative cursor-pointer"
      >
        <input
          :id="`${inputId}-${item.value}`"
          type="radio"
          :name="inputId"
          :value="item.value"
          :checked="modelValue === item.value"
          :disabled="!control.enabled || control.readonly"
          class="sr-only"
          @change="modelValue = item.value"
        >
        <div
          class="relative p-4 rounded-xl border-2 transition-all duration-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
          :class="[
            'border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md hover:border-primary-300/50 dark:hover:border-primary-700/50',
            modelValue === item.value
              ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/20 shadow-[0_0_0_1px_theme(colors.primary.500)]'
              : ''
          ]"
        >
          <div class="flex items-center gap-3">
            <div
              class="relative flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200"
              :class="modelValue === item.value
                ? 'border-primary-500 bg-primary-500'
                : 'border-gray-300 dark:border-gray-600 bg-transparent'"
            >
              <div
                v-if="modelValue === item.value"
                class="h-2.5 w-2.5 rounded-full bg-white transition-all duration-200"
              />
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-200 group-has-[:checked]:text-primary-700 dark:group-has-[:checked]:text-primary-300">
              {{ item.label }}
            </span>
          </div>
        </div>
      </label>
    </div>
  </UFormField>
</template>
