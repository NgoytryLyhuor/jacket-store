import { createRouter, createWebHistory } from 'vue-router'
import jackets from '@/data/jackets'
import shoes from '@/data/shoes'

const allProducts = [...jackets, ...shoes]
const BASE_URL = 'https://pop-jacket.vercel.app'
const SITE_NAME = 'Jacket Store'
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&h=630&fit=crop'

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCannonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

function setJsonLd(schema) {
  let el = document.querySelector('script[data-seo="jsonld"]')
  if (!el) {
    el = document.createElement('script')
    el.setAttribute('type', 'application/ld+json')
    el.setAttribute('data-seo', 'jsonld')
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(schema)
}

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

router.afterEach((to) => {
  const path = to.path
  const url = BASE_URL + path

  let title = `${SITE_NAME} | ហាងអាវធំ និងស្បែកជើងគុណភាពខ្ពស់`
  let description = 'ហាងអាវធំ និងស្បែកជើងគុណភាពខ្ពស់។ Premium jackets, coats & shoes with free delivery in Cambodia.'
  let image = DEFAULT_IMAGE
  let type = 'website'
  let schema = null

  // Shop pages
  if (path.startsWith('/shop')) {
    if (path.includes('/jacket')) {
      title = 'អាវធំបុរស និងស្ត្រី | ' + SITE_NAME
      description = 'ប្រមូលអាវធំគុណភាពខ្ពស់សម្រាប់បុរស និងស្ត្រី - Leather, Denim, Bomber, Windbreaker ជាដើម។ Shop jackets online with free delivery in Cambodia.'
    } else if (path.includes('/shoe')) {
      title = 'ស្បែកជើងបុរស និងស្ត្រី | ' + SITE_NAME
      description = 'ស្បែកជើងគុណភាពខ្ពស់សម្រាប់បុរស និងស្ត្រី - Sneakers, Boots, Sandals, Formal Shoes ជាដើម។ Shop shoes online in Cambodia.'
    } else {
      title = 'Shop អាវធំ និងស្បែកជើងទាំងអស់ | ' + SITE_NAME
      description = 'ទិញអាវធំ និងស្បែកជើងគុណភាពខ្ពស់តាមអនឡាញ។ Shop all jackets and shoes with free delivery in Cambodia.'
    }
    schema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': title,
      'url': url,
      'description': description
    }
  }

  // Product pages
  if (path.startsWith('/product/')) {
    const id = to.params.id
    const product = allProducts.find(p => p.id === id)
    if (product) {
      title = `${product.nameEn} | ${SITE_NAME}`
      description = product.descriptionEn
      image = product.images[0]
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.nameEn,
        'image': product.images,
        'description': product.descriptionEn,
        'brand': { '@type': 'Brand', 'name': SITE_NAME },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': product.rating,
          'reviewCount': product.reviews
        },
        'offers': {
          '@type': 'Offer',
          'url': url,
          'priceCurrency': 'USD',
          'price': product.price.toFixed(2),
          'availability': product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
        }
      }
    }
  }

  // Cart / Checkout
  if (path === '/cart') {
    title = `រទះភ្លោះ | ${SITE_NAME}`
    description = 'មើលរទះភ្លោះរបស់អ្នក ហើយបញ្ជាទិញតាមអនឡាញ។ View your cart and place your order.'
  }
  if (path === '/checkout') {
    title = `Checkout | ${SITE_NAME}`
    description = 'ពិនិត្យចេញ និងបញ្ជាទិញ។ Complete your order with free delivery in Cambodia.'
  }

  document.title = title
  setMeta('description', description)
  setMeta('og:title', title, 'property')
  setMeta('og:description', description, 'property')
  setMeta('og:url', url, 'property')
  setMeta('og:image', image, 'property')
  setMeta('og:type', type, 'property')
  setMeta('twitter:title', title, 'name')
  setMeta('twitter:description', description, 'name')
  setMeta('twitter:image', image, 'name')
  setCannonical(url)
  if (schema) setJsonLd(schema)
})

export default router
