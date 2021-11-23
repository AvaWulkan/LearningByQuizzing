<template>
  <div class="container">
    <div class="inputboxes">
        <input type="text" name="username" v-model="input.username" placeholder="Användarnamn">
        <input type="password" @keydown.enter="login()" name="password" v-model="input.password" placeholder="Lösenord">
        <button type="button" @click="login()"><p>Logga in</p></button>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
      user: null
    }
  },
  methods: {
    login(){
      if (this.input.username !== "" && this.input.password !== ""){
        axios.get('http://localhost:3000/api/users/' + this.input.username).then(response => {
          this.user = response.data 
          if(this.user.user !== undefined) {
            if (this.input.password === this.user.user.password){
              this.$store.commit('setLoggedIn')
              this.$store.commit('setActiveUser', this.user.user.idUsers)
              if (this.user.user.role === "Admin"){
              this.$store.commit('setLoggedInAdmin')
              } else if (this.user.user.role === "Teacher") {
                this.$store.commit('setLoggedInTeacher')
              } else if (this.user.user.role === "Student"){
                this.$store.commit('setLoggedInStudent')
              }
               this.$router.replace({name: "Home"})
            } else {
              alert("Fel lösenord")
            }
          } else {
            alert("Det finns ingen användare med det namnet")
           } 
        })
      } else {
        alert("Du måste skriva in användarnamn och lösenord")
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