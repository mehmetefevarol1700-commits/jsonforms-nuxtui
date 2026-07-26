<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <UIcon name="i-heroicons-code-bracket" class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Nuxt UI + JSON Forms</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">Master Showcase & Playground</p>
        </div>
      </template>

      <div class="space-y-4">
        <p class="text-center text-gray-600 dark:text-gray-400">
          Nuxt UI v3 bileşenlerini ve JSON Forms entegrasyonunu canlı test edebileceğiniz interaktif bir vitrine hoş geldiniz.
        </p>

        <UButton
          to="/showcase/text-input"
          color="primary"
          class="w-full"
          size="lg"
          icon="i-heroicons-arrow-right"
          :ui="{ base: 'gap-2' }"
        >
          Showcase'a Git
        </UButton>

        <div class="pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 text-center">Mevcut Kategoriler</h3>
          <div class="grid grid-cols-3 gap-3 text-xs">
            <NuxtLink
              v-for="cat in categoryLinks"
              :key="cat.id"
              :to="cat.firstExamplePath"
              class="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors cursor-pointer block"
            >
              <UIcon :name="cat.icon" class="w-5 h-5 mx-auto mb-1 text-primary-500" />
              <div class="font-medium text-gray-700 dark:text-gray-300">{{ cat.label }}</div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { examples, categories } from '@/data/examples'
import type { ShowcaseExample } from '@/data/examples'

const categoryLinks = categories.map(cat => {
  const firstExample = examples.find(e => e.category === cat.label)
  return {
    ...cat,
    firstExamplePath: firstExample ? `/showcase/${firstExample.id}` : '/showcase/text-input'
  }
})
</script>
