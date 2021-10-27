<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home | </router-link>
      <router-link :to="{ name : 'LoginPage' }">Login</router-link>
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

</style>
