
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
    async about({ commit,state }) {
      if (state.about) return state.about
      
      const aboutData = await getAbout()
      commit('about', aboutData)
      return aboutData
    },
    async home({ commit,state }) {
      if (state.home) return state.home
      
      const homeData = await getHome()
      commit('home', homeData)
      return homeData
    }
  }
}