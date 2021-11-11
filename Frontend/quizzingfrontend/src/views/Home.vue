<template>
  <div class="home">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<p>bajs</p>
<p>{{$store.state.count}}</p>
<p>{{$store.state.loggedIn}}</p>
<button @click="increment">xxxxx</button>
<button @click="decrement">xxxxx</button>
<button @click="setLoggedInTrue">True</button>
<button @click="setLoggedInFalse">False</button>

  </div>
</template>

<script>
export default{
  methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  },
    decrement() {
    this.$store.commit('decrement')
    console.log(this.$store.state.count)
},
setLoggedInTrue(){
  this.$store.commit('setLoggedInTrue')
},
setLoggedInFalse(){
  this.$store.commit('setLoggedInFalse')
}
}
}
</script>
