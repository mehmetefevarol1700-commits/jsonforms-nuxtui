<script setup lang="ts">
import { ref, computed, onMounted, shallowRef } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()
const appConfig = useAppConfig()

const open = ref(false)
const twColors = shallowRef<any>(null)
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const primaryColors = [
  { name: 'Green', value: 'green', class: 'bg-green-500' },
  { name: 'Emerald', value: 'emerald', class: 'bg-emerald-500' },
  { name: 'Teal', value: 'teal', class: 'bg-teal-500' },
  { name: 'Cyan', value: 'cyan', class: 'bg-cyan-500' },
  { name: 'Sky', value: 'sky', class: 'bg-sky-500' },
  { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
  { name: 'Indigo', value: 'indigo', class: 'bg-indigo-500' },
  { name: 'Violet', value: 'violet', class: 'bg-violet-500' },
  { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
  { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
  { name: 'Rose', value: 'rose', class: 'bg-rose-500' },
  { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
  { name: 'Amber', value: 'amber', class: 'bg-amber-500' },
  { name: 'Yellow', value: 'yellow', class: 'bg-yellow-500' },
  { name: 'Lime', value: 'lime', class: 'bg-lime-500' },
  { name: 'Red', value: 'red', class: 'bg-red-500' }
]

const neutralColors = [
  { name: 'Slate', value: 'slate' },
  { name: 'Gray', value: 'gray' },
  { name: 'Zinc', value: 'zinc' },
  { name: 'Neutral', value: 'neutral' },
  { name: 'Stone', value: 'stone' }
]

const radiusOptions = [
  { label: '0', value: '0' },
  { label: '0.125', value: '0.125' },
  { label: '0.25', value: '0.25' },
  { label: '0.375', value: '0.375' },
  { label: '0.5', value: '0.5' }
]

const selectedPrimary = ref(appConfig.ui.colors?.primary || 'green')
const selectedNeutral = ref(appConfig.ui.colors?.neutral || 'slate')
const selectedRadius = ref(appConfig.ui.radius || '0.375')

const currentColorMode = computed(() => colorMode.value)

const applyColorToVars = (kind: 'primary' | 'neutral', color: string) => {
  const palette = twColors.value?.[color]
  if (!palette || typeof palette !== 'object') return
  const root = document.documentElement
  for (const shade of shades) {
    if (palette[shade]) {
      root.style.setProperty(`--ui-color-${kind}-${shade}`, palette[shade])
    }
  }
}

const setPrimary = (color: string) => {
  selectedPrimary.value = color as any
  appConfig.ui.colors!.primary = color as any
  applyColorToVars('primary', color)
  localStorage.setItem('theme-primary', color)
}

const setNeutral = (color: string) => {
  selectedNeutral.value = color as any
  appConfig.ui.colors!.neutral = color as any
  applyColorToVars('neutral', color)
  localStorage.setItem('theme-neutral', color)
}

const setRadius = (val: string) => {
  selectedRadius.value = val
  appConfig.ui.radius = val as any
  document.documentElement.style.setProperty('--ui-radius', val + 'rem')
  localStorage.setItem('theme-radius', val)
}

const setColorMode = (mode: 'light' | 'dark' | 'system') => {
  colorMode.preference = mode
  localStorage.setItem('theme-color-mode', mode)
}

const exportConfig = () => {
  const config = `export default defineAppConfig({
  ui: {
    colors: {
      primary: '${selectedPrimary.value}',
      neutral: '${selectedNeutral.value}'
    },
    radius: '${selectedRadius.value}'
  }
})`
  navigator.clipboard.writeText(config)
}

onMounted(async () => {
  try {
    const mod = await import('tailwindcss/colors')
    twColors.value = mod.default || mod
  } catch {}
  const savedPrimary = localStorage.getItem('theme-primary')
  const savedNeutral = localStorage.getItem('theme-neutral')
  const savedRadius = localStorage.getItem('theme-radius')
  if (savedPrimary) setPrimary(savedPrimary)
  if (savedNeutral) setNeutral(savedNeutral)
  if (savedRadius) setRadius(savedRadius)
})
</script>

<template>
  <div class="relative">
    <button
      @click="open = !open"
      class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Tema seçici"
    >
      <UIcon name="i-heroicons-paint-brush" class="w-4 h-4 text-gray-600 dark:text-gray-300" />
    </button>

    <div
      v-if="open"
      class="fixed inset-0 z-40"
      @click="open = false"
    />

    <Transition name="popup">
      <div
        v-if="open"
        class="absolute right-0 top-full mt-2 z-50 w-72 bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-2xl overflow-hidden"
      >
        <div class="max-h-[80vh] overflow-y-auto p-3 space-y-4">
          <!-- Primary Colors -->
          <div>
            <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Primary</h4>
            <div class="grid grid-cols-8 gap-1.5">
              <button
                v-for="c in primaryColors"
                :key="c.value"
                @click="setPrimary(c.value)"
                :class="[
                  'w-6 h-6 rounded-full transition-transform hover:scale-110',
                  c.class,
                  selectedPrimary === c.value ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-gray-400 dark:ring-gray-500 scale-110' : ''
                ]"
                :title="c.name"
              />
            </div>
          </div>

          <!-- Neutral Colors -->
          <div>
            <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Neutral</h4>
            <div class="flex gap-2">
              <button
                v-for="c in neutralColors"
                :key="c.value"
                @click="setNeutral(c.value)"
                :class="[
                  'flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all',
                  selectedNeutral === c.value
                    ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                ]"
              >
                {{ c.name }}
              </button>
            </div>
          </div>

          <!-- Radius -->
          <div>
            <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Radius</h4>
            <div class="flex gap-2">
              <button
                v-for="r in radiusOptions"
                :key="r.value"
                @click="setRadius(r.value)"
                :class="[
                  'flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all',
                  selectedRadius === r.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                ]"
              >
                {{ r.label }}
              </button>
            </div>
          </div>

          <!-- Color Mode -->
          <div>
            <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Color Mode</h4>
            <div class="flex gap-2">
              <button
                @click="setColorMode('light')"
                :class="[
                  'flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1',
                  currentColorMode === 'light'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                ]"
              >
                <UIcon name="i-heroicons-sun" class="w-3.5 h-3.5" />
                Light
              </button>
              <button
                @click="setColorMode('dark')"
                :class="[
                  'flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1',
                  currentColorMode === 'dark'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                ]"
              >
                <UIcon name="i-heroicons-moon" class="w-3.5 h-3.5" />
                Dark
              </button>
              <button
                @click="setColorMode('system')"
                :class="[
                  'flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1',
                  currentColorMode === 'system'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                ]"
              >
                <UIcon name="i-heroicons-computer-desktop" class="w-3.5 h-3.5" />
                System
              </button>
            </div>
          </div>

          <!-- Export -->
          <button
            @click="exportConfig"
            class="w-full px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <UIcon name="i-heroicons-document-duplicate" class="w-3.5 h-3.5" />
            app.config.ts kopyala
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
