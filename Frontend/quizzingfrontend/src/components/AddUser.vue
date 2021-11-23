<template>
  <div>
      <input type="text" v-model="newName" placeholder="Namn">
      <input type="text" v-model="newUsername" placeholder="Användarnamn">
      <input type="text" v-model="newPassword" placeholder="Lösenord">
      <button @click="addNewUser"><p>Skapa användare</p></button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data (){
        return {
            newName: "",
            newUsername: "",
            newPassword: "",
            newUserRole: ""
        }
    },
    methods:{
        addNewUser(){
            if (this.$store.state.loggedInTeacher){
                this.newUserRole = 'Student'
            } else if (this.$store.state.loggedInAdmin){
                this.newUserRole = 'Teacher'
            }
            let stringurl = 'http://localhost:3000/api/createuser/' + this.newName +'/'+ this.newUsername+'/'+ this.newPassword+'/'+this.newUserRole
            axios.post(stringurl)

            this.newName = "",
            this.newUsername = "",
            this.newPassword = "",
            this.newUserRole = ""
        }
    }
}
</script>

<style scoped>

input {

  font-size: 16px;
  padding: 5px ;
  margin: 5px 5px 5px 0;
}

button {


}

</style>