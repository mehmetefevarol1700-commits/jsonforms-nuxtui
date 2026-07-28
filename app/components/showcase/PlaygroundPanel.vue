<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { examples } from '@/data/examples'

const safeStringify = (obj: unknown, spaces = 2): string =>
  JSON.stringify(obj, null, spaces)
    .replace(/\\u([\da-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))

const props = defineProps<{
  exampleId: string
  formData: unknown
  schema: unknown
  uischema: unknown
}>()

const emit = defineEmits<{
  'update:schema': [value: unknown]
  'update:uischema': [value: unknown]
  'copy': [type: string]
}>()

const activeTab = ref<'data' | 'schema' | 'uischema'>('data')

const example = computed(() => examples.find(e => e.id === props.exampleId))

const formattedData = computed(() => safeStringify(props.formData))

const schemaText = ref(safeStringify(props.schema))
const uischemaText = ref(safeStringify(props.uischema))
const schemaError = ref('')
const uischemaError = ref('')

watch(() => props.exampleId, () => {
  schemaText.value = safeStringify(props.schema)
  uischemaText.value = safeStringify(props.uischema)
  schemaError.value = ''
  uischemaError.value = ''
})

let schemaDebounce: ReturnType<typeof setTimeout> | null = null
let uischemaDebounce: ReturnType<typeof setTimeout> | null = null

const onSchemaEdit = () => {
  if (schemaDebounce) clearTimeout(schemaDebounce)
  schemaDebounce = setTimeout(() => {
    try {
      const parsed = JSON.parse(schemaText.value)
      schemaError.value = ''
      emit('update:schema', parsed)
    } catch (e: unknown) {
      schemaError.value = (e as Error).message
    }
  }, 400)
}

const onUischemaEdit = () => {
  if (uischemaDebounce) clearTimeout(uischemaDebounce)
  uischemaDebounce = setTimeout(() => {
    try {
      const parsed = JSON.parse(uischemaText.value)
      uischemaError.value = ''
      emit('update:uischema', parsed)
    } catch (e: unknown) {
      uischemaError.value = (e as Error).message
    }
  }, 400)
}

const copyToClipboard = async (text: string, type: string) => {
  await navigator.clipboard.writeText(text)
  emit('copy', type)
}

const downloadJson = (data: unknown, filename: string) => {
  const blob = new Blob([safeStringify(data)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const tabs = [
  { id: 'data', label: 'Data', icon: 'i-heroicons-document-text' },
  { id: 'schema', label: 'Schema', icon: 'i-heroicons-code-bracket' },
  { id: 'uischema', label: 'UI Schema', icon: 'i-heroicons-squares-2x2' }
] as const

const dataCount = computed(() => Object.keys(props.formData || {}).length)
const schemaCount = computed(() => example.value?.schema ? Object.keys(example.value.schema.properties || {}).length : 0)
</script>

<template>
  <div class="flex flex-col h-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-800/50">
    <!-- Tabs -->
    <div class="flex flex-wrap gap-1 border-b border-gray-200/50 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-900/50 p-1">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors rounded-lg',
          activeTab === tab.id
            ? 'text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/50 shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
        ]"
        role="tab"
        :aria-selected="activeTab === tab.id"
        @click="activeTab = tab.id as any"
      >
        <UIcon
          :name="tab.icon"
          class="w-4 h-4"
        />
        {{ tab.label }}
        <span class="px-1.5 py-0.5 text-[10px] rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          {{ tab.id === 'data' ? dataCount : tab.id === 'schema' ? schemaCount : '' }}
        </span>
      </button>
    </div>

    <!-- Tab Panels -->
    <div class="flex-1 overflow-auto p-4">
      <!-- Form Data Tab -->
      <div
        v-show="activeTab === 'data'"
        class="animate-fade-in"
        role="tabpanel"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Canlı Form Verisi
          </h3>
          <div class="flex items-center gap-2">
            <UButton
              size="xs"
              variant="outline"
              color="gray"
              class="gap-1.5"
              @click="copyToClipboard(formattedData.value, 'data')"
            >
              <UIcon
                name="i-heroicons-document-duplicate"
                class="w-4 h-4"
              />
              Kopyala
            </UButton>
            <UButton
              size="xs"
              variant="outline"
              color="primary"
              class="gap-1.5"
              @click="downloadJson(props.formData, `${example.value?.id}-data.json`)"
            >
              <UIcon
                name="i-heroicons-arrow-down-tray"
                class="w-4 h-4"
              />
              İndir
            </UButton>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden">
          <pre class="p-4 font-mono text-xs leading-relaxed text-gray-800 dark:text-gray-200 max-h-[500px] overflow-auto whitespace-pre-wrap break-words">{{ formattedData }}</pre>
        </div>
        <p
          v-if="Object.keys(props.formData || {}).length === 0"
          class="mt-4 text-center text-gray-500 dark:text-gray-400 text-sm"
        >
          Form henüz doldurulmadı. Sol menüden bir örnek seçip form alanlarını doldurun.
        </p>
      </div>

      <!-- JSON Schema Tab -->
      <div
        v-show="activeTab === 'schema'"
        class="animate-fade-in"
        role="tabpanel"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            JSON Schema Tanımı
          </h3>
          <div class="flex items-center gap-2">
            <UButton
              size="xs"
              variant="outline"
              color="gray"
              class="gap-1.5"
              @click="copyToClipboard(schemaText, 'schema')"
            >
              <UIcon
                name="i-heroicons-document-duplicate"
                class="w-4 h-4"
              />
              Kopyala
            </UButton>
            <UButton
              size="xs"
              variant="outline"
              color="primary"
              class="gap-1.5"
              @click="downloadJson(props.schema, `${example.value?.id}-schema.json`)"
            >
              <UIcon
                name="i-heroicons-arrow-down-tray"
                class="w-4 h-4"
              />
              İndir
            </UButton>
          </div>
        </div>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden"
          :class="{ 'border-red-400 dark:border-red-600': schemaError }"
        >
          <textarea
            v-model="schemaText"
            class="w-full min-h-[300px] p-4 font-mono text-xs leading-relaxed text-gray-800 dark:text-gray-200 bg-transparent resize-y focus:outline-none"
            spellcheck="false"
            @input="onSchemaEdit"
          />
        </div>
        <p
          v-if="schemaError"
          class="mt-1.5 text-xs text-red-500 dark:text-red-400 font-mono"
        >
          {{ schemaError }}
        </p>
        <p
          v-else-if="!schemaError && schemaText"
          class="mt-1.5 text-xs text-green-500 dark:text-green-400"
        >
          Geçerli JSON
        </p>
      </div>

      <!-- UI Schema Tab -->
      <div
        v-show="activeTab === 'uischema'"
        class="animate-fade-in"
        role="tabpanel"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            UI Schema (Layout Tanımı)
          </h3>
          <div class="flex items-center gap-2">
            <UButton
              size="xs"
              variant="outline"
              color="gray"
              class="gap-1.5"
              @click="copyToClipboard(uischemaText, 'uischema')"
            >
              <UIcon
                name="i-heroicons-document-duplicate"
                class="w-4 h-4"
              />
              Kopyala
            </UButton>
            <UButton
              size="xs"
              variant="outline"
              color="primary"
              class="gap-1.5"
              @click="downloadJson(props.uischema, `${example.value?.id}-uischema.json`)"
            >
              <UIcon
                name="i-heroicons-arrow-down-tray"
                class="w-4 h-4"
              />
              İndir
            </UButton>
          </div>
        </div>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden"
          :class="{ 'border-red-400 dark:border-red-600': uischemaError }"
        >
          <textarea
            v-model="uischemaText"
            class="w-full min-h-[300px] p-4 font-mono text-xs leading-relaxed text-gray-800 dark:text-gray-200 bg-transparent resize-y focus:outline-none"
            spellcheck="false"
            @input="onUischemaEdit"
          />
        </div>
        <p
          v-if="uischemaError"
          class="mt-1.5 text-xs text-red-500 dark:text-red-400 font-mono"
        >
          {{ uischemaError }}
        </p>
        <p
          v-else-if="!uischemaError && uischemaText"
          class="mt-1.5 text-xs text-green-500 dark:text-green-400"
        >
          Geçerli JSON
        </p>
      </div>
    </div>

    <!-- Footer Stats -->
    <div class="border-t border-gray-200/50 dark:border-gray-800/50 p-4 bg-gray-50/50 dark:bg-gray-900/50">
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {{ Object.keys(props.formData || {}).length }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Doldurulan Alan
          </p>
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {{ example.value?.schema?.required?.length || 0 }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Zorunlu Alan
          </p>
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {{ Object.keys(example.value?.schema?.properties || {}).length }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Toplam Alan
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
textarea {
  scrollbar-width: thin;
}
</style>
