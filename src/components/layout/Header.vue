<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="text-xl font-bold text-primary-600">
          JACKET STORE
        </router-link>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-sm font-medium hover:text-primary-600 transition-colors">
            {{ t('nav.home') }}
          </router-link>
          <router-link to="/shop" class="text-sm font-medium hover:text-primary-600 transition-colors">
            {{ t('nav.shop') }}
          </router-link>
          <router-link to="/shop/jacket" class="text-sm font-medium hover:text-primary-600 transition-colors">
            {{ t('nav.jackets') }}
          </router-link>
          <router-link to="/shop/shoe" class="text-sm font-medium hover:text-primary-600 transition-colors">
            {{ t('nav.shoes') }}
          </router-link>
        </nav>

        <!-- Right Side -->
        <div class="flex items-center space-x-4">
          <!-- Language Toggle -->
          <button @click="toggleLang" class="text-xs font-medium border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
            {{ locale === 'km' ? 'EN' : 'ខ្មែរ' }}
          </button>

          <!-- Cart -->
          <button @click="router.push('/cart')" class="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span v-if="cart.totalItems > 0" class="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {{ cart.totalItems }}
            </span>
          </button>

          <!-- Mobile Menu Toggle -->
          <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Nav -->
      <transition name="slide">
        <div v-if="mobileOpen" class="md:hidden pb-4 border-t">
          <nav class="flex flex-col space-y-2 pt-4">
            <router-link to="/" @click="mobileOpen = false" class="px-4 py-2 rounded-lg hover:bg-gray-50 font-medium">
              {{ t('nav.home') }}
            </router-link>
            <router-link to="/shop" @click="mobileOpen = false" class="px-4 py-2 rounded-lg hover:bg-gray-50 font-medium">
              {{ t('nav.shop') }}
            </router-link>
            <router-link to="/shop/jacket" @click="mobileOpen = false" class="px-4 py-2 rounded-lg hover:bg-gray-50 font-medium">
              {{ t('nav.jackets') }}
            </router-link>
            <router-link to="/shop/shoe" @click="mobileOpen = false" class="px-4 py-2 rounded-lg hover:bg-gray-50 font-medium">
              {{ t('nav.shoes') }}
            </router-link>
          </nav>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'

const { t, locale } = useI18n()
const router = useRouter()
const cart = useCartStore()
const mobileOpen = ref(false)

function toggleLang() {
  locale.value = locale.value === 'km' ? 'en' : 'km'
  localStorage.setItem('lang', locale.value)
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  max-height: 0;
}
.slide-enter-to, .slide-leave-from {
  opacity: 1;
  max-height: 300px;
}
</style>
