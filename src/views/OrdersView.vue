<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-10">
    <h1 class="text-2xl md:text-3xl font-bold mb-8">{{ locale === 'km' ? 'ការបញ្ជាទិញរបស់ខ្ញុំ' : 'My Orders' }}</h1>

    <div v-if="orders.length === 0" class="text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622A12.956 12.956 0 0021 9c0-1.036-.158-2.04-.382-3.016z" />
      </svg>
      <p class="text-xl text-gray-400 mb-6">{{ locale === 'km' ? 'អ្នកមិនទាន់មានការបញ្ជាទិញទេ។' : "You don't have any orders yet." }}</p>
      <router-link to="/shop" class="btn-primary inline-block">{{ t('nav.shop') }}</router-link>
    </div>

    <div v-else class="space-y-4">
      <div v-for="order in orders" :key="order.orderNumber" class="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <p class="text-sm text-gray-500">{{ locale === 'km' ? 'លេខបញ្ជាទិញ' : 'Order' }}: <span class="font-bold text-primary-600">{{ order.orderNumber }}</span></p>
            <p class="text-xs text-gray-400">{{ formatDate(order.createdAt) }}</p>
          </div>
          <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-700">
            {{ statusText(order.status) }}
          </span>
        </div>

        <div class="space-y-2 border-t pt-4">
          <div v-for="(item, i) in order.items" :key="i" class="flex justify-between text-sm">
            <span class="text-gray-700">{{ locale === 'km' ? item.name : item.nameEn }}
              <span class="text-gray-400">({{ item.size }} | {{ item.color }} × {{ item.quantity }})</span>
            </span>
            <span class="font-medium">${{ (item.quantity * item.price).toFixed(2) }}</span>
          </div>
        </div>

        <div class="flex justify-between border-t pt-3 mt-3 text-base">
          <span class="text-gray-500">{{ locale === 'km' ? 'សរុប' : 'Total' }}</span>
          <span class="font-bold text-primary-600">${{ Number(order.subtotal || 0).toFixed(2) }}</span>
        </div>

        <div class="border-t mt-3 pt-3 text-xs text-gray-500 space-y-1">
          <p><span class="font-medium">{{ locale === 'km' ? 'ឈ្មោះ' : 'Name' }}:</span> {{ order.customer.name }}</p>
          <p><span class="font-medium">{{ locale === 'km' ? 'ទូរស័ព្ទ' : 'Phone' }}:</span> {{ order.customer.phone }}</p>
          <p><span class="font-medium">{{ locale === 'km' ? 'អាសយដ្ឋាន' : 'Address' }}:</span> {{ order.customer.address }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const orders = ref([])

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString(locale.value === 'km' ? 'km-KH' : 'en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

function statusText(status) {
  if (locale.value === 'km') {
    return status === 'completed' ? 'បញ្ចប់' : 'រង់ចាំទំនាក់ទំនង'
  }
  return status === 'completed' ? 'Completed' : 'Pending'
}

onMounted(() => {
  try {
    orders.value = JSON.parse(localStorage.getItem('orders') || '[]')
  } catch (e) {
    orders.value = []
  }
})
</script>