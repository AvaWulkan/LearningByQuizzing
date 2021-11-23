<template>
  <div class="home">
    <div v-if="$store.state.loggedInAdmin">
      <h2>Lägg till lärare</h2>
      <AddUser/>
      <Statistics/>
    </div>
    <div v-if="$store.state.loggedInTeacher">
      <h2>Lägg till elev</h2>
      <AddUser/>
      <Statistics/>
    </div>
    <div v-if="$store.state.loggedInStudent">
      <h2>Välkommen skitunge!</h2>
      <StudentResults/>
    </div>
  </div>
</template>

<script>
import AddUser from '../components/AddUser.vue'
import StudentResults from '../components/StudentResults.vue'
import Statistics from "../components/Statistics";

export default{
  beforeMount() {
    this.$store.commit('setOnlyShowThreeToFalse')
  },
  components:{
    AddUser,
    StudentResults,
    Statistics
  },
  methods: {
    setLoggedInStudent(){
      this.$store.commit('setLoggedInStudent')
    },
    setLoggedInTeacher(){
      this.$store.commit('setLoggedInTeacher')
    },
    setLoggedInAdmin(){
      this.$store.commit('setLoggedInAdmin')
    }
  }
}
</script>

<style scoped>
/* MOBILE FIRST */

/* Tablet */
@media screen and (min-width: 768px) and (max-width: 1024px) {

}

/* Desktop */
@media screen and (min-width: 1025px) {

}

</style>