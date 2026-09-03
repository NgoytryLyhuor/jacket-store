<template>
  <router-link :to="`/product/${product.id}`" class="group bg-white rounded-2xl overflow-hidden card-shadow block">
    <div class="relative aspect-[3/4] overflow-hidden bg-gray-100">
      <img :src="product.images[0]" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      <div v-if="product.isNew" class="absolute top-3 left-3 bg-primary-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">NEW</div>
      <div v-if="product.originalPrice" class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
        -{{ Math.round((1 - product.price / product.originalPrice) * 100) }}%
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-medium text-sm text-gray-900 truncate">{{ locale === 'km' ? product.name : product.nameEn }}</h3>
      <p class="text-xs text-gray-400 mt-1 capitalize">{{ product.subcategory }}</p>
      <div class="flex items-center gap-2 mt-2">
        <span class="text-lg font-bold text-primary-600">${{ product.price.toFixed(2) }}</span>
        <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">${{ product.originalPrice.toFixed(2) }}</span>
      </div>
      <div class="flex items-center gap-1 mt-2">
        <div class="flex">
          <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5" :class="i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        <span class="text-xs text-gray-400">({{ product.reviews }})</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

defineProps({
  product: { type: Object, required: true }
})
</script>
