<template>
  <div v-if="cart.isDrawerOpen" class="fixed inset-0 z-[60]">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50" @click="cart.toggleDrawer()"></div>
    <!-- Drawer -->
    <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-lg font-bold">{{ t('cart.title') }} ({{ cart.totalItems }})</h2>
        <button @click="cart.toggleDrawer()" class="p-2 hover:bg-gray-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Items -->
      <div class="flex-1 overflow-y-auto p-4">
        <div v-if="cart.items.length === 0" class="flex flex-col items-center justify-center h-full text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <p class="text-lg font-medium">{{ t('cart.empty') }}</p>
          <button @click="cart.toggleDrawer(); router.push('/shop')" class="mt-4 text-primary-600 font-medium hover:underline">
            {{ t('cart.continueShopping') }}
          </button>
        </div>
        <div v-else class="space-y-4">
          <div v-for="(item, index) in cart.items" :key="index" class="flex gap-3 bg-gray-50 rounded-xl p-3">
            <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded-lg" />
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-sm truncate">{{ locale === 'km' ? item.name : item.nameEn }}</h3>
              <p class="text-xs text-gray-500 mt-0.5">{{ t('cart.size') }}: {{ item.size }} | {{ t('cart.color') }}: {{ item.color }}</p>
              <p class="text-sm font-bold text-primary-600 mt-1">${{ item.price.toFixed(2) }}</p>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center border rounded-lg">
                  <button @click="cart.updateQuantity(index, item.quantity - 1)" class="px-2 py-1 text-sm hover:bg-gray-100 rounded-l-lg">-</button>
                  <span class="px-3 py-1 text-sm font-medium">{{ item.quantity }}</span>
                  <button @click="cart.updateQuantity(index, item.quantity + 1)" class="px-2 py-1 text-sm hover:bg-gray-100 rounded-r-lg">+</button>
                </div>
                <button @click="cart.removeItem(index)" class="text-red-500 text-xs hover:underline">
                  {{ t('cart.remove') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="cart.items.length > 0" class="border-t p-4 space-y-3">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">{{ t('cart.subtotal') }}</span>
          <span class="font-bold">${{ cart.subtotal.toFixed(2) }}</span>
        </div>
        <button @click="cart.toggleDrawer(); router.push('/checkout')" class="w-full btn-primary text-center">
          {{ t('cart.checkout') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'

const { t, locale } = useI18n()
const router = useRouter()
const cart = useCartStore()
</script>
