import Vue from 'vue'
import "/css/common.css";

/**
 * 
 * @param {data} 从服务端请求过来的或预置在前端的数据
 * @returns 
 */
function init({ component, router = null, store = null, data = Promise.resolve() }) {
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