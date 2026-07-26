<script setup lang="ts">
import { useJsonFormsLayout, rendererProps } from '@jsonforms/vue'
import type { Layout } from '@jsonforms/core'
import { DispatchRenderer } from '@jsonforms/vue'

const props = defineProps(rendererProps<Layout>())

const { layout } = useJsonFormsLayout(props)
</script>

<template>
  <div v-if="layout.visible" class="flex flex-col gap-0">
    <template v-if="layout.label">
      <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <span class="w-1 h-1 rounded-full bg-primary-500"></span>
        {{ layout.label }}
      </h3>
    </template>
    <DispatchRenderer
      v-for="(element, index) in layout.uischema.elements"
      :key="`${layout.path}-${index}`"
      :schema="layout.schema"
      :uischema="element"
      :path="layout.path"
      :renderers="layout.renderers"
      :cells="layout.cells"
    />
  </div>
</template>