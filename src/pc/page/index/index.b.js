import './index.html=>index.html'
import './css/index.css'
import init from '/pc/js/InitSingle.b.js'
import component from './index.vue'
import getStore from './js/store.js'
import routes from './js/routes.js'

init({ component,store:getStore(),routes })

