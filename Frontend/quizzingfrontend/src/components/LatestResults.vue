<template>
<div v-if="!$store.state.quizChosen">
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
            quizResults: []
        }
    },
    mounted() {
        axios.get('http://localhost:3000/api/quizresults/'+this.$store.state.activeUser)
        .then(response => {
            this.quizResults = response.data
            this.showMostRecentResults()
        })
    },
    methods: {
        showMostRecentResults() {
            let element = []
            for (let i = this.quizResults.question.length-1; i > this.quizResults.question.length-4; i--) {
                element.push(this.quizResults.question[i]);
            }
            this.quizResults = element
        }
    }
}
</script>

<style>

</style>