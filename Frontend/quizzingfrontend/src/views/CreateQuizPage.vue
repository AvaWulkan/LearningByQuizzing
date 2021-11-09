<template>
<div class="create-container">
    <h1>Create a new quiz</h1>
    <input type="text" v-model="newQuizName" placeholder="Quiz Title">
    <button @click="checkUniqueQuizName">Add questions</button>
    <p v-if="errorMessage!= null"> {{ errorMessage }} </p>
    <p>Visa nytt namn{{newQuizName}}</p>
    <p>{{ existingQuizNames }}</p>

    <p>{{ existingQuizNames.quiz[0].nameQuiz }}</p>

</div>

</template>

<script>
export default {
data(){
    return {
        existingQuizNames: [],
        newQuizName: null,
        errorMessage: null,
    }
},

 mounted() {
    fetch('http://localhost:3000/api/quiz/')
        .then(res => res.json())
        .then(data => this.existingQuizNames = data)
  },

  methods: {
      checkUniqueQuizName() {
   
        for(let i = 0; i < this.existingQuizNames.quiz.length; i++) {
            if(this.existingQuizNames.quiz[i].nameQuiz.toLowerCase === this.newQuizName.toLowerCase) {
                this.errorMessage = this.newQuizName + " Already exists"
                console.log(this.errorMessage)
            }

        }

      }
  }
}
</script>

<style>

</style>