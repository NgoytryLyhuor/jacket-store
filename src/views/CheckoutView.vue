<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-10">
    <h1 class="text-2xl md:text-3xl font-bold mb-8">{{ t('checkout.title') }}</h1>

    <!-- Order Success -->
    <div v-if="orderPlaced" class="text-center py-20">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold mb-2">{{ locale === 'km' ? 'ការបញ្ជាទិញជោគជ័យ!' : 'Order Placed Successfully!' }}</h2>
      <p class="text-gray-500 mb-6">{{ locale === 'km' ? 'យើងនឹងទំនាក់ទំនងអ្នកឆាប់ៗនេះ។' : 'We will contact you soon.' }}</p>
      <router-link to="/" class="btn-primary inline-block">{{ t('nav.home') }}</router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Form -->
      <div class="lg:col-span-2">
        <form @submit.prevent="placeOrder" class="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
          <div>
            <label class="block text-sm font-medium mb-2">{{ t('checkout.name') }} *</label>
            <input v-model="form.name" type="text" class="input-field" :placeholder="t('checkout.name')" required />
            <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">{{ t('checkout.phone') }} *</label>
            <input v-model="form.phone" type="tel" class="input-field" placeholder="012 345 678" required />
            <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">{{ t('checkout.address') }} *</label>
            <input v-model="form.address" type="text" class="input-field" :placeholder="t('checkout.addressDetail')" required />
            <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">{{ t('checkout.notes') }}</label>
            <textarea v-model="form.notes" class="input-field" rows="3" :placeholder="t('checkout.notesPlaceholder')"></textarea>
          </div>
          <button type="submit" class="w-full btn-primary text-lg py-4">{{ t('checkout.placeOrder') }}</button>
        </form>
      </div>

      <!-- Summary -->
      <div class="lg:col-span-1">
        <div class="bg-gray-50 rounded-2xl p-6 sticky top-24">
          <h2 class="text-lg font-bold mb-4">{{ t('checkout.orderSummary') }}</h2>
          <div class="space-y-3 mb-4">
            <div v-for="item in cart.items" :key="item.id + item.size + item.color" class="flex gap-3">
              <img :src="item.image" class="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">{{ locale === 'km' ? item.name : item.nameEn }}</p>
                <p class="text-xs text-gray-500">{{ item.size }} | x{{ item.quantity }}</p>
                <p class="text-sm font-bold">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
          <div class="border-t pt-3 space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">{{ t('checkout.subtotal') }}</span>
              <span class="font-medium">${{ cart.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">{{ t('checkout.shipping') }}</span>
              <span class="text-green-600 font-medium">{{ t('checkout.free') }}</span>
            </div>
            <div class="border-t pt-3 flex justify-between">
              <span class="font-bold text-lg">{{ t('checkout.total') }}</span>
              <span class="font-bold text-lg text-primary-600">${{ cart.subtotal.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'

const { t, locale } = useI18n()
const cart = useCartStore()

const orderPlaced = ref(false)
const form = reactive({ name: '', phone: '', address: '', notes: '' })
const errors = reactive({ name: '', phone: '', address: '' })

function placeOrder() {
  errors.name = form.name ? '' : t('checkout.nameRequired')
  errors.phone = form.phone ? '' : t('checkout.phoneRequired')
  errors.address = form.address ? '' : t('checkout.addressRequired')

  if (errors.name || errors.phone || errors.address) return

  orderPlaced.value = true
  cart.clearCart()
}
</script>
