<template>
  <div class="home">
<div v-if="$store.state.loggedInAdmin">
  <h2>Lägg till lärare</h2>
  <AddUser/>
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
  components:{
    Statistics,
    AddUser,
    StudentResults
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

/* <p>bajs</p>
<p>{{$store.state.loggedIn}}</p>
<p>{{$store.state.loggedInAdmin}}</p>
<button @click="setLoggedInStudent">Student</button>
<button @click="setLoggedInTeacher">Teacher</button>
<button @click="setLoggedInAdmin">Admin</button>
<p>DET HÄR FUNKAR {{$store.state.activeUser}}</p>
*/ 
</script>

