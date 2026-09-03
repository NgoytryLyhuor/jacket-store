<template>
  <div>
    <!-- Hero -->
    <section class="relative h-[70vh] min-h-[500px] flex items-center">
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop" alt="Hero" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <h1 class="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">{{ t('home.title') }}</h1>
        <p class="text-lg md:text-xl text-gray-200 mb-8">{{ t('home.subtitle') }}</p>
        <router-link to="/shop" class="btn-primary text-lg inline-block">{{ t('home.shopNow') }}</router-link>
      </div>
    </section>

    <!-- Categories -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h2 class="text-2xl md:text-3xl font-bold text-center mb-8">{{ t('home.categories') }}</h2>
      <div class="grid grid-cols-2 gap-4 md:gap-6">
        <router-link to="/shop/jacket" class="relative group rounded-2xl overflow-hidden aspect-[4/5]">
          <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop" alt="Jackets" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <div>
              <h3 class="text-white text-xl md:text-2xl font-bold">{{ t('home.allJackets') }}</h3>
              <span class="text-white/80 text-sm mt-1 inline-block">30+ {{ t('nav.jackets') }}</span>
            </div>
          </div>
        </router-link>
        <router-link to="/shop/shoe" class="relative group rounded-2xl overflow-hidden aspect-[4/5]">
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop" alt="Shoes" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <div>
              <h3 class="text-white text-xl md:text-2xl font-bold">{{ t('home.allShoes') }}</h3>
              <span class="text-white/80 text-sm mt-1 inline-block">30+ {{ t('nav.shoes') }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl md:text-3xl font-bold">{{ t('home.featured') }}</h2>
        <router-link to="/shop" class="text-primary-600 font-medium text-sm hover:underline flex items-center gap-1">
          {{ t('home.viewAll') }}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
      <ProductGrid :products="featuredProducts" />
    </section>

    <!-- Promo -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div class="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-3">{{ t('home.promoTitle') }}</h2>
        <p class="text-lg text-white/80 mb-6">{{ t('home.promoSubtitle') }}</p>
        <p class="text-sm text-white/60">{{ t('home.promoCode') }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProductGrid from '@/components/product/ProductGrid.vue'
import jackets from '@/data/jackets'
import shoes from '@/data/shoes'

const { t } = useI18n()

const featuredProducts = computed(() => {
  const all = [...jackets, ...shoes]
  return all.filter(p => p.isFeatured).slice(0, 8)
})
</script>
