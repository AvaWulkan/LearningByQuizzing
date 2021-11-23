<template>
    <div>
        <h1 v-if="!$store.state.onlyShowThree">Resultat</h1> 
        <h1 v-else>Senaste resultat</h1>   
        <div>
          <table>
            <thead>
            <tr>
              <th scope="col"><h2>Quiz</h2></th>
              <th scope="col"><h2>Poäng</h2></th>
              <th scope="col"><h2>Procent</h2></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="result in quizResults" :key="result">
              <td><p>{{result.quiz}}</p></td>
              <td><p>{{result.correctAnswers}}/{{result.numberOfQuestions}} rätt</p></td>
              <td><p>({{(result.correctAnswers/result.numberOfQuestions*100).toFixed(0)}}%)</p></td>
            </tr>
            </tbody>
          </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            quizResults: [],
        }
    },
    mounted() {
        axios.get('http://localhost:3000/api/quizresults/'+this.$store.state.activeUser)
        .then(response => {
            this.quizResults = response.data
            this.quizResults = this.quizResults.results
            this.showMostRecentResults()
        })
    },
    methods: {
        showMostRecentResults() {
            let element = []
            if (this.quizResults.length > 3 && this.$store.state.onlyShowThree){
                for (let i = this.quizResults.length-1; i > this.quizResults.length-4; i--) {
                    element.push(this.quizResults[i]);
                }
            } else {
                for (let i = this.quizResults.length-1; i > -1; i--) {
                element.push(this.quizResults[i]);
                }
            }
            this.quizResults = element
        }
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
}
</style>