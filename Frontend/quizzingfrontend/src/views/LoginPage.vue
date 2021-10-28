<template>
  <div class="container">
    <div class="inputboxes">
      <input type="text" placeholder="Användarnamn" required>
      <input type="text" placeholder="Lösenord" required>
      <Login msg="Förtär avföring"/>
    </div>

  </div>

</template>

<script>
import Login from '../components/Login.vue'
export default {
  name: "LoginPage",
  components:{
    Login
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