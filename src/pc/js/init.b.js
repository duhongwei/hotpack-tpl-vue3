import toast from '/pc/vue/toast/index.js'
import Vue from 'vue'

import "/css/common.css";

export default function (component) {

  const app = Vue.createApp(component)

  app.use(toast)

  return app

}