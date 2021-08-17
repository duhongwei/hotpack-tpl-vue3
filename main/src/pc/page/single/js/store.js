
import { getIndex } from '/api/page/index.js'
import { getAbout } from '/api/page/about.js'

export default {
  state: {
    about: null,
    index: null
  },
  mutations: {
    about(state, data) {
      state.about = data
    },
    index(state, data) {
      state.index = data
    }
  },
  actions: {
    async about({ commit, state }) {
      if (state.about) return state.about

      const data = await getAbout()
      commit('about', data)
      return data
    },
    async index({ commit, state }) {
      if (state.index) return state.index

      const data = await getIndex()
      commit('index', data)
      return data
    }
  }
}