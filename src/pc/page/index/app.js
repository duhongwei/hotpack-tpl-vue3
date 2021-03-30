import './index.html=>index.html'
import { init } from '/pc/js/init.js'
import component from './index.vue'
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

