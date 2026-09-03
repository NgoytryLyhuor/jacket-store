<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-10">
    <h1 class="text-2xl md:text-3xl font-bold mb-8">{{ t('cart.title') }}</h1>

    <div v-if="cart.items.length === 0" class="text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
      <p class="text-xl text-gray-400 mb-6">{{ t('cart.empty') }}</p>
      <router-link to="/shop" class="btn-primary inline-block">{{ t('cart.continueShopping') }}</router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Items -->
      <div class="lg:col-span-2 space-y-4">
        <div v-for="(item, index) in cart.items" :key="index" class="flex gap-4 bg-white border border-gray-200 rounded-2xl p-4">
          <img :src="item.image" :alt="item.name" class="w-24 h-28 md:w-32 md:h-36 object-cover rounded-xl flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-base truncate">{{ locale === 'km' ? item.name : item.nameEn }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ t('cart.size') }}: {{ item.size }} | {{ t('cart.color') }}: {{ item.color }}</p>
            <p class="text-lg font-bold text-primary-600 mt-2">${{ item.price.toFixed(2) }}</p>
            <div class="flex items-center justify-between mt-3">
              <div class="flex items-center border-2 rounded-xl">
                <button @click="cart.updateQuantity(index, item.quantity - 1)" class="px-3 py-1.5 text-sm hover:bg-gray-50 rounded-l-xl transition-colors">-</button>
                <span class="px-4 py-1.5 text-sm font-medium">{{ item.quantity }}</span>
                <button @click="cart.updateQuantity(index, item.quantity + 1)" class="px-3 py-1.5 text-sm hover:bg-gray-50 rounded-r-xl transition-colors">+</button>
              </div>
              <button @click="cart.removeItem(index)" class="text-red-500 text-sm font-medium hover:underline">
                {{ t('cart.remove') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="lg:col-span-1">
        <div class="bg-gray-50 rounded-2xl p-6 sticky top-24">
          <h2 class="text-lg font-bold mb-4">{{ t('checkout.orderSummary') }}</h2>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">{{ t('cart.subtotal') }} ({{ cart.totalItems }} {{ t('nav.shop') }})</span>
              <span class="font-medium">${{ cart.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">{{ t('checkout.shipping') }}</span>
              <span class="text-green-600 font-medium">{{ t('checkout.free') }}</span>
            </div>
            <div class="border-t pt-3 flex justify-between">
              <span class="font-bold text-lg">{{ t('cart.total') }}</span>
              <span class="font-bold text-lg text-primary-600">${{ cart.subtotal.toFixed(2) }}</span>
            </div>
          </div>
          <router-link to="/checkout" class="btn-primary w-full text-center mt-6 block">
            {{ t('cart.checkout') }}
          </router-link>
          <router-link to="/shop" class="text-primary-600 text-sm font-medium hover:underline block text-center mt-4">
            {{ t('cart.continueShopping') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'

const { t, locale } = useI18n()
const cart = useCartStore()
</script>
