<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
    <div class="flex items-center justify-around h-16">
      <router-link to="/" class="flex flex-col items-center justify-center flex-1 h-full" :class="route.path === '/' ? 'text-primary-600' : 'text-gray-500'">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="text-xs mt-1 font-medium">{{ t('nav.home') }}</span>
      </router-link>

      <router-link to="/shop" class="flex flex-col items-center justify-center flex-1 h-full" :class="route.path.startsWith('/shop') ? 'text-primary-600' : 'text-gray-500'">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span class="text-xs mt-1 font-medium">{{ t('nav.shop') }}</span>
      </router-link>

      <router-link to="/cart" class="flex flex-col items-center justify-center flex-1 h-full relative" :class="route.path === '/cart' ? 'text-primary-600' : 'text-gray-500'">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <span class="text-xs mt-1 font-medium">{{ t('nav.cart') }}</span>
        <span v-if="cart.totalItems > 0" class="absolute top-1 right-1/4 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium -translate-y-0.5">
          {{ cart.totalItems }}
        </span>
      </router-link>

      <button class="flex flex-col items-center justify-center flex-1 h-full text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-xs mt-1 font-medium">{{ t('nav.home') }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const { t } = useI18n()
const cart = useCartStore()
</script>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>
