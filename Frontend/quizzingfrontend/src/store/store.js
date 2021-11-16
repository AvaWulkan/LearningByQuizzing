import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  loggedIn: false,
  loggedInAdmin: false,
  loggedInTeacher: false,
  loggedInStudent: false,
  activeUser: 0,
  quizChosen: false
}
const mutations = {
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
  },
  setActiveUser (state, userId){
    state.activeUser = userId
  },
  logout(state){
    state.loggedIn = false,
    state.loggedInAdmin = false,
    state.loggedInTeacher = false,
    state.loggedInStudent = false,
    state.activeUser = 0
  },
  setQuizState(state){
    if(state.quizChosen === false)
    state.quizChosen = true
    else
    state.quizChosen = false
  },
  showPreviousResults(state){
    state.quizChosen = false
  }


}
export default new Vuex.Store({
  state,
  mutations
})