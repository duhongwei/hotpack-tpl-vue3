import './index.html=>index.html'
import './css/index.css'
import Vuex from 'vuex'
import init from '/pc/js/init.b.js'
import component from './index.vue'
import storeInfo from './js/store.js'

const store = Vuex.createStore(storeInfo)

store.dispatch('user')

let app = init(component)
app.use(store)
//no state during development, unless you use the'-r' parameter 
if (window.__state__) {
  store.initState = window.__state__

}
else {
  //Convention, all initialization data will be completed in the init action
  store.dispatch('init')
}

app.mount('#app')