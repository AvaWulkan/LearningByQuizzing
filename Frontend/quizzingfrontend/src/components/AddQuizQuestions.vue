<template>
<body>
    <div>
        <button @click="findOldQuestions">Visa befintliga frågor</button>
        <h1 >{{ $parent.newQuizName }}</h1>
        <input name="question" v-model="newQuestion" type="text" placeholder="Skriv fråga">
        <input name="correctAnswer" v-model="newCorrectAnswer" type="text" placeholder="Korrekt svar / Alternativ 1">
        <input name="a1" v-model="newA1" type="text" placeholder="Svarsalternativ 2">
        <input name="a2" v-model="newA2" type="text" placeholder="Svarsalternativ 3">
        <input name="a3" v-model="newA3" type="text" placeholder="Svarsalternativ 4">
        <button @click="addQuestion()">Lägg till fråga</button>
        <p v-if="errorBool">{{ errorMsg }}</p>
    </div>
      
    <div class="preview" v-for="index in listOfIndex" :key="index">
        <ul>
          <li> <h1>{{listOfNewQuestion[index]}}?</h1> </li>
        </ul>
        <div class="svarsalternativ">
          <ul>
            <li class="svar"> {{listOfNewCorrectAnswer[index]}} </li>
          </ul>
          <ul>
            <li class="svar"> {{listOfNewA1[index]}} </li>
          </ul>
          <ul>
            <li class="svar"> {{listOfNewA2[index]}} </li>
          </ul>
          <ul>
            <li class="svar"> {{listOfNewA3[index]}} </li>
          </ul>
        </div>
    </div>
</body>
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
            errorBool: false,
            index: -1,
            listOfIndex: [],
            questionNumber: 0,
            oldQuestionsInQuiz: []
        }
    },
    mounted() {
        if(this.$parent.needOldQuestions){
          axios.get('http://localhost:3000/api/quiz'+ this.$parent.newQuizName +'/questions').then(response => (this.oldQuestionsInQuiz = response.data));
        }
    },

    methods: {
        addQuestion() {
          let cleanQuestion = this.newQuestion.replaceAll('?', '')
          this.newQuestion = cleanQuestion
    
            this.errorMsg = null
            this.errorBool = false
            if (this.newQuestion != "" && this.newCorrectAnswer != "" && this.newA1 != "" && this.newA2 != "" && this.newA3 != ""){
                let stringurl = 'http://localhost:3000/api/createquestion/'+this.$parent.newQuizName+'/'+this.newQuestion+ '/' +this.newCorrectAnswer+ '/' +this.newA1+ '/'+this.newA2+ '/'+this.newA3
                this.resetData()
                axios.post(stringurl)
                this.index++
                this.listOfIndex.push(this.index)
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
        },

        findOldQuestions() {
            for (let i = 0; i <= this.oldQuestionsInQuiz.question.length; i++) {
              this.listOfNewQuestion.push(this.oldQuestionsInQuiz.question[i].question)
              this.listOfNewCorrectAnswer.push(this.oldQuestionsInQuiz.question[i].correctAnswer)
              this.listOfNewA1.push(this.oldQuestionsInQuiz.question[i].a1)
              this.listOfNewA2.push(this.oldQuestionsInQuiz.question[i].a2)
              this.listOfNewA3.push(this.oldQuestionsInQuiz.question[i].a3)
              this.index++
              this.listOfIndex.push(this.index)
            }
        }  
    }
}

</script>

<style scoped>
.preview{
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;
}
li h1{
  text-align: center;
  width: 450px;
  padding-bottom: 10px;
  padding-top: 10px;
  background-color: rgb(192, 221, 238);
  border-radius: 10px;
  border: 2px solid grey;

  margin-top: 30px;
}
.svarsalternativ{
  flex: 0;
  columns: 2;
  margin: 0px;
  padding: 0;
}
.svar{
  width: 217px;
  padding-bottom: 50px;
  padding-top: 50px;
  margin-bottom: 15px;
  background-color: rgb(194, 208, 245);
  font-size: 20px;
  border-radius: 10px;
  border: black 2px solid;
  text-align: center;
}
li:hover {
  transition: all 0.1s ease-in;
  transform: scale(0.98);
  box-shadow: 5px 7px rgba(160,160,160, 0.6);
  cursor:pointer;
}
</style>