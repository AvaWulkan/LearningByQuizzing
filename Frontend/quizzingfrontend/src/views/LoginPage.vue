<template>
  <div class="container">
    <div class="inputboxes">
        <input type="text" name="username" v-model="input.username" placeholder="Användarnamn">
        <input type="password" name="password" v-model="input.password" placeholder="Lösenord">
        <button type="button" v-on:click="login()">Login</button>
    </div>
  </div>

</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      input:{
        username: "",
        password: "",
      }
    }
  },
  methods: {
    login(){
      if (this.input.username != "" && this.input.password != ""){
        if (this.input.username == this.$parent.mockAccount.username &&
        this.input.password == this.$parent.mockAccount.password){
          this.$emit("authenticated", true)
          this.$router.replace({name: "Admin"})
        }
      }
    }
  }
}
</script>

<style scoped>

.container {
  display: grid;
  grid-template-columns: 240px;
  grid-template-rows: auto;
  align-items: center;
  justify-content: center;
}
.inputboxes {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

  margin: 20px;
}

input {
  margin: 5px;
}

.buttoncontainer{
  display: flex;
  width: 180px;
  margin: 5px;
}
</style>