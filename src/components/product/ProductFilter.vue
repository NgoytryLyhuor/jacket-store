<template>
  <div v-if="show" class="fixed inset-0 z-50 md:relative md:z-auto">
    <div class="absolute inset-0 bg-black/50 md:hidden" @click="$emit('close')"></div>
    <div class="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl md:relative md:shadow-none md:rounded-2xl md:h-auto md:w-full md:border md:border-gray-200 overflow-y-auto">
      <div class="p-5">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold">{{ t('shop.filter') }}</h3>
          <button @click="$emit('close')" class="p-1 hover:bg-gray-100 rounded-full md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Category -->
        <div class="mb-6">
          <h4 class="font-medium text-sm mb-3">{{ t('nav.shop') }}</h4>
          <div class="space-y-2">
            <label v-for="cat in categories" :key="cat.value" class="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
              <input type="radio" :value="cat.value" v-model="filters.category" class="text-primary-600 focus:ring-primary-500" />
              <span class="text-sm">{{ cat.label }}</span>
            </label>
          </div>
        </div>

        <!-- Size -->
        <div class="mb-6">
          <h4 class="font-medium text-sm mb-3">{{ t('shop.size') }}</h4>
          <div class="flex flex-wrap gap-2">
            <button v-for="size in availableSizes" :key="size" @click="toggleSize(size)" class="px-3 py-1.5 text-sm border rounded-lg transition-colors" :class="filters.sizes.includes(size) ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-300 hover:border-primary-400'">
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Price Range -->
        <div class="mb-6">
          <h4 class="font-medium text-sm mb-3">{{ t('shop.priceRange') }}</h4>
          <div class="space-y-2">
            <label v-for="range in priceRanges" :key="range.label" class="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
              <input type="radio" :value="range" v-model="filters.priceRange" class="text-primary-600 focus:ring-primary-500" />
              <span class="text-sm">{{ range.label }}</span>
            </label>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <button @click="applyFilter" class="flex-1 btn-primary text-sm py-2.5 text-center">{{ t('shop.filter') }}</button>
          <button @click="clearFilter" class="px-4 py-2.5 text-sm border border-gray-300 rounded-xl hover:bg-gray-50">{{ t('shop.clearAll') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  show: Boolean,
  category: { type: String, default: 'all' }
})

const emit = defineEmits(['close', 'filter'])

const filters = reactive({
  category: props.category || 'all',
  sizes: [],
  priceRange: null,
})

const categories = computed(() => [
  { value: 'all', label: t('nav.allProducts') },
  { value: 'jacket', label: t('nav.jackets') },
  { value: 'shoe', label: t('nav.shoes') },
])

const jacketSizes = ['S', 'M', 'L', 'XL', 'XXL']
const shoeSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45']

const availableSizes = computed(() => {
  if (filters.category === 'jacket') return jacketSizes
  if (filters.category === 'shoe') return shoeSizes
  return [...jacketSizes, ...shoeSizes]
})

const priceRanges = [
  { label: '$0 - $30', min: 0, max: 30 },
  { label: '$30 - $60', min: 30, max: 60 },
  { label: '$60 - $100', min: 60, max: 100 },
  { label: '$100+', min: 100, max: Infinity },
]

function toggleSize(size) {
  const idx = filters.sizes.indexOf(size)
  if (idx > -1) filters.sizes.splice(idx, 1)
  else filters.sizes.push(size)
}

function applyFilter() {
  emit('filter', { ...filters })
  emit('close')
}

function clearFilter() {
  filters.category = 'all'
  filters.sizes = []
  filters.priceRange = null
  emit('filter', { ...filters })
  emit('close')
}
</script>
