import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  count: 0,
  loggedIn: false,
  loggedInAdmin: false,
  loggedInTeacher: false,
  loggedInStudent: false,
}
const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  },
  setLoggedIn (state){
    state.loggedIn = true
  },
  setLoggedInStudent (state){
  state.loggedInStudent = true
  },
  setLoggedInTeacher (state){
    state.loggedInTeacher = true
  },
  setLoggedInAdmin (state){
    state.loggedInAdmin = true
  }
}
export default new Vuex.Store({
  state,
  mutations
})