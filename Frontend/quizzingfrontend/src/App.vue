<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name : 'Home' }"><span v-on:click="$store.commit('setOnlyShowThreeToFalse')">Startsida | </span></router-link>
      <router-link v-if="$store.state.loggedInStudent" :to="{ name : 'Quiz' }"><span v-on:click="$store.commit('setOnlyShowThreeToTrue')">Quiz | </span></router-link>
      <router-link v-if="$store.state.loggedInTeacher" :to="{ name : 'CreateQuiz' }">Skapa Quiz | </router-link>
      <router-link v-if="!$store.state.loggedIn" :to="{ name : 'Login' }">Logga in </router-link>
      <router-link v-else :to="{ name : 'Login' }"><span v-on:click="logout">Logga ut</span></router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
    }
  },
  methods:{
    logout(){
      this.$store.commit('logout')  
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
ul{
  margin: 0;
  padding: 0;
}
#nav {
  width: 100%;
  text-align: center;
}
#nav li {
  font-weight: normal;
  display: inline-block;
  justify-content: center;
  text-align: center;
  width: 20%;
  font-size: 20px;
  padding: 20px;
}
#nav li:hover {
  cursor: pointer;
  color: darkgray;
}
ul {
  list-style-type: none;
}
button{
  font-size: 20px;
  border-radius: 10px;
}
.border {
  border: 2px solid black;
  border-radius: 16px;
}
.shadow {
  box-shadow: 5px 10px rgba(160,160,160, 0.6);
}
</style>
