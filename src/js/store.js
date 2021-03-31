import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//用 symbol好些
const none = "NONE"
const _storeInfo = {
    state: {
        userInfo: none
 
    },
    mutations: {
        increment(state) {
            state.userInfo = state
        }
    }
}
function addStore({ state, mutations,canOverride=false }) {
    let keys = Object.keys(state)
    keys.forEach(key => {
        if (!canOverride && _storeInfo.state[key]) {
            throw `${key} exist in state`
        }
        _storeInfo.state[key] = state[key]
    })
    keys = Object.keys(mutations)
    keys.forEach(key => {
        if (!canOverride && _storeInfo.mutations[key]) {
            throw `${key} exist in mutations`
        }
        _storeInfo.mutations[key] = mutations[key]
    })
}

function getStore() {
    return new Vuex.Store(_storeInfo)
}
function getInfo() {
    return _storeInfo
}
export {
    none,
    getInfo,
    addStore,
    getStore
}