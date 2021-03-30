import Vue from 'vue'
import "/css/common.css";

/**
 * 
 * @param {data} 从服务端请求过来的或预置在前端的数据
 * @returns 
 */
function init({component,router=null, store=null,data={}}={}) {
    const app = new Vue({
        propData:{
            data
        },
        store,
        router,
        render: (h) => h(component)
    });
    app.$mount('#app')
}
export {
    Vue,
    init
}