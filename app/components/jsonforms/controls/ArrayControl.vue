<script setup lang="ts">
import { useJsonFormsControl, useJsonFormsArrayControl, rendererProps, DispatchRenderer } from '@jsonforms/vue'
import type { ControlElement, JsonSchema } from '@jsonforms/core'
import { ref, computed, watch } from 'vue'
import { UIcon, UInput } from '#components'

const props = defineProps(rendererProps<ControlElement>())

const { control, addItem, removeItems } = useJsonFormsArrayControl(props)
const { handleChange } = useJsonFormsControl(props)

const draggedIndex = ref<number | null>(null)

const items = computed(() => control.value.data || [])

const itemSchema = computed<JsonSchema | undefined>(() =>
  (control.value.schema as Record<string, unknown>)?.items as JsonSchema | undefined
)

const detailUischema = computed(() => control.value.uischemas?.[0] ?? null)

const labelKey = computed(() => {
  const schemaProps = itemSchema.value?.properties
  if (!schemaProps) return null
  return Object.keys(schemaProps).find(k => k === 'name' || k === 'title' || k === 'label' || k === 'task') || null
})

const generateDefaults = (props: Record<string, JsonSchema>): Record<string, unknown> => {
  const obj: Record<string, unknown> = {}
  for (const [key, prop] of Object.entries(props)) {
    if (prop.type === 'boolean') obj[key] = false
    else if (prop.type === 'integer' || prop.type === 'number') obj[key] = prop.default ?? (prop.minimum ?? (prop.type === 'integer' ? 0 : 0.0))
    else if (prop.type === 'array') obj[key] = []
    else if (prop.type === 'object' && prop.properties) obj[key] = generateDefaults(prop.properties)
    else obj[key] = prop.default ?? ''
  }
  return obj
}

const handleAddItem = () => {
  const sch = itemSchema.value
  let newItem: unknown
  if (!sch) {
    newItem = ''
  } else if (sch.properties) {
    newItem = generateDefaults(sch.properties)
  } else if (sch.type === 'string') {
    newItem = ''
  } else if (sch.type === 'integer' || sch.type === 'number') {
    newItem = 0
  } else if (sch.type === 'boolean') {
    newItem = false
  } else {
    newItem = ''
  }
  addItem(control.value.path, newItem)()
}

const handleRemoveItem = (index: number) => {
  removeItems(control.value.path, [index])()
}

const handleMoveItem = (fromIndex: number, toIndex: number) => {
  if (fromIndex === toIndex) return
  const arr = [...(control.value.data || [])]
  const [item] = arr.splice(fromIndex, 1)
  arr.splice(toIndex, 0, item)
  handleChange(control.value.path, arr)
}

const handleDragStart = (index: number) => {
  draggedIndex.value = index
}

const handleDragOver = (e: DragEvent, index: number) => {
  e.preventDefault()
  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    handleMoveItem(draggedIndex.value, index)
    draggedIndex.value = index
  }
}

const handleDragEnd = () => {
  draggedIndex.value = null
}

const expandedItems = ref<Set<number>>(new Set())

watch(items, (val) => {
  if (!val) return
  val.forEach((_, i) => expandedItems.value.add(i))
  expandedItems.value = new Set(expandedItems.value)
}, { immediate: true })

const toggleItem = (index: number) => {
  const next = new Set(expandedItems.value)
  if (next.has(index)) next.delete(index)
  else next.add(index)
  expandedItems.value = next
}

const isPrimitive = computed(() => {
  const sch = itemSchema.value
  return !sch || !sch.properties || sch.type === 'string' || sch.type === 'number' || sch.type === 'integer' || sch.type === 'boolean'
})

const updatePrimitiveItem = (index: number, value: unknown) => {
  const arr = [...(control.value.data || [])]
  arr[index] = value
  handleChange(control.value.path, arr)
}
</script>

<template>
  <UFormField
    v-if="control.visible"
    :label="control.label"
    :error="control.errors || undefined"
    :required="control.required"
    :description="control.description || undefined"
    class="mb-4 last:mb-0 w-full block"
    :ui="{ container: 'space-y-4' }"
  >
    <div
      v-if="items.length > 0"
      class="space-y-3"
    >
      <div
        v-for="(item, index) in items"
        :key="`${control.path}-${index}`"
        class="relative group"
        draggable="true"
        @dragstart="handleDragStart(index)"
        @dragover="handleDragOver($event, index)"
        @dragend="handleDragEnd"
      >
        <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-6 h-full flex items-center justify-center text-gray-300 dark:text-gray-500 hover:text-primary-500 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
          <UIcon
            name="i-heroicons-bars-3"
            class="w-5 h-5"
          />
        </div>

        <UCard
          :ui="{
            root: 'relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-l-2xl before:bg-primary-500/70',
            header: 'flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50',
            body: 'p-4'
          }"
        >
          <template #header>
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400">#{{ index + 1 }}</span>
              <h4 class="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                {{ labelKey ? (item[labelKey] ? String(item[labelKey]) : `Öğe ${index + 1}`) : String(item) }}
              </h4>
            </div>
            <div class="flex items-center gap-1">
              <button
                v-if="index > 0"
                class="p-1.5 rounded-lg text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                aria-label="Yukarı taşı"
                @click="handleMoveItem(index, index - 1)"
              >
                <UIcon
                  name="i-heroicons-chevron-up"
                  class="w-4 h-4"
                />
              </button>
              <button
                v-if="index < items.length - 1"
                class="p-1.5 rounded-lg text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                aria-label="Aşağı taşı"
                @click="handleMoveItem(index, index + 1)"
              >
                <UIcon
                  name="i-heroicons-chevron-down"
                  class="w-4 h-4"
                />
              </button>
              <button
                class="p-1.5 rounded-lg text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                :aria-label="expandedItems.has(index) ? 'Daralt' : 'Genişlet'"
                @click="toggleItem(index)"
              >
                <UIcon
                  :name="expandedItems.has(index) ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                  class="w-5 h-5"
                />
              </button>
              <button
                class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                aria-label="Sil"
                @click="handleRemoveItem(index)"
              >
                <UIcon
                  name="i-heroicons-trash"
                  class="w-5 h-5"
                />
              </button>
            </div>
          </template>

          <template #default>
            <Transition name="slide-fade">
              <div
                v-show="expandedItems.has(index)"
                class="space-y-4"
              >
                <UInput
                  v-if="isPrimitive"
                  :model-value="String(item)"
                  placeholder="Öğe değerini girin..."
                  class="w-full"
                  @update:model-value="(val) => updatePrimitiveItem(index, val)"
                />
                <DispatchRenderer
                  v-else-if="detailUischema && itemSchema"
                  :schema="itemSchema"
                  :uischema="detailUischema"
                  :path="`${control.path}[${index}]`"
                  :renderers="control.renderers"
                  :cells="control.cells"
                />
                <p
                  v-else
                  class="text-sm text-gray-400 italic"
                >
                  Şema görünümü yapılandırılmamış
                </p>
              </div>
            </Transition>
          </template>
        </UCard>
      </div>
    </div>

    <div
      v-else
      class="text-center py-12 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200/50 dark:border-gray-700/50"
    >
      <UIcon
        name="i-heroicons-inbox-stack"
        class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3"
      />
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        {{ control.label || 'Liste' }} henüz eklenmedi
      </p>
      <UButton
        color="primary"
        size="sm"
        class="gap-2"
        @click="handleAddItem"
      >
        <UIcon
          name="i-heroicons-plus"
          class="w-5 h-5"
        />
        İlk öğeyi ekle
      </UButton>
    </div>

    <div
      v-if="items.length > 0"
      class="text-center pt-2"
    >
      <UButton
        color="primary"
        variant="subtle"
        size="sm"
        class="gap-2"
        @click="handleAddItem"
      >
        <UIcon
          name="i-heroicons-plus"
          class="w-5 h-5"
        />
        Yeni Öğe Ekle
      </UButton>
    </div>
  </UFormField>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
  overflow: hidden;
}
</style>
