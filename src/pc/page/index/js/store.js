import { getIndex } from '/api/page/index.js'
import { getUser } from '/api/page/user.js'

export default {
  state: {
    initData: null,
    user: null
  },
  mutations: {
    init(state, data) {
      state.initData = data
    },
    user(state, data) {
      state.user = data
    }
  },
  actions: {
    async init({ commit }) {
      const data = await getIndex()
      commit('init', data)
      return data
    },
    async user({ commit }) {
      const data = await getUser()
      commit('user', data)
      return data
    }
  }
}