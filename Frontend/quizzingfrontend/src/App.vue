<template>
  <div id="app">
    <bigheader>
    <header>
      <img class="productlogo" width="100" src="./assets/LearningByQuizzingLogga.png" alt="Logga" >
    </header>
    <nav id="nav" v-if="$store.state.loggedIn">
      <router-link class="navbuttons" :to="{ name : 'Home' }"><span><p>Startsida</p></span></router-link>
      <router-link class="navbuttons" v-if="$store.state.loggedInStudent" :to="{ name : 'Quiz' }"><span @click="$store.commit('setOnlyShowThreeToTrue')"><p>Quiz</p></span></router-link>
      <router-link class="navbuttons" v-if="$store.state.loggedInTeacher" :to="{ name : 'CreateQuiz' }"><p>Skapa Quiz</p></router-link>
      <button class="textsize navbuttons" @click="changeFontSize()"><p>Ändra textstorlek</p></button>
      <div>
      <router-link id="logoutbuttonmobile" class="navbuttons" :to="{ name : 'Login' }"><span @click="logout"><p>Logga ut</p></span></router-link>
      </div>
    </nav>
    <div class="logout" v-if="$store.state.loggedIn">
      <router-link id="logoutbuttondesktop" :to="{ name : 'Login' }"><span @click="logout"><p>Logga ut</p></span></router-link>
      <img class="hamburgermenu" width="75" src="./assets/hamburgermenu.png" alt="Meny" @click="showMobileMenu">
    </div>
    <div v-if="!$store.state.loggedIn">
      <h2>Välkommen till Learning by Quizzing!</h2>
    </div>
    </bigheader>
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
    },

    showMobileMenu() {
      var x = document.getElementById("nav")
      var y = document.getElementById("logoutbuttonmobile")
      if (x.style.display === "block" && y.style.display === "block") {
        x.style.display = "none"
        y.style.display = "none"
      } else {
        x.style.display = "block"
        y.style.display = "block"
      }
    }
  }
}
</script>

<style>

/* MOBILE FIRST */ 

#app {
  background: rgb(201, 221, 228);
  display: flex;
  align-items: center;
  flex-flow: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  margin: 0;
  min-height: 100vh;
}

bigheader{
  display:grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-template-areas: 
  "img logout"
  "a a";
  background: rgb(152, 193, 208);
}

a {
  align-items: center;
  background-clip: padding-box;
  background-color: rgb(194, 208, 245);
  border: 1px solid transparent;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0 10px;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: 100%;
}

img {
  margin-left: 10px;
  grid-area: img;
}

#logoutbuttondesktop {
  display: none;
}

.hamburgermenu {
  margin-left: -20px;
  position: sticky;
  margin-top: -35px;
}

a:hover,
a:focus {
  background-color: rgb(181, 192, 225);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

a:hover {
  transform: translateY(-1px);
}

.textsize {
  margin: 0 10px;
}

.logout {
  grid-area: logout;
  width: 100%;
  text-align: center;
  justify-content: flex-end;
  display: flex;
}

header{
  max-width: 200px;
  display: block;
}
ul{
  margin: 0;
  padding: 0;
  list-style-type: none;
}
#nav {
  text-align: center;
  display: none;

}

.navbuttons {
  display: flex;
  justify-content: center;
  width: 95vw;
}

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
  #app {
  display: flex;
  align-items: center;
  flex-flow: column;
  padding: 0 10px 40px 10px;
  width: 1000px;
  margin: 20px auto;
  min-height: 500px;
  }

  a {
    display: inline-flex;
    grid-area: a;
  }
  bigheader{
    display: grid;
    width: 1000px;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    grid-template-areas:
    "img a logout";
  }
  #nav {
    text-align: center;
    grid-area: a;
    justify-content: center;
    display: flex;
    width: 100%;
  }

  #logoutbuttonmobile {
  display: none;
  }

  #logoutbuttondesktop {
    display: block;
  }
  .navbuttons {
   display: flex;
   justify-content: center;
   width: auto;
  }
  .hamburgermenu {
    display: none;
  }
}
</style>
