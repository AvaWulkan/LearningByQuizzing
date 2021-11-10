<template>
<div>
    <div>
        <h1>{{ $parent.newQuizName }}</h1>
        <input name="question" v-model="newQuestion" type="text" placeholder="Skriv fråga">
        <input name="correctAnswer" v-model="newCorrectAnswer" type="text" placeholder="Korrekt svar / Alternativ 1">
        <input name="a1" v-model="newA1" type="text" placeholder="Svarsalternativ 2">
        <input name="a2" v-model="newA2" type="text" placeholder="Svarsalternativ 3">
        <input name="a3" v-model="newA3" type="text" placeholder="Svarsalternativ 4">
        <button @click="addQuestion($parent.newQuizName)">Lägg till fråga</button>
        <p>{{ newQuestion }}</p>
        <p>{{ newCorrectAnswer }}</p>
        <p>{{ newA1 }}</p>
        <p>{{ newA2 }}</p>
        <p>{{ newA3 }}</p>
        <p v-if="errorBool">{{ errorMsg }}</p>
    </div>  
    <div>
        
    </div>

</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            newQuestion: "",
            newCorrectAnswer: "",
            newA1: "",
            newA2: "",
            newA3: "",
            listOfNewQuestion: [],
            listOfNewCorrectAnswer: [],
            listOfNewA1: [],
            listOfNewA2: [],
            listOfNewA3: [],
            errorMsg: "",
            errorBool: false
        }
    },
    methods: {
        addQuestion(quizName) {
            this.errorMsg = null
            this.errorBool = false
            if (this.newQuestion != "" && this.newCorrectAnswer != "" && this.newA1 != "" && this.newA2 != "" && this.newA3 != ""){
                let stringurl = 'http://localhost:3000/api/createquestion/'+quizName+'/'+ this.newQuestion+ '/' +this.newCorrectAnswer+ '/' +this.newA1+ '/'+this.newA2+ '/'+this.newA3 
                this.resetData()
                axios.post(stringurl)
            } else {
                this.errorMsg = "Du måste fylla i alla fält!"
                this.errorBool = true
            }
            
        },
        resetData(){
            this.listOfNewQuestion.push(this.newQuestion)
            this.listOfNewCorrectAnswer.push(this.newCorrectAnswer)
            this.listOfNewA1.push(this.newA1)
            this.listOfNewA2.push(this.newA2)
            this.listOfNewA3.push(this.newA3)
            this.newQuestion = "",
            this.newCorrectAnswer = "",
            this.newA1 = "",
            this.newA2 = "",
            this.newA3 = ""
        }
        
    }
}

</script>

<style>

</style>