import Vue from 'vue'
import "/css/common.css";
import { getStore, } from '/js/store.js'

/**
 * 
 * @param {data} 从服务端请求过来的或预置在前端的数据
 * @returns 
 */
function init({ component, router = null, store = getStore(), data = Promise.resolve() }) {
   return data.then(data => {
        return new Vue({
            propData: {
                data
            },
            store,
            router,
            render: (h) => h(component)
        });
    })
}
export {
    Vue,
    init
};