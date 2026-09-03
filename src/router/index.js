import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/HomeView.vue') },
  { path: '/shop', name: 'Shop', component: () => import('@/views/ShopView.vue') },
  { path: '/shop/:category', name: 'ShopCategory', component: () => import('@/views/ShopView.vue') },
  { path: '/product/:id', name: 'ProductDetail', component: () => import('@/views/ProductDetailView.vue') },
  { path: '/cart', name: 'Cart', component: () => import('@/views/CartView.vue') },
  { path: '/checkout', name: 'Checkout', component: () => import('@/views/CheckoutView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

export default router
