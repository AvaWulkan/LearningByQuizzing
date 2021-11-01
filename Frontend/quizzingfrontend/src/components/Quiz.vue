<template>

  <div>
<!--        <div v-for="quiz in quizes" v-bind:key="quiz.quizId">{{quiz}}</div>-->

    <form action="submit" @submit.prevent>
      <input type="text" v-model="test">
      <input type="submit" v-on:submit="idFirstQuestion(test)" value="ok">
    </form>

    <input type="text" v-on:keydown="numberOfQuestions">

    <div>{{ number_Of_Questions }} {{ id_First_Question }}</div>
  </div>


</template>

<script>
export default {
  data() {
    return {
      quizes: [],
      questions: [],
      number_Of_Questions: 0,
      id_First_Question: 0,
      test: null
    }
  },
  mounted() {
    fetch('http://localhost:3000/api/quiz/')
        .then(res => res.json())
        .then(data => this.quizes = data)
  },
  methods: {
    numberOfQuestions(id) {
      fetch('http://localhost:3000/api/quiz/numberofquestions/' + id)
          .then(res => res.json())
          .then(data => this.number_Of_Questions = data)
    },
    idFirstQuestion(id) {
      fetch('http://localhost:3000/api/quiz/id_firstquestion/' + id)
          .then(res => res.json())
          .then(data => this.id_First_Question = data)
    },
    questionsInQuiz() {
      fetch('http://localhost:3000/api/quiz:quizId/question:questionId')
          .then(res => res.json())
          .then(data => this.questions = data)
    }
  }
}

</script>

<style>

</style>