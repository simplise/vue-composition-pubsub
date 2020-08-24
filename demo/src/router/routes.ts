import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'Primitive', component: () => import('pages/Primitive.vue') },
      { path: 'Message', component: () => import('pages/Message.vue') },
      { path: 'Product', component: () => import('pages/Product.vue') },
      { path: 'ProductList', component: () => import('pages/ProductList.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
