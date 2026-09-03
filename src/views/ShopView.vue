<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-10">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl md:text-3xl font-bold">{{ t('shop.title') }}</h1>
      <p class="text-gray-500 text-sm mt-1">{{ filteredProducts.length }} {{ t('shop.results') }}</p>
    </div>

    <!-- Search & Filter Bar -->
    <div class="flex gap-3 mb-6">
      <div class="flex-1 relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input v-model="searchQuery" type="text" :placeholder="t('nav.search')" class="input-field pl-10" />
      </div>
      <button @click="filterOpen = true" class="btn-outline flex items-center gap-2 text-sm px-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span class="hidden sm:inline">{{ t('shop.filter') }}</span>
      </button>
    </div>

    <!-- Sort -->
    <div class="flex items-center gap-3 mb-6">
      <select v-model="sortBy" class="input-field w-auto text-sm">
        <option value="popular">{{ t('shop.sortPopular') }}</option>
        <option value="newest">{{ t('shop.sortNewest') }}</option>
        <option value="lowHigh">{{ t('shop.sortLowHigh') }}</option>
        <option value="highLow">{{ t('shop.sortHighLow') }}</option>
      </select>
    </div>

    <!-- Products -->
    <div v-if="filteredProducts.length > 0">
      <ProductGrid :products="filteredProducts" />
    </div>
    <div v-else class="text-center py-20 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p class="text-lg">{{ t('shop.noProducts') }}</p>
    </div>

    <!-- Filter Drawer -->
    <ProductFilter :show="filterOpen" :category="categoryParam" @close="filterOpen = false" @filter="applyFilter" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ProductGrid from '@/components/product/ProductGrid.vue'
import ProductFilter from '@/components/product/ProductFilter.vue'
import jackets from '@/data/jackets'
import shoes from '@/data/shoes'

const { t } = useI18n()
const route = useRoute()

const searchQuery = ref('')
const sortBy = ref('popular')
const filterOpen = ref(false)
const activeFilter = ref({ category: 'all', sizes: [], priceRange: null })

const categoryParam = computed(() => route.params.category || 'all')

watch(categoryParam, (val) => {
  activeFilter.value.category = val || 'all'
}, { immediate: true })

const allProducts = computed(() => [...jackets, ...shoes])

const filteredProducts = computed(() => {
  let products = [...allProducts.value]

  const cat = activeFilter.value.category
  if (cat && cat !== 'all') {
    products = products.filter(p => p.category === cat)
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q)
    )
  }

  if (activeFilter.value.sizes.length > 0) {
    products = products.filter(p => p.sizes.some(s => activeFilter.value.sizes.includes(s)))
  }

  if (activeFilter.value.priceRange) {
    const { min, max } = activeFilter.value.priceRange
    products = products.filter(p => p.price >= min && p.price < max)
  }

  switch (sortBy.value) {
    case 'lowHigh': products.sort((a, b) => a.price - b.price); break
    case 'highLow': products.sort((a, b) => b.price - a.price); break
    case 'newest': products.sort((a, b) => new Date(b.created) - new Date(a.created)); break
    default: products.sort((a, b) => b.reviews - a.reviews)
  }

  return products
})

function applyFilter(filter) {
  activeFilter.value = filter
}
</script>
