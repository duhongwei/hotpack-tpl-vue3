
const routes = [
  {
    path: '/single',
    component: () => import('../vue/index.vue'),
    meta: {
      title: 'index page',
      ssr: (store) => { store.dispath('index') }
    }
  },
  {
    path: '/single/about',
    component: () => import('../vue/about.vue'),
    meta: {
      title: 'about page'
    }
  },
]
routes.forEach(item => {
  item.meta = item.meta || {}
})

export default routes