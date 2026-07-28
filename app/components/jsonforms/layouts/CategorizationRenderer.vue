<script setup lang="ts">
import { useJsonFormsLayout, rendererProps, DispatchRenderer } from '@jsonforms/vue'
import type { Categorization } from '@jsonforms/core'
import { ref, computed } from 'vue'

const props = defineProps(rendererProps<Categorization>())

const { layout } = useJsonFormsLayout(props)

const categories = computed(() => {
  const catUischema = layout.value.uischema as Categorization
  if (!catUischema?.elements) return []
  return catUischema.elements.map((element, index) => ({
    uischema: element,
    label: (element as { label?: string }).label || `Sekme ${index + 1}`,
    schema: layout.value.schema,
    path: layout.value.path,
    renderers: layout.value.renderers,
    cells: layout.value.cells,
    index
  }))
})

const activeIndex = ref(layout.value.activeCategory ?? 0)

const setActiveCategory = (index: number) => {
  activeIndex.value = index
  layout.value.activeCategory = index
}
</script>

<template>
  <div
    v-if="layout.visible"
    class="space-y-6"
  >
    <!-- Modern Segmented Tabs -->
    <div
      class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl"
      role="tablist"
    >
      <button
        v-for="(category, index) in categories"
        :key="category.path"
        role="tab"
        :aria-selected="activeIndex === index"
        :class="[
          'px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
          activeIndex === index
            ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
        ]"
        @click="setActiveCategory(index)"
      >
        {{ category.label }}
      </button>
    </div>

    <!-- Tab Panels with smooth fade -->
    <div class="relative min-h-[200px]">
      <div
        v-for="(category, index) in categories"
        v-show="activeIndex === index"
        :key="category.path"
        class="w-full"
      >
        <div class="flex flex-col gap-0 animate-fade-in">
          <DispatchRenderer
            v-for="(element, elementIndex) in category.uischema.elements"
            :key="`${category.path}-${elementIndex}`"
            :schema="category.schema"
            :uischema="element"
            :path="category.path"
            :renderers="category.renderers"
            :cells="category.cells"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.15s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
