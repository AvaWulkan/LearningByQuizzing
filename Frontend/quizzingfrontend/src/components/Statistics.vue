<template>
  <div>
    <div v-for="quiz in quizResults.quiz" :key="quiz">
      {{ quiz }}
    </div>
    <p>{{ quizResults }}</p>
    <p>{{ quizNames }}</p>
    <p> {{ numTimesQuizIsMade }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Statistics",

  data() {
    return {
      quizResults: [],
      quizNames: [],
      results: new Map(),
      numTimesQuizIsMade: []
    }
  },

  mounted() {
    axios.get('http://localhost:3000/api/allquizresults')
        .then(response => {
          this.quizResults = response.data
          this.quizResults = this.quizResults.results
        })
    axios.get('http://localhost:3000/api/quiz')
    .then(response => {
      this.quizNames = response.data
      this.quizNames = this.quizNames.quiz
      this.getStatistics()
    })

  },

  methods: {

    getStatistics() {
      let numOfTimes = 0
      for(let i = 0; i < this.quizNames.length; i++) {
        for(let j = 0; j < this.quizResults.length; j++) {
          if(this.quizResults[j].quiz === this.quizNames[i]) {
            numOfTimes++
          }
        }
       // this.results.set(this.quizNames[i], numOfTimes)
        this.numTimesQuizIsMade.push(numOfTimes)
        numOfTimes = 0
      }
    }
  }

}

</script>

<style scoped>

</style>