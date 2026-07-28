<template>
  <ClientOnly>
    <div
      class="min-h-screen bg-gray-50 dark:bg-gray-950 select-none"
      :class="{ 'select-none': isDragging }"
    >
      <!-- Top Navigation -->
      <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-14">
            <div class="flex items-center gap-3">
              <button
                class="lg:hidden p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Menüyü aç/kapat"
                @click="sidebarCollapsed = !sidebarCollapsed"
              >
                <UIcon
                  name="i-heroicons-bars-3"
                  class="w-5 h-5 text-gray-600 dark:text-gray-300"
                />
              </button>
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow shadow-primary-500/25">
                  <UIcon
                    name="i-heroicons-code-bracket"
                    class="w-4 h-4 text-white"
                  />
                </div>
                <div class="hidden sm:block">
                  <h1 class="text-sm font-bold text-gray-900 dark:text-gray-100">
                    Nuxt UI Forms Showcase
                  </h1>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <ThemePicker />

              <button
                class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                :aria-label="isDark ? 'Açık mod' : 'Koyu mod'"
                @click="toggleDarkMode"
              >
                <ClientOnly>
                  <UIcon
                    v-if="isDark"
                    name="i-heroicons-sun"
                    class="w-4 h-4 text-yellow-500"
                  />
                  <UIcon
                    v-else
                    name="i-heroicons-moon"
                    class="w-4 h-4 text-gray-600"
                  />
                  <template #fallback>
                    <UIcon
                      name="i-heroicons-moon"
                      class="w-4 h-4 text-gray-600"
                    />
                  </template>
                </ClientOnly>
              </button>

              <div
                v-if="currentExample"
                class="hidden lg:flex items-center gap-1.5 px-2 py-1 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
              >
                <UIcon
                  :name="currentExample.icon"
                  class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400"
                />
                <span class="text-xs font-medium text-primary-700 dark:text-primary-300 truncate max-w-[120px]">{{ currentExample.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Layout -->
      <div class="flex relative">
        <SidebarNavigation
          v-model="selectedExampleId"
          :collapsed="sidebarCollapsed"
          @toggle-collapse="sidebarCollapsed = !sidebarCollapsed"
        />

        <!-- Mobile overlay -->
        <div
          v-if="!sidebarCollapsed && isMobile"
          class="fixed inset-0 z-30 bg-black/50 lg:hidden"
          aria-hidden="true"
          @click="sidebarCollapsed = true"
        />

        <!-- Main Content -->
        <main
          class="flex-1 lg:ml-0 min-h-[calc(100vh-3.5rem)] overflow-hidden"
          :class="sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-56'"
        >
          <div class="h-[calc(100vh-3.5rem)] flex overflow-hidden">
            <!-- Live Form Panel -->
            <div
              class="flex flex-col min-w-0 overflow-hidden"
              :style="{ width: splitPercent + '%' }"
            >
              <div class="h-full flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50">
                <!-- Header -->
                <div class="flex items-center justify-between px-5 py-3 border-b border-gray-200/50 dark:border-gray-800/50 shrink-0">
                  <div class="min-w-0">
                    <h2 class="text-base font-bold text-gray-900 dark:text-gray-100 truncate">
                      {{ currentExample?.title || 'Örnek Seçin' }}
                    </h2>
                    <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {{ currentExample?.description || 'Sol menüden seçim yapın.' }}
                    </p>
                  </div>
                  <UBadge
                    v-if="currentExample"
                    color="primary"
                    variant="outline"
                    class="text-[10px] shrink-0 ml-2"
                  >
                    {{ currentExample.category }}
                  </UBadge>
                </div>

                <!-- Form Body -->
                <div class="flex-1 overflow-auto p-5">
                  <div
                    v-if="liveSchema && liveUischema"
                    :key="'form-' + currentExample?.id"
                    class="max-w-3xl mx-auto"
                  >
                    <JsonFormsNuxt
                      :key="'schema-' + schemaVersion"
                      :schema="liveSchema"
                      :uischema="liveUischema"
                      :data="formData"
                      @change="onFormChange"
                    />
                  </div>
                  <div
                    v-else
                    class="flex items-center justify-center h-full"
                  >
                    <div class="text-center py-12">
                      <UIcon
                        name="i-heroicons-cursor-arrow-rays"
                        class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3"
                      />
                      <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        Bir Örnek Seçin
                      </h3>
                      <p class="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                        Sol menüden seçim yaparak formu görün.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Resizable Splitter -->
            <div
              class="w-1.5 cursor-col-resize shrink-0 relative group z-10"
              @mousedown.prevent="startResize"
            >
              <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-gray-200 dark:bg-gray-700 group-hover:bg-primary-400 dark:group-hover:bg-primary-500 transition-colors" />
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div class="w-[2px] h-3 bg-gray-400 rounded-full mx-[1px]" />
                <div class="w-[2px] h-3 bg-gray-400 rounded-full mx-[1px]" />
              </div>
            </div>

            <!-- Playground Panel -->
            <div
              class="flex flex-col min-w-0 overflow-hidden"
              :style="{ width: (100 - splitPercent) + '%' }"
            >
              <PlaygroundPanel
                :example-id="selectedExampleId"
                :form-data="formData"
                :schema="liveSchema"
                :uischema="liveUischema"
                @update:schema="liveSchema = $event; schemaVersion++"
                @update:uischema="liveUischema = $event; schemaVersion++"
                @copy="onCopy"
              />
            </div>
          </div>
        </main>
      </div>

      <!-- Mobile Bottom Sheet -->
      <div
        v-if="isMobile && selectedExampleId"
        class="lg:hidden fixed bottom-0 left-0 right-0 z-40 max-h-[50vh] bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 rounded-t-2xl shadow-2xl"
      >
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-800/50">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Playground
          </h3>
          <button
            class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="selectedExampleId = ''"
          >
            <UIcon
              name="i-heroicons-x-mark"
              class="w-4 h-4 text-gray-500"
            />
          </button>
        </div>
        <div class="max-h-[40vh] overflow-auto">
          <PlaygroundPanel
            :example-id="selectedExampleId"
            :form-data="formData"
            :schema="liveSchema"
            :uischema="liveUischema"
            @update:schema="liveSchema = $event; schemaVersion++"
            @update:uischema="liveUischema = $event; schemaVersion++"
            @copy="onCopy"
          />
        </div>
      </div>

      <UToaster position="top-right" />
    </div>
    <template #fallback>
      <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <UIcon
          name="i-heroicons-arrow-path"
          class="w-8 h-8 text-gray-400 animate-spin"
        />
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useColorMode, useRoute } from '#imports'
import { examples } from '@/data/examples'
import SidebarNavigation from '@/components/showcase/SidebarNavigation.vue'
import PlaygroundPanel from '@/components/showcase/PlaygroundPanel.vue'
import ThemePicker from '@/components/showcase/ThemePicker.vue'
import JsonFormsNuxt from '@/components/jsonforms/JsonFormsNuxt.vue'

const colorMode = useColorMode()

// Dynamic SVG favicon that reacts to primary color
const faviconColor = ref('#10b981')
const faviconSvg = computed(() => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="${faviconColor.value}"/><path d="M12 11l-4 5 4 5M20 11l4 5-4 5M17 8l-2 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
})
useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: faviconSvg }]
})
const route = useRoute()

const isDark = computed(() => colorMode.value === 'dark')
const sidebarCollapsed = ref(false)
const selectedExampleId = ref(route.params.example as string || examples[0]?.id || '')
const initialEx = examples.find(e => e.id === selectedExampleId.value)
const formData = ref<unknown>(initialEx ? structuredClone(initialEx.data) : null)
const liveSchema = ref<unknown>(initialEx ? structuredClone(initialEx.schema) : null)
const liveUischema = ref<unknown>(initialEx ? structuredClone(initialEx.uischema) : null)
const isMobile = ref(false)
const schemaVersion = ref(0)

const splitPercent = ref(import.meta.client ? Number(localStorage.getItem('showcase-split') ?? 70) : 70)
const isDragging = ref(false)

watch(splitPercent, (val) => {
  localStorage.setItem('showcase-split', String(val))
})

const currentExample = computed(() => examples.find(e => e.id === selectedExampleId.value))

const toggleDarkMode = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const onFormChange = (event: { data: unknown }) => {
  formData.value = event.data
}

const onCopy = () => {}

// Initialize form data for an example
const setFormData = (exampleId: string) => {
  const ex = examples.find(e => e.id === exampleId)
  formData.value = ex ? structuredClone(ex.data) : null
  liveSchema.value = ex ? structuredClone(ex.schema) : null
  liveUischema.value = ex ? structuredClone(ex.uischema) : null
}

// Resizable splitter
const startResize = (e: MouseEvent) => {
  isDragging.value = true
  const container = (e.currentTarget as HTMLElement).parentElement
  if (!container) return
  const startX = e.clientX
  const startPercent = splitPercent.value
  const containerWidth = container.offsetWidth

  const onMouseMove = (ev: MouseEvent) => {
    const dx = ev.clientX - startX
    let pct = startPercent + (dx / containerWidth) * 100
    pct = Math.max(30, Math.min(85, pct))
    splitPercent.value = Math.round(pct)
  }

  const onMouseUp = () => {
    isDragging.value = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

// Route param → state
watch(() => route.params.example, (newVal) => {
  if (newVal && newVal !== selectedExampleId.value) {
    selectedExampleId.value = newVal as string
  }
})

// State change → reset form + sync URL (no router navigation to avoid scroll reset)
watch(selectedExampleId, (newVal) => {
  if (!newVal) return
  setFormData(newVal)
  if (newVal !== route.params.example) {
    history.replaceState(null, '', `/showcase/${newVal}`)
  }
})

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
  if (isMobile.value) sidebarCollapsed.value = true
}

const readPrimaryColor = () => {
  const c = getComputedStyle(document.documentElement).getPropertyValue('--ui-color-primary-500').trim()
  if (c) faviconColor.value = c
}
let colorObserver: MutationObserver | null = null

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  setFormData(selectedExampleId.value)
  readPrimaryColor()
  colorObserver = new MutationObserver(readPrimaryColor)
  colorObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  colorObserver?.disconnect()
})
</script>

<style scoped>
* { transition: background-color 0.2s ease, border-color 0.2s ease; }
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgb(156 163 175 / 0.3); border-radius: 3px; }
.dark ::-webkit-scrollbar-thumb { background: rgb(107 114 128 / 0.25); }
@media print {
  header, aside, .fixed { display: none !important; }
  main { margin-left: 0 !important; }
}
</style>
