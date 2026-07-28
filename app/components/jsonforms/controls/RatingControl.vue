<script setup lang="ts">
import { useJsonFormsControl, rendererProps } from '@jsonforms/vue'
import type { ControlElement } from '@jsonforms/core'
import { computed } from 'vue'

const props = defineProps(rendererProps<ControlElement>())

const { control, handleChange } = useJsonFormsControl(props)

const ratingValue = computed({
  get: () => control.value.data ?? 0,
  set: (val: number) => handleChange(control.value.path, val)
})

const maxRating = computed(() => control.value.schema?.maximum ?? 5)
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
      class="flex items-center gap-2"
      role="radiogroup"
      :aria-label="control.label"
    >
      <template
        v-for="i in maxRating"
        :key="i"
      >
        <button
          type="button"
          :disabled="!control.enabled || control.readonly"
          :aria-label="`${i} ${i === 1 ? 'star' : 'stars'}`"
          :aria-pressed="ratingValue >= i"
          class="flex items-center justify-center p-1 rounded transition-all duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          @click="ratingValue = i"
        >
          <UIcon
            :name="ratingValue >= i ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
            class="w-8 h-8 text-gray-300 dark:text-gray-600"
            :class="ratingValue >= i ? 'text-yellow-400 dark:text-yellow-300' : ''"
          />
        </button>
      </template>
    </div>
    <div
      v-if="ratingValue > 0"
      class="text-sm text-gray-500 dark:text-gray-400"
    >
      {{ ratingValue }} / {{ maxRating }} {{ maxRating === 1 ? 'star' : 'stars' }}
    </div>
  </UFormField>
</template>
