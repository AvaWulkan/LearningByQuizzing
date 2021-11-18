<template>
    <div>
        <h1>Senast gjorda quiz</h1>    
        <div v-for="result in quizResults" :key="result">
            <h2>{{result.quiz}}: {{result.correctAnswers}}/{{result.numberOfQuestions}} rätt
                ({{(result.correctAnswers/result.numberOfQuestions*100).toFixed(0)}}%)
            </h2>
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

<style>

</style>