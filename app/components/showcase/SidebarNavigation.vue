<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue'
import { categories, examples } from '@/data/examples'

const props = defineProps<{
  modelValue: string
  collapsed?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'toggle-collapse': []
}>()

const navRef = ref<HTMLElement | null>(null)
const searchQuery = ref('')
const expandedCategories = ref<Record<string, boolean>>({})

const filteredCategories = computed(() => {
  if (!searchQuery.value) {
    return categories.map(cat => ({
      ...cat,
      items: examples.filter(e => e.category === cat.label)
    }))
  }
  const q = searchQuery.value.toLowerCase()
  return categories.map((cat) => {
    const items = examples.filter(e =>
      e.category === cat.label
      && (e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q))
    )
    return { ...cat, items }
  }).filter(cat => cat.items.length > 0)
})

const selectExample = (exampleId: string) => {
  const nav = navRef.value
  if (nav) nav.dataset.scroll = String(nav.scrollTop)
  searchQuery.value = ''
  emit('update:modelValue', exampleId)
}

onUpdated(() => {
  const nav = navRef.value
  if (nav && nav.dataset.scroll) {
    nav.scrollTop = Number(nav.dataset.scroll)
    delete nav.dataset.scroll
  }
})

const toggleCategory = (categoryId: string) => {
  expandedCategories.value[categoryId] = !expandedCategories.value[categoryId]
}

const isCategoryExpanded = (categoryId: string) => {
  if (searchQuery.value) return true
  return expandedCategories.value[categoryId] !== false
}
</script>

<template>
  <aside
    :class="[
      'fixed left-0 top-0 z-40 h-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 flex flex-col',
      collapsed ? 'w-16' : 'w-56'
    ]"
    aria-label="Navigation Menu"
  >
    <!-- Header -->
    <div class="flex items-center justify-between h-12 px-3 border-b border-gray-200/50 dark:border-gray-800/50 shrink-0">
      <div
        v-if="!collapsed"
        class="flex items-center gap-2 min-w-0"
      >
        <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shrink-0">
          <UIcon
            name="i-heroicons-code-bracket"
            class="w-3.5 h-3.5 text-white"
          />
        </div>
        <div class="min-w-0">
          <h1 class="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
            Showcase
          </h1>
        </div>
      </div>
      <button
        class="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shrink-0"
        :aria-label="collapsed ? 'Expand' : 'Collapse'"
        @click="$emit('toggle-collapse')"
      >
        <UIcon
          :name="collapsed ? 'i-heroicons-chevron-right' : 'i-heroicons-chevron-left'"
          class="w-5 h-5 text-gray-600 dark:text-gray-300"
        />
      </button>
    </div>

    <!-- Navigation + Search -->
    <nav
      ref="navRef"
      class="flex-1 overflow-y-auto"
      aria-label="Main navigation"
    >
      <!-- Sticky Search -->
      <div
        v-if="!collapsed"
        class="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl px-2 pt-2 pb-1 border-b border-gray-200/50 dark:border-gray-800/50"
      >
        <UInput
          v-model="searchQuery"
          placeholder="Search..."
          size="xs"
          :ui="{
            root: 'relative',
            base: 'bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg text-xs transition-all duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 placeholder:text-gray-400 dark:placeholder:text-gray-500'
          }"
        >
          <template #leading>
            <UIcon
              name="i-heroicons-magnifying-glass"
              class="w-3 h-3 text-gray-400 dark:text-gray-500"
            />
          </template>
        </UInput>
      </div>

      <div class="px-2 py-2">
        <template
          v-for="category in filteredCategories"
          :key="category.id"
        >
          <div class="relative w-full mb-1 last:mb-0">
            <!-- Category Header -->
            <button
              v-if="!collapsed"
              class="relative block w-full text-left px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary-500 dark:text-primary-400 mt-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 rounded-md transition-colors"
              @click="toggleCategory(category.id)"
            >
              <span class="flex items-center gap-1.5 truncate">
                <UIcon
                  :name="category.icon"
                  class="w-3 h-3 shrink-0"
                />
                <span class="truncate">{{ category.label }}</span>
              </span>
              <UIcon
                :name="isCategoryExpanded(category.id) ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-right'"
                class="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 shrink-0"
              />
            </button>

            <!-- Collapsed mode -->
            <div
              v-if="collapsed"
              class="relative block w-full text-center px-2 py-2 text-[10px] font-bold tracking-wider text-primary-500"
              :title="category.label"
            >
              <UIcon
                :name="category.icon"
                class="w-4 h-4"
              />
            </div>

            <!-- Items -->
            <ul
              v-if="!collapsed && isCategoryExpanded(category.id)"
              class="relative w-full flex flex-col gap-[1px] mt-[1px]"
              role="list"
            >
              <li
                v-for="example in category.items"
                :key="example.id"
                class="relative block w-full"
              >
                <button
                  :class="[
                    'relative block w-full text-left rounded-md px-2 py-1.5 text-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center gap-1.5',
                    props.modelValue === example.id
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold border-r-2 border-primary-500'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  ]"
                  :title="example.title"
                  :aria-current="props.modelValue === example.id ? 'page' : undefined"
                  @click="selectExample(example.id)"
                >
                  <UIcon
                    :name="example.icon"
                    :class="[
                      'w-3 h-3 shrink-0',
                      props.modelValue === example.id ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'
                    ]"
                  />
                  <span class="truncate">{{ example.title }}</span>
                </button>
              </li>
            </ul>
          </div>
        </template>

        <!-- No results -->
        <div
          v-if="!collapsed && filteredCategories.length === 0"
          class="text-center py-8"
        >
          <UIcon
            name="i-heroicons-magnifying-glass"
            class="w-6 h-6 mx-auto text-gray-300 dark:text-gray-600 mb-2"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400">
            No results found
          </p>
        </div>
      </div>
    </nav>

    <!-- Footer -->
    <div class="p-2 border-t border-gray-200/50 dark:border-gray-800/50 shrink-0">
      <div
        v-if="!collapsed"
        class="text-center"
      >
        <p class="text-[9px] text-gray-400 dark:text-gray-500 truncate">
          {{ examples.length }} examples
        </p>
      </div>
    </div>
  </aside>
</template>
