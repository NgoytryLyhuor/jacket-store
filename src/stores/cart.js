import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('cart') || '[]'))
  const isDrawerOpen = ref(false)

  watch(items, (val) => {
    localStorage.setItem('cart', JSON.stringify(val))
  }, { deep: true })

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  function addItem(product, size, color, quantity = 1) {
    const existing = items.value.find(
      (i) => i.id === product.id && i.size === size && i.color === color
    )
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        nameEn: product.nameEn,
        price: product.price,
        image: product.images[0],
        size,
        color,
        quantity,
      })
    }
  }

  function removeItem(index) {
    items.value.splice(index, 1)
  }

  function updateQuantity(index, quantity) {
    if (quantity <= 0) {
      removeItem(index)
    } else {
      items.value[index].quantity = quantity
    }
  }

  function clearCart() {
    items.value = []
  }

  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  return { items, isDrawerOpen, totalItems, subtotal, addItem, removeItem, updateQuantity, clearCart, toggleDrawer }
})
