import './index.html=>single.html'
import init from '/pc/js/init.s.js'
import component from './index.vue'
import storeInfo from './js/store.js'
import routes from './js/routes.js'
import { VueRouter,Vuex } from '@duhongwei/hotpack-vue3'

export default async function (ctx = {}) {
    const store = Vuex.createStore(storeInfo)
    const router = VueRouter.createRouter({
        history: VueRouter.createMemoryHistory(),
        routes: routes
    })

    const app = await init(component)
    app.use(store)
    app.use(router)

    //pre-rendering does not have ctx and can only pre-render the default page
    const url = ctx.originalUrl || '/single'

    router.push(url)
    await router.isReady()
    let components = null
    router.currentRoute.value.matched.flatMap(record => {
        components = Object.values(record.components)
    })

    let promiseList = components.map(item => item.ssr(store, ctx))

    await Promise.all(promiseList)
   
    return {
        pageData: {
            title: router.currentRoute.value.meta.title
        },
        app,
        state: store.state
    }
}