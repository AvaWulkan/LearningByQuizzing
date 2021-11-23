import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)
const state = {
  loggedIn: false,
  loggedInAdmin: false,
  loggedInTeacher: false,
  loggedInStudent: false,
  activeUser: 0,
  quizChosen: false,
  onlyShowThree: false,
  fontSizeArrayH1: ["20px", "30px", "40px"],
  fontSizeArrayH2: ["16px", "20px", "24px"],
  fontSizeArrayP: ["12px", "16px", "20px"],
  fontSizeIndex: 0
}
const mutations = {
  setLoggedIn (state){
    state.loggedIn = true
  },
  setLoggedInStudent (state){
    state.loggedInAdmin = false
    state.loggedInTeacher = false
    state.loggedInStudent = true
  },
  setLoggedInTeacher (state){
    state.loggedInAdmin = false
    state.loggedInStudent = false
    state.loggedInTeacher = true
  },
  setLoggedInAdmin (state){
    state.loggedInTeacher = false
    state.loggedInStudent = false
    state.loggedInAdmin = true
  },
  setActiveUser (state, userId){
    state.activeUser = userId
  },
  setOnlyShowThreeToTrue (state){
    state.onlyShowThree = true
  },
  setOnlyShowThreeToFalse (state){
    state.onlyShowThree = false
  },
  logout(state){
    state.loggedIn= false,
    state.loggedInAdmin= false,
    state.loggedInTeacher= false,
    state.loggedInStudent= false,
    state.activeUser= 0,
    state.onlySHowThree = false,
    state.fontSizeIndex= 0
  },
  setQuizState(state){
    if(state.quizChosen === false)
    state.quizChosen = true
    else
    state.quizChosen = false
  },
  showPreviousResults(state){
    state.quizChosen = false
  },
  changefontSizeIndex(state){
    state.fontSizeIndex++
    if(state.fontSizeIndex === state.fontSizeArrayH1.length){
       state.fontSizeIndex = 0
    }
}


}
export default new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState()]
})