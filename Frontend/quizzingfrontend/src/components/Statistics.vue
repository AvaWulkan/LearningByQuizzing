<template>
  <div>
    <table>
      <thead>
      <tr>
        <th scope="col">Quiz</th>
        <th scope="col">Antal genomförda</th>
        <th scope="col">Snittpoäng</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in index" :key="i">
        <td>{{quizNames[i].nameQuiz}}</td>
        <td>{{numTimesQuizIsMade[i]}}</td>
        <td>{{averageScore[i]}}/{{numberOfQuestions[i]}} ({{(averageScore[i]/numberOfQuestions[i]*100).toFixed(0)}}%)</td>
      </tr>
      </tbody>
    </table>
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
      numTimesQuizIsMade: [],
      index: [],
      averageScore: [],
      numberOfQuestions: []
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
      let totalScore = 0
      let numOfQ = 0
      for(let i = 0; i < this.quizNames.length; i++) {
        this.index.push(i)
        for(let j = 0; j < this.quizResults.length; j++) {
          if(this.quizResults[j].quiz === this.quizNames[i].nameQuiz) {
            numOfTimes++
            totalScore += this.quizResults[j].correctAnswers
            numOfQ = this.quizResults[j].numberOfQuestions
          }
        }
        if(totalScore !== 0){
          totalScore = (totalScore/numOfTimes).toFixed(2)
        }
        this.averageScore.push(totalScore)
        this.numberOfQuestions.push(numOfQ)
       // this.results.set(this.quizNames[i], numOfTimes)
        this.numTimesQuizIsMade.push(numOfTimes)
        numOfTimes = 0
        totalScore = 0
      }
    }
  }

}

</script>

<style scoped>

</style>