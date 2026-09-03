<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-10" v-if="product">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-6">
      <router-link to="/" class="hover:text-primary-600">{{ t('nav.home') }}</router-link>
      <span class="mx-2">/</span>
      <router-link to="/shop" class="hover:text-primary-600">{{ t('nav.shop') }}</router-link>
      <span class="mx-2">/</span>
      <span class="text-gray-900">{{ locale === 'km' ? product.name : product.nameEn }}</span>
    </nav>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      <!-- Images -->
      <div>
        <div class="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-4">
          <img :src="selectedImage" :alt="product.name" class="w-full h-full object-cover" />
        </div>
        <div class="flex gap-3">
          <button v-for="(img, i) in product.images" :key="i" @click="selectedImage = img" class="w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors" :class="selectedImage === img ? 'border-primary-600' : 'border-transparent'">
            <img :src="img" :alt="product.name" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Info -->
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span v-if="product.isNew" class="bg-primary-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">NEW</span>
          <span v-if="product.originalPrice" class="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">-{{ Math.round((1 - product.price / product.originalPrice) * 100) }}%</span>
        </div>

        <h1 class="text-2xl md:text-3xl font-bold mb-2">{{ locale === 'km' ? product.name : product.nameEn }}</h1>

        <div class="flex items-center gap-3 mb-4">
          <div class="flex">
            <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <span class="text-sm text-gray-500">({{ product.reviews }} reviews)</span>
        </div>

        <div class="flex items-baseline gap-3 mb-6">
          <span class="text-3xl font-extrabold text-primary-600">${{ product.price.toFixed(2) }}</span>
          <span v-if="product.originalPrice" class="text-lg text-gray-400 line-through">${{ product.originalPrice.toFixed(2) }}</span>
        </div>

        <!-- Color -->
        <div class="mb-6">
          <h3 class="font-medium text-sm mb-3">{{ t('product.selectColor') }}: <span class="text-primary-600">{{ selectedColor }}</span></h3>
          <div class="flex gap-2">
            <button v-for="(color, i) in product.colors" :key="color" @click="selectedColor = locale === 'km' ? color : product.colorsEn[i]" class="w-10 h-10 rounded-full border-2 transition-all" :class="(locale === 'km' ? color : product.colorsEn[i]) === selectedColor ? 'border-primary-600 ring-2 ring-primary-200' : 'border-gray-200 hover:border-gray-400'" :style="{ backgroundColor: getColorHex(locale === 'km' ? color : product.colorsEn[i]) }" :title="color">
            </button>
          </div>
        </div>

        <!-- Size -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-medium text-sm">{{ t('product.selectSize') }}: <span class="text-primary-600">{{ selectedSize }}</span></h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <button v-for="size in product.sizes" :key="size" @click="selectedSize = size" class="min-w-[44px] h-11 px-3 border-2 rounded-xl text-sm font-medium transition-all" :class="selectedSize === size ? 'border-primary-600 bg-primary-50 text-primary-600' : 'border-gray-200 hover:border-gray-400'">
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Quantity -->
        <div class="mb-6">
          <h3 class="font-medium text-sm mb-3">{{ t('product.quantity') }}</h3>
          <div class="flex items-center border-2 rounded-xl w-fit">
            <button @click="quantity > 1 && quantity--" class="px-4 py-2.5 text-lg hover:bg-gray-50 rounded-l-xl transition-colors">-</button>
            <span class="px-6 py-2.5 font-medium text-lg">{{ quantity }}</span>
            <button @click="quantity++" class="px-4 py-2.5 text-lg hover:bg-gray-50 rounded-r-xl transition-colors">+</button>
          </div>
        </div>

        <!-- Stock -->
        <p class="text-sm mb-6" :class="product.stock > 0 ? 'text-green-600' : 'text-red-500'">
          {{ product.stock > 0 ? t('product.inStock') + ' (' + product.stock + ')' : t('product.outOfStock') }}
        </p>

        <!-- Add to Cart -->
        <button @click="addToCart" class="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          {{ t('product.addToCart') }}
        </button>

        <!-- Description -->
        <div class="mt-8 border-t pt-6">
          <h3 class="font-bold text-lg mb-3">{{ t('product.description') }}</h3>
          <p class="text-gray-600 leading-relaxed">{{ locale === 'km' ? product.description : product.descriptionEn }}</p>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <section class="mt-12 md:mt-16" v-if="relatedProducts.length > 0">
      <h2 class="text-2xl font-bold mb-6">{{ t('product.relatedProducts') }}</h2>
      <ProductGrid :products="relatedProducts" />
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'
import ProductGrid from '@/components/product/ProductGrid.vue'
import jackets from '@/data/jackets'
import shoes from '@/data/shoes'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const allProducts = [...jackets, ...shoes]
const product = computed(() => allProducts.find(p => p.id === route.params.id))

const selectedImage = ref(product.value?.images[0])
const selectedSize = ref(product.value?.sizes[0] || '')
const selectedColor = ref(product.value ? (locale.value === 'km' ? product.value.colors[0] : product.value.colorsEn[0]) : '')
const quantity = ref(1)

const relatedProducts = computed(() => {
  if (!product.value) return []
  return allProducts.filter(p => p.category === product.value.category && p.id !== product.value.id).slice(0, 4)
})

function addToCart() {
  if (!product.value || !selectedSize.value) return
  cart.addItem(product.value, selectedSize.value, selectedColor.value, quantity.value)
  cart.toggleDrawer()
}

const colorMap = {
  'Black': '#1a1a1a', 'ខ្មៅ': '#1a1a1a',
  'White': '#ffffff', 'ស': '#ffffff',
  'Blue': '#2563eb', 'ខៀវ': '#2563eb',
  'Red': '#dc2626', 'ក្រហម': '#dc2626',
  'Green': '#16a34a', 'បៃតង': '#16a34a',
  'Brown': '#92400e', 'ត្នោត': '#92400e',
  'Gray': '#6b7280', 'ប្រេះ': '#6b7280',
}

function getColorHex(color) {
  return colorMap[color] || '#6b7280'
}
</script>
