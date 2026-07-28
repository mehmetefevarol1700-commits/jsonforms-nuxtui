<script setup lang="ts">
import { useJsonFormsControl, rendererProps, DispatchRenderer } from '@jsonforms/vue'
import type { ControlElement, JsonSchema, UISchemaElement } from '@jsonforms/core'
import { computed } from 'vue'

const props = defineProps(rendererProps<ControlElement>())

const { control, handleChange } = useJsonFormsControl(props)

interface OneOfSchema extends JsonSchema {
  title?: string
  properties?: Record<string, JsonSchema>
}

const oneOfSchemas = computed<OneOfSchema[]>(() =>
  (control.value.schema?.oneOf || control.value.schema?.anyOf || []) as OneOfSchema[]
)

const hasProperties = computed(() =>
  oneOfSchemas.value.some(s => s.properties && Object.keys(s.properties).length > 0)
)

const discriminatorKey = computed(() => {
  for (const opt of oneOfSchemas.value) {
    for (const key of Object.keys(opt.properties || {})) {
      if ((opt.properties as Record<string, JsonSchema>)?.[key]?.const !== undefined) return key
    }
  }
  return ''
})

const options = computed(() =>
  oneOfSchemas.value.map((s, i) => {
    let value: unknown
    const props = s.properties || {}
    for (const key of Object.keys(props)) {
      const prop = (props as Record<string, JsonSchema>)[key]
      if (prop?.const !== undefined) {
        value = prop.const
        break
      }
    }
    if (value === undefined) value = i
    return { label: s.title || `Option ${i + 1}`, value, schema: s }
  })
)

const selectedValue = computed({
  get: () => {
    if (hasProperties.value && discriminatorKey.value) {
      const dv = currentDiscValue.value
      if (dv !== undefined) return dv
    }
    const data = control.value.data
    if (!hasProperties.value && data !== undefined && data !== null) {
      const idx = options.value.findIndex((o) => {
        const t = o.schema?.type
        return (t === 'string' && typeof data === 'string')
          || ((t === 'integer' || t === 'number') && typeof data === 'number')
      })
      if (idx >= 0) return idx
    }
    return data ?? undefined
  },
  set: (val: unknown) => {
    const opt = options.value.find(o => o.value === val)
    if (opt?.schema) {
      const props = opt.schema.properties
      if (props && Object.keys(props).length > 0) {
        const initial: Record<string, unknown> = {}
        for (const key of Object.keys(props)) {
          const ps = (props as Record<string, JsonSchema>)[key]
          if (ps.const !== undefined) {
            initial[key] = ps.const
          } else if (ps.default !== undefined) {
            initial[key] = ps.default
          } else if (ps.type === 'string' || ps.type === undefined) {
            initial[key] = ''
          } else if (ps.type === 'integer' || ps.type === 'number') {
            initial[key] = 0
          } else if (ps.type === 'boolean') {
            initial[key] = false
          } else if (ps.type === 'array') {
            initial[key] = []
          } else {
            initial[key] = null
          }
        }
        handleChange(control.value.path, initial)
        return
      }
      const st = opt.schema.type
      if (st === 'string') {
        handleChange(control.value.path, '')
        return
      }
      if (st === 'integer') {
        handleChange(control.value.path, 0)
        return
      }
      if (st === 'number') {
        handleChange(control.value.path, 0)
        return
      }
      if (st === 'boolean') {
        handleChange(control.value.path, false)
        return
      }
    }
    handleChange(control.value.path, val)
  }
})

const currentDiscValue = computed(() => {
  const data = control.value.data
  const dk = discriminatorKey.value
  if (data && typeof data === 'object' && dk && data[dk] !== undefined) {
    return data[dk]
  }
  return undefined
})

const childSchema = computed<JsonSchema | null>(() => {
  if (!hasProperties.value) return null
  const dv = currentDiscValue.value
  if (!dv) return null
  const match = oneOfSchemas.value.find((s) => {
    const props = s.properties || {}
    return Object.values(props).some((p: Record<string, unknown>) => p.const === dv)
  })
  return (match as JsonSchema) || null
})

const childUischema = computed<UISchemaElement | null>(() => {
  if (!hasProperties.value) return null
  const dv = currentDiscValue.value
  if (!dv) return null
  const match = oneOfSchemas.value.find((s) => {
    const props = s.properties || {}
    return Object.values(props).some(p => (p as Record<string, unknown>).const === dv)
  })
  if (!match?.properties) return null
  const dk = discriminatorKey.value
  const keys = Object.keys(match.properties).filter(key => key !== dk)
  return {
    type: 'VerticalLayout',
    elements: keys.map(key => ({
      type: 'Control',
      scope: `#/properties/${key}`,
      label: (match.properties as Record<string, JsonSchema>)[key]?.title || key
    }))
  }
})

const inputId = computed(() => `oneof-${control.value.path.replace(/[^a-zA-Z0-9]/g, '-')}`)
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
    <USelect
      :id="inputId"
      :items="options"
      :model-value="selectedValue"
      :disabled="!control.enabled"
      :readonly="control.readonly"
      class="w-full"
      placeholder="Seçiniz..."
      @update:model-value="selectedValue = $event"
    />
    <div
      v-if="childUischema && childSchema"
      class="border-l-2 border-primary-200 dark:border-primary-800 pl-3 ml-1"
    >
      <DispatchRenderer
        :schema="childSchema"
        :uischema="childUischema"
        :path="control.path"
        :renderers="control.renderers"
        :cells="control.cells"
      />
    </div>
  </UFormField>
</template>
