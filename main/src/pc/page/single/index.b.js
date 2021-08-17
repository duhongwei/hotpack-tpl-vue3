import './index.html=>single.html'
import './css/index.css'
import VueRouter from 'vue-router'
import init from '/pc/js/init.b.js'
import component from './index.vue'
import storeInfo from './js/store'
import routes from './js/routes'
import Vuex from 'vuex'

//no state during development, unless you use the'-r' parameter to specify server-side rendering
if (window.__state__) {
  storeInfo.state = window.__state__
}
const store = Vuex.createStore(storeInfo)

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: routes
})

router.beforeResolve((to) => {   
  if (to.meta.title) {
    document.title = to.meta.title
  }
  to.matched.forEach(record => {
    const components = Object.values(record.components)
    components.forEach(item => {
      if (item.ssr) {
        item.ssr(store)
      }
    })
  })
})
const app = init(component)

app.use(store)
app.use(router)

app.mount('#app')
