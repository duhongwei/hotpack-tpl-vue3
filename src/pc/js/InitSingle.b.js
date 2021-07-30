/**
 * 启动单页应用
 * 
 * 如果是多页，请用 multiInit.js
 */

import VueRouter from 'vue-router'

import toast from '/pc/vue/toast/index.js'
import Vue from 'vue'

import "/css/common.css";

export default function({ component,store,routes }) {
    if (window.__state__) {
        const state = window.__state__
        //在开发的时候不会有state,除非用 '-r' 参数指定用服务端渲染
        if (state) {
            for (let key in state) {
                store.commit(key, state[key])
            }
        }
    }
    // 创建路由实例并传递 `routes` 配置
    const router = VueRouter.createRouter({
        history: VueRouter.createWebHistory(),
        routes
    })
  
   
    const app = Vue.createApp(component)

    app.use(store)
    app.use(toast)
    app.use(router)
    app.mount('#app')
}
