import { init } from '/h5/js/init.server.js'
import component from './index.vue'

export default async function (Vue) {
    return init({ Vue, component })
    
  }
  
