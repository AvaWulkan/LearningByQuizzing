import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  count: 0,
  loggedIn: false
}
const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  },
  setLoggedInTrue (state){
  state.loggedIn = true
  },
  setLoggedInFalse (state){
    state.loggedIn = false
  }
}
export default new Vuex.Store({
  state,
  mutations
})