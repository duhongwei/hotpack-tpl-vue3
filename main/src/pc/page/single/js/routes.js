
const routes= [
  {
    path: '/single',
    component: () => import('../vue/home.vue'),
    meta: {
      title: 'index page'
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