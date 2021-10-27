<template>
  <div class="container">
    <div class="inputboxes">
      <input type="text" placeholder="Användarnamn" required>
      <input type="text" placeholder="Lösenord" required>
      <div class="buttoncontainer">
        <button value="Login">Logga in</button>
      </div>
    </div>

  </div>

</template>

<script>

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