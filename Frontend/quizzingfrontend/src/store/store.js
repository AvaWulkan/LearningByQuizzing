import Vue from 'vue'
import Vuex from 'vuex'

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
  fontSizeIndex: 0
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
  setOnlyShowThreeToTrue (state){
    state.onlyShowThree = true
  },setOnlyShowThreeToFalse (state){
    state.onlyShowThree = false
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
  },
  changefontSizeIndex(state){
    state.fontSizeIndex++
    if(this.fontSizeIndex === this.fontSizeArrayH1.length){
       this.fontSizeIndex = 0
    }
}


}
export default new Vuex.Store({
  state,
  mutations
})