<script setup lang="ts">
import { rendererProps, useJsonFormsRenderer } from '@jsonforms/vue'
import type { UISchemaElement } from '@jsonforms/core'

const props = defineProps(rendererProps<UISchemaElement>())

const { renderer } = useJsonFormsRenderer(props)
</script>

<template>
  <div
    v-if="renderer.visible"
    class="p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg"
  >
    <div class="flex items-center gap-2 text-red-700 dark:text-red-300">
      <span class="font-mono text-sm">{{ renderer.uischema?.type || 'Unknown' }}</span>
      <span class="text-xs text-gray-500">(No renderer registered)</span>
    </div>
    <pre class="mt-2 text-xs text-gray-600 dark:text-gray-400 overflow-auto max-h-32">
{{ JSON.stringify(renderer.uischema, null, 2).replace(/\\u([\da-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16))) }}
</pre>
  </div>
</template>
