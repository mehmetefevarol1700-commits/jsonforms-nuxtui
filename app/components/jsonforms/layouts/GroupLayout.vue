<script setup lang="ts">
import { useJsonFormsLayout, rendererProps, DispatchRenderer } from '@jsonforms/vue'
import type { Layout } from '@jsonforms/core'

const props = defineProps(rendererProps<Layout>())

const { layout } = useJsonFormsLayout(props)
</script>

<template>
  <UCard
    v-if="layout.visible"
    :ui="{
      root: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200',
      header: 'border-b border-gray-200/50 dark:border-gray-700/50 pb-4',
      body: 'pt-4'
    }"
    class="w-full"
  >
    <template #header>
      <div
        v-if="layout.label || layout.description"
        class="space-y-1"
      >
        <h3
          v-if="layout.label"
          class="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2"
        >
          {{ layout.label }}
        </h3>
        <p
          v-if="layout.description"
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          {{ layout.description }}
        </p>
      </div>
    </template>

    <template #default>
      <div class="flex flex-col gap-0">
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
  </UCard>
</template>
