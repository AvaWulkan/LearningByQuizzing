<template>

  <div>
<!--        <div v-for="quiz in quizes" v-bind:key="quiz.quizId">{{quiz}}</div>-->

      <input type="text" v-model="test">
      <button type="submit" v-on:click="idFirstQuestion(); numberOfQuestions(); questionsInQuiz();"></button>



    <input type="text" v-on:keydown="numberOfQuestions">

    <div>{{id_First_Question}} {{number_Of_Questions}} {{quizes.quiz[0].nameQuiz}}</div>

    <div v-for="question in questions" v-bind:key="question.questionsId">
      {{question[0].question}}
      <ul>
        <li>{{question[0].a1}}</li>
        <li>{{question[0].a2}}</li>
        <li>{{question[0].a3}}</li>
        <li>{{question[0].correctAnswer}}</li>
      </ul>
    </div>
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
      test: 0,
      quizId: 0,
      questionId: 0
    }
  },
  mounted() {
    fetch('http://localhost:3000/api/quiz/')
        .then(res => res.json())
        .then(data => this.quizes = data)
  },
  methods: {
    numberOfQuestions() {
      fetch('http://localhost:3000/api/quiz/numberofquestions/' + this.test)
          .then(res => res.json())
          .then(data => this.number_Of_Questions = data)
    },
    idFirstQuestion() {
      fetch('http://localhost:3000/api/quiz/id_firstquestion/' + this.test)
          .then(res => res.json())
          .then(data => this.id_First_Question = data)
    },
    questionsInQuiz() {
      fetch('http://localhost:3000/api/quiz' + this.test + '/question' + this.test)
          .then(res => res.json())
          .then(data => this.questions = data)
    }

  }
}

</script>

<style>

</style>