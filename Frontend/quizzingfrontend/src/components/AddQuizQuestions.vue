<template>
<div>
    <h1>{{ $parent.newQuizName }}</h1>
    <input name="question" v-model="newQuestion" type="text" placeholder="Skriv fråga">
    <input name="correctAnswer" v-model="newCorrectAnswer" type="text" placeholder="Korrekt svar / Alternativ 1">
    <input name="a1" v-model="newA1" type="text" placeholder="Svarsalternativ 2">
    <input name="a2" v-model="newA2" type="text" placeholder="Svarsalternativ 3">
    <input name="a3" v-model="newA3" type="text" placeholder="Svarsalternativ 4">
    <button @click="addQuestion()">Lägg till fråga</button>
    <p>{{ newQuestion }}</p>
    <p>{{ newCorrectAnswer }}</p>
    <p>{{ newA1 }}</p>
    <p>{{ newA2 }}</p>
    <p>{{ newA3 }}</p>

</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            newQuestion: null,
            newCorrectAnswer: null,
            newA1: null,
            newA2: null,
            newA3: null,
        }
    },
    methods: {
        addQuestion() {
            let stringurl = 'http://localhost:3000/api/createquestion/hooh/'+ this.newQuestion+ '/' +this.newCorrectAnswer+ '/' +this.newA1+ '/'+this.newA2+ '/'+this.newA3 
          console.log(stringurl)
          axios.post(stringurl)
        // axios.post('http://localhost:3000/api/createquestion/hooh/bla/aaaa/bbbbbb/ccccc/dddddddd')
        }
        
    }
}

</script>

<style>

</style>