import './index.html=>index.html'
import init from '/pc/js/initSingle.s.js'
import component from './index.vue'
import getStore from './js/store.js'
import routes from './js/routes.js'


export default async function (ctx = {}) {
    let store = getStore()

    return init({ component, routes, store, ctx })
}