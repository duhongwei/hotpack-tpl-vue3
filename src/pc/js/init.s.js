import { Vue } from '@duhongwei/hotpack-vue3'

export default async function (component) {
  const app = Vue.createSSRApp(component)
  return app
}