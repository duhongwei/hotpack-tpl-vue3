import Vue from 'vue'
import VueRouter from 'vue-router'

export default async function ({ component, store, routes, ctx }) {

    // 创建路由实例并传递 `routes` 配置
    const router = VueRouter.createRouter({
        history: VueRouter.createMemoryHistory(),
        routes
    })

    const app = Vue.createSSRApp(component)
    app.use(store)
    app.use(router)

    //预渲染没有 ctx 且只能预渲染默认页面
    router.push(ctx.originalUrl || '/')
    await router.isReady()
    let components = null
    router.currentRoute.value.matched.flatMap(record => {
        components = Object.values(record.components)
    })

    let state = {}
    for (let c of components) {
        let data = await c.getAsyncData(store,ctx)
        state[c.name] = data
    }
    return {
        app,
        state
    }
}
