<template>
<div class="create-container">

    <div v-if="!quizNameAdded" class="addQuizName">
        <h1>Skapa ett nytt quiz</h1>
        <input type="text" v-model="newQuizName" placeholder="Skriv in titel">
        <button @click="checkUniqueQuizName">Lägg till frågor</button>
        <p v-if="errorMessage != null"> {{ errorMessage }} </p>
    </div>
    <div v-if="quizNameAdded">
        <AddQuizQuestions/>
    </div>
</div>

</template>

<script>
import AddQuizQuestions from '../components/AddQuizQuestions.vue'
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
                } else if (this.newQuizName === null) {
                    this.errorMessage = "Du måste skriva in ett namn"
                }
            }
            if(this.errorMessage === null && this.newQuizName != null) {
                this.quizNameAdded = true
            }
        }
    }
}
</script>

<style>

</style>