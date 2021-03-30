/**
 * 
 * @param {data} 从服务端请求过来的或预置在前端的数据
 * @returns 
 */
function init({component,Vue,store=null,data={}}={}) {
    return new Vue({
        propData:{
            data
        },
        store,
        render: (h) => h(component)
    });
    //app.$mount('#app')
}
export {
    init
}