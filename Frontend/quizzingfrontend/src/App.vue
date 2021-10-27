<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name : 'Home' }">Home | </router-link>
      <router-link :to="{ name : 'LoginPage' }">Login | </router-link>
      <router-link :to="{ name : 'AdminPage' }">Admin</router-link>
    </div>
    <router-view/>
  </div>
</template>

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

nav {
  width: 100%;
  text-align: center;
}

nav li {
  font-weight: normal;
  display: inline-block;
  justify-content: center;
  text-align: center;
  width: 20%;
  font-size: 20px;
  padding: 20px;
}

nav li:hover {
  cursor: pointer;
  color: darkgray;
}

</style>
