<template>
  <div class="home">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<p>bajs</p>
<p>{{$store.state.count}}</p>
<p>{{$store.state.loggedIn}}</p>
<p>{{$store.state.loggedInAdmin}}</p>
<button @click="increment">xxxxx</button>
<button @click="decrement">xxxxx</button>
<button @click="setLoggedInStudent">True</button>
<button @click="setLoggedInTeacher">False</button>
<button @click="setLoggedInAdmin">TEST ME</button>

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
