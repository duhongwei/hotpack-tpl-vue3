import './index.html=>index.html'
import { init } from '/pc/js/init.js'
import component from './index.vue'
/**
 * 可以override默认的登录store，或加新的 store 
 * import {addStore, getStore, } from '/js/store.js'
 * addStore({state:{userInfo:false,mutations:{}})
 * 如果是同构的模式，服务端执行的时候可以直接确认登录状态，前端可以通过页面中的 window.__store__让store获得初始化
 */

let data = Promise.resolve({})

const app = init({ component,data})

if (typeof global == 'undefined') {
    app.then(app => {
        app.$mount('#app')    
    })
}
export default function(){
    return app
}

