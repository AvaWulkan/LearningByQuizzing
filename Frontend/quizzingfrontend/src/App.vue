<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name : 'Home' }">Home | </router-link>
      <router-link :to="{ name : 'Login' }">Login | </router-link>
      <router-link :to="{ name : 'Admin' }">Admin | </router-link>
      <router-link :to="{ name : 'Quiz' }">Quiz | </router-link>
      <router-link :to="{ name : 'CreateQuiz' }">Create Quiz</router-link>
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
#nav router-link {
  font-weight: normal;
  display: inline-block;
  justify-content: center;
  text-align: center;
  width: 20%;
  font-size: 20px;
  padding: 20px;
}
#nav router-link:hover {
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
</style>
