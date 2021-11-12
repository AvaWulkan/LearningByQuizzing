<template>
<div class="create-container">

    <div v-if="!quizNameAdded" class="addQuizName">
        <h1>Skapa ett nytt quiz</h1>
        <input type="text" v-model="newQuizName" placeholder="Skriv in titel">
        <button @click="checkUniqueQuizName">Lägg till frågor</button>
        <p v-if="errorMessage != null"> {{ errorMessage }} </p>
        <button v-if="quizExists" @click="chooseExistingQuiz">Lägg till frågor i befintligt quiz</button>
    </div>
    <button v-if="!quizNameAdded" @click="toggleQuizNames">{{toggle}}</button>
    <div v-if="existingQuizNames != null && showExistingQuizes && !quizNameAdded">
        <ul v-for="element in existingQuizNames.quiz" v-bind:key="element">
            <li>
                 {{ element.nameQuiz }}
            </li>
        </ul>
    </div>
    <div v-if="quizNameAdded">
        <AddQuizQuestions/>
    </div>
</div>

</template>

<script>
import AddQuizQuestions from '../components/AddQuizQuestions.vue'
import axios from 'axios'
export default {
    components: {
        AddQuizQuestions
    },
    data(){
        return {
            quizNameAdded: false,
            existingQuizNames: [],
            newQuizName: null,
            errorMessage: null,
            showExistingQuizes: false,
            toggle: "Visa befintliga quiz",
            quizExists: false,
            existingQuizName: null,
            needOldQuestions: false
        }
    },

    mounted() {
        fetch('http://localhost:3000/api/quiz/')
            .then(res => res.json())
            .then(data => this.existingQuizNames = data)
    },

    methods: {
        checkUniqueQuizName() {
            this.errorMessage = null
            for(let i = 0; i < this.existingQuizNames.quiz.length; i++) {
                if(this.existingQuizNames.quiz[i].nameQuiz.toLowerCase() === this.newQuizName.toLowerCase()) {
                    this.errorMessage = this.newQuizName + " finns redan, välj ett annat namn"
                    this.quizExists = true
                    this.existingQuizName = this.existingQuizNames.quiz[i].nameQuiz.toLowerCase()
                } else if (this.newQuizName === null) {
                    this.errorMessage = "Du måste skriva in ett namn"
                }
            }
            if(this.errorMessage === null && this.newQuizName != null) {
                this.quizNameAdded = true
                axios.post('http://localhost:3000/api/createname/' + this.newQuizName)
                axios.post('http://localhost:3000/api/createtable/' + this.newQuizName)
            }
        },

        toggleQuizNames(){
            if(this.showExistingQuizes){
                this.showExistingQuizes = false
                this.toggle = "Visa befintliga quiz"
            } else {
                this.showExistingQuizes = true
                this.toggle = "Dölj befintliga quiz"
            }
        },
        chooseExistingQuiz(){
            this.newQuizName = this.existingQuizName
            this.quizNameAdded = true
            this.needOldQuestions = true
        }
    }
}
</script>

<style>

</style>