<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name : 'Home' }">Home | </router-link>
      <router-link :to="{ name : 'Login' }">Login | </router-link>
      <router-link :to="{ name : 'Admin' }">Admin | </router-link>
      <router-link :to="{ name : 'Quiz' }">Quiz</router-link>
    </div>
      <router-view @authenticated="setAuthenticated"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      authenticated:false,
      mockAccount:{
        username: "Ola",
        password: "javahov123"
      }
    }
  },
  mounted(){
    if(!this.authenticated){
      this.$router.replace({
        name: "Login"
      })
    }
  },
  methods:{
    setAuthenticated(status){
      this.authenticated = status
    },
    logout(){
      this.authenticated = false
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
</style>
