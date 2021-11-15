<template>
  <div class="home">
<p>bajs</p>
<p>{{$store.state.loggedIn}}</p>
<p>{{$store.state.loggedInAdmin}}</p>
<button @click="setLoggedInStudent">Student</button>
<button @click="setLoggedInTeacher">Teacher</button>
<button @click="setLoggedInAdmin">Admin</button>
<p>DET HÄR FUNKAR {{$store.state.activeUser}}</p>

  </div>
</template>

<script>
export default{
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
