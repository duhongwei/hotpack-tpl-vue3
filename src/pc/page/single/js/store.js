
import { getHome } from '/api/page/home.js'
import { getAbout } from '/api/page/about.js'

export default {
  state: {
    about: null,
    home: null
  },
  mutations: {
    about(state, data) {
      state.about = data
    },
    home(state, data) {
      state.home = data
    }
  },
  actions: {
    async about({ commit }) {
      const aboutData = await getAbout()
      commit('about', aboutData)
      return aboutData
    },
    async home({ commit }) {
      const homeData = await getHome()
      commit('home', homeData)
      return homeData
    }
  }
}