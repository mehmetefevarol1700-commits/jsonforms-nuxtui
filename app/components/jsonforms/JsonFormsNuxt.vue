<script setup lang="ts">
import { JsonForms } from '@jsonforms/vue'
import type { JsonSchema, UISchemaElement, ValidationMode, JsonFormsRendererRegistryEntry, JsonFormsCellRendererRegistryEntry } from '@jsonforms/core'
import type { JsonFormsChangeEvent } from '@jsonforms/vue'
import { nuxtUiRenderers } from './renderers'
import type { ErrorObject } from 'ajv'
import type Ajv from 'ajv'
import { ref, computed, watch } from 'vue'

const props = withDefaults(defineProps<{
  schema?: JsonSchema
  uischema?: UISchemaElement
  data?: unknown
  renderers?: JsonFormsRendererRegistryEntry[]
  cells?: JsonFormsCellRendererRegistryEntry[]
  config?: unknown
  readonly?: boolean
  validationMode?: ValidationMode
  ajv?: InstanceType<typeof Ajv>
  additionalErrors?: ErrorObject<string, Record<string, unknown>, unknown>[]
}>(), {
  cells: () => [],
  readonly: false
})

const emit = defineEmits<{
  change: [payload: JsonFormsChangeEvent]
}>()

const effectiveRenderers = computed(() => props.renderers ?? nuxtUiRenderers)

const renderError = ref<string | null>(null)
const retryKey = ref(0)

watch(() => [props.schema, props.uischema], () => {
  renderError.value = null
})
</script>

<template>
  <div>
    <div
      v-if="renderError"
      class="p-4 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm"
    >
      <p class="font-semibold text-red-700 dark:text-red-400 mb-1">
        Form render error
      </p>
      <p class="text-red-600 dark:text-red-300 font-mono text-xs break-all">
        {{ renderError }}
      </p>
      <UButton
        size="xs"
        color="error"
        variant="outline"
        class="mt-2"
        @click="renderError = null; retryKey++"
      >
        Retry
      </UButton>
    </div>
    <JsonForms
      v-else
      :key="'jf-' + retryKey"
      :data="data"
      :schema="schema"
      :uischema="uischema"
      :renderers="effectiveRenderers"
      :cells="cells"
      :config="config"
      :readonly="readonly"
      :validation-mode="validationMode"
      :ajv="ajv"
      :additional-errors="additionalErrors"
      @change="emit('change', $event)"
    />
  </div>
</template>
