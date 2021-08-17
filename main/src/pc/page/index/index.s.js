import './index.html=>index.html'

import init from '/pc/js/init.s.js'
import component from './index.vue'
import storeInfo from './js/store.js'
import { Vuex } from '@duhongwei/hotpack-vue3'

export default async function () {
    let store = Vuex.createStore(storeInfo)
    const state = await store.dispatch('init')
    let app = await init(component)
    app.use(store)
    return {
        app,
        state
    }
}