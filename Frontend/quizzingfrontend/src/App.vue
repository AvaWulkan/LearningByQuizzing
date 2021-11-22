<template>
  <div id="app">
    
    <nav id="nav" v-if="$store.state.loggedIn">
      <img class="productlogo" width="200" src="./assets/LearningByQuizzingLogga.png" alt="">
      <router-link :to="{ name : 'Home' }"><span @click="$store.commit('setOnlyShowThreeToFalse')">Startsida | </span></router-link>
      <router-link v-if="$store.state.loggedInStudent" :to="{ name : 'Quiz' }"><span @click="$store.commit('setOnlyShowThreeToTrue')">Quiz | </span></router-link>
      <router-link v-if="$store.state.loggedInTeacher" :to="{ name : 'CreateQuiz' }">Skapa Quiz | </router-link>
      <router-link v-if="!$store.state.loggedIn" :to="{ name : 'Login' }">Logga in </router-link>
      <router-link v-else :to="{ name : 'Login' }"><span @click="logout">Logga ut</span></router-link>
    </nav> 
    <button @click="changeFontSize()">Ändra textstorlek</button>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return{

    }
  },
  methods:{
    logout(){
      this.$store.commit('logout')  
    },
    displayUserSpecifiedFontSize(){
      let h1 = document.querySelectorAll('h1')
      let h2 = document.querySelectorAll('h2')
      let p = document.querySelectorAll('p')
      for (let i = 0; i < h1.length; i++) {
        h1[i].style.fontSize = this.$store.state.fontSizeArrayH1[this.$store.state.fontSizeIndex]
      }
      for (let i = 0; i < h2.length; i++) {
        h2[i].style.fontSize = this.$store.state.fontSizeArrayH2[this.$store.state.fontSizeIndex]

      }
      for (let i = 0; i < p.length; i++) {
        p[i].style.fontSize = this.$store.state.fontSizeArrayP[this.$store.state.fontSizeIndex]
      }

    },
    changeFontSize(){
      this.$store.commit('changefontSizeIndex')
      this.displayUserSpecifiedFontSize()
    }



  }
}
</script>

<style>

/* MOBILE FIRST */ 
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
  display: grid;
  grid-template-columns: 250px repeat(3, 1fr);
  grid-template-areas: 
  "img a a a";
}


#nav li {
  font-weight: normal;
  display: inline-block;
  justify-content: center;
  text-align: center;
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
/* button{
  font-size: 20px;
  border-radius: 10px;
} */


button {
  align-items: center;
  background-clip: padding-box;
  background-color: rgb(194, 208, 245);
  border: 1px solid transparent;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

button:hover,
button:focus {
  background-color: rgb(181, 192, 225);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  background-color: #c85000;
  box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
  transform: translateY(0);
}
table {
  border-style: double;
  border-collapse: collapse;
}
td {
  text-align: center;
  padding: 10px 30px 10px 30px;
}
tr {
  border-bottom: 1px solid black;
}
th {
  padding: 10px;
}
/* Utilities */
.border {
  border: 2px solid black;
  border-radius: 16px;
}
.shadow {
  box-shadow: 5px 10px rgba(160,160,160, 0.6);
}

/* Tablet */
@media screen and (min-width: 768px) and (max-width: 1024px) {

}

/* Desktop */
@media screen and (min-width: 1025px) {

}
</style>
