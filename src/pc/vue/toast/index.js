import Vue from 'vue'
import Toast from './index.vue'
export default {
  install(app) {
    const toast = Vue.createApp(Toast);
    const toastWrapper = document.createElement('div');
    toastWrapper.id = 'js-toast';
    document.body.appendChild(toastWrapper);
    const vm = toast.mount('#js-toast');

    document.body.appendChild(vm.$el);
    app.config.globalProperties.$toast = function (msg) {
      vm.show(msg)
    }
  }
}