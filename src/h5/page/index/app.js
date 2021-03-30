import './index.html=>wap/index.html'
import { init } from '/h5/js/init.js'
import component from './index.vue'
const data=Promise.resolve()
const app = init({ component, data })

if (typeof global === 'undefined') {
    app.then(app => {
        app.$mount("#app")    
    })
}
export default function () {
    return app
}