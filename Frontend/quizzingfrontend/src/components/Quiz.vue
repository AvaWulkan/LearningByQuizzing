<template>
<body>
  <div>
    <div v-if="!finishedQuiz">
      <div id="listOfQuizes" v-if="listOfQuizes">
        <h1>Quizmeny</h1>
        <ul id="quizList">
          <li v-for="quiz in quizes.quiz" v-bind:key="quiz"><button @click="selectedQuiz(quiz.nameQuiz)"><h2>{{quiz.nameQuiz}}</h2></button></li>
        </ul>
      </div>
      <div v-if="!listOfQuizes && !startQuiz">
        <button @click="start"><p>Start Quiz!</p></button>
        <button @click="oneMoreQuiz"><p>Byt Quiz</p></button>
      </div>
      <div v-show="startQuiz">
        <div id="questions" v-for="question in questionsInQuiz" v-bind:key="question">
          <h2>Fråga {{question[index].idQuizes}} av {{question.length}}</h2>
          <h1 id="questionh1">{{ question[index].question}}?</h1>
          <ul class="answers">
            <li><button :style="{ backgroundColor: coloredButton1 }" @click="clickAnswer(question[index].a1, question[index].correctAnswer); changeColor(1)"><p>{{ question[index].a1 }}</p></button></li>
            <li><button :style="{ backgroundColor: coloredButton2 }" @click="clickAnswer(question[index].a2, question[index].correctAnswer); changeColor(2)"><p>{{ question[index].a2 }}</p></button></li>
            <li><button :style="{ backgroundColor: coloredButton3 }" @click="clickAnswer(question[index].a3, question[index].correctAnswer); changeColor(3)"><p>{{ question[index].a3 }}</p></button></li>
            <li><button :style="{ backgroundColor: coloredButton4 }" @click="clickAnswer(question[index].correctAnswer, question[index].correctAnswer); changeColor(4)"><p>{{ question[index].correctAnswer }}</p></button></li>
          </ul>
          <div id="submitDiv">
            <h2 v-if="clickedAnswerMessage.length > 1">{{ clickedAnswerMessage }}</h2>
            <button v-if="questionAnswered && index < question.length-1" type="submit" @click="nextQuestion();"><p>Nästa fråga</p></button>
            <button v-if="questionAnswered && index === question.length-1" type="submit" @click="finishQuiz();">
              <p><img class="flags" src="../assets/flagflipped.png" alt="">Slutför quiz<img class="flags" src="../assets/flag.png" alt=""></p></button>
          </div>
        </div>
      </div>
    </div>
    <div class="newQuizButton" v-if="finishedQuiz">
      <QuizResult/>
      <button @click="oneMoreQuiz"><p>Gör ett till quiz</p></button>
    </div>
  </div>
</body>
</template>

<script>
import QuizResult from './QuizResult.vue'
import axios from 'axios'
export default {
  beforeMount() {
    this.$store.commit('setOnlyShowThreeToTrue')
  },
  components: {
    QuizResult
  },
  data() {
    return {
      coloredButton1: '',
      coloredButton2: '',
      coloredButton3: '',
      coloredButton4: '',
      listOfQuizes: true,
      index: 0,
      quizes: [],
      questionsInQuiz: [],
      questionAnswered: false,
      clickedAnswerMessage: "",
      lastAnswer: "",
      studentAnswers: [],
      correctAnswer: "",
      correctAnswers: [],
      totalPoints: 0,
      finishedQuiz: false,
      questions: [],
      currentQuiz: null,
      startQuiz: false
    }
  },
  mounted() {
    this.$store.commit('showPreviousResults')
    fetch('http://localhost:3000/api/quiz/')
        .then(res => res.json())
        .then(data => this.quizes = data)
  },
  methods: {
    populateList() {
      for (let i = 0; i <= this.index; i++) {
        this.questions.push(this.questionsInQuiz.question[i].question)
      }
    },
    selectedQuiz(quiz) {
      axios.get('http://localhost:3000/api/quiz'+ quiz +'/questions').then(response => (this.questionsInQuiz = response.data));
      this.listOfQuizes = false
      this.currentQuiz = quiz
      this.$store.commit('setQuizState')
    },
    nextQuestion() {
      this.questionAnswered = false
      this.index++
      this.clickedAnswerMessage = ""
      this.studentAnswers.push(this.lastAnswer)
      this.correctAnswers.push(this.correctAnswer)
      this.randomize()
      this.changeColor(0)
    }, 
    clickAnswer(selected, correct) {
      this.questionAnswered = true
      this.lastAnswer = selected
      this.correctAnswer = correct
    },
    finishQuiz() {
      this.finishedQuiz = true
      this.questionAnswered = false
      this.clickedAnswerMessage = ""
      this.studentAnswers.push(this.lastAnswer)
      this.correctAnswers.push(this.correctAnswer)
      for (let i = 0; i < this.studentAnswers.length; i++) {
        if (this.studentAnswers[i] === this.correctAnswers[i]) {
          this.totalPoints++
        }
      }
      this.populateList()
      this.saveResults()
      this.changeColor(0)
    },
    randomize() {
      let ul = document.querySelector('.answers');
      for (let i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
      }
    },
    oneMoreQuiz(){
      this.listOfQuizes = true
      this.index = 0
      this.questionsInQuiz = []
      this.questionAnswered = false
      this.clickedAnswerMessage = ""
      this.lastAnswer = ""
      this.studentAnswers = []
      this.correctAnswer = ""
      this.correctAnswers = []
      this.totalPoints = 0
      this.finishedQuiz = false
      this.questions = []
      this.$store.commit('setQuizState')
      this.currentQuiz = null
      this.startQuiz = false
    },
    changeColor(option) {
      this.coloredButton1 = ''
      this.coloredButton2 = ''
      this.coloredButton3 = ''
      this.coloredButton4 = ''

      switch(option){
        case 1: this.coloredButton1 = 'rgb(142, 140, 250)'
        break
        case 2: this.coloredButton2 = 'rgb(142, 140, 250)'
        break
        case 3: this.coloredButton3 = 'rgb(142, 140, 250)'
        break
        case 4: this.coloredButton4 = 'rgb(142, 140, 250)'
        break
        default: 
        break
      }
    },
    saveResults() {
      let stringurl = 'http://localhost:3000/api/saveresults/'+ this.$store.state.activeUser+'/'+this.currentQuiz+'/'+this.totalPoints+'/'+this.questionsInQuiz.question.length
      axios.post(stringurl)
    },
    start(){
      this.randomize()
      this.startQuiz = true
    }
  }
}
</script>

<style scoped>
body{
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}
.newQuizButton{
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1{
  text-align: center;
}
h2 {
  text-align: center;
}
#quizList button{
  text-align: center;
}
#submitDiv button{
  width: 450px;
  padding: 10px;
}
#questionh1 {
  width: 450px;
  background-color: rgb(192, 221, 238);
  border-radius: 10px;
  border: 2px solid grey;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 30px;
}

/* #listOfQuizes{
  justify-content: center;
} */

#listOfQuizes button{
  width: 200px;
  padding: 10px;
  margin: 5px;
  background-color: rgb(199, 214, 240);
  font-size: 20px;
}
#questions ul{
  flex-direction: column;
  flex: 0;
  columns: 2;
  margin: 0;
}
button:hover {
  transition: all 0.1s ease-in;
  transform: scale(0.98);
  box-shadow: 5px 7px rgba(160,160,160, 0.6);
  cursor:pointer;
}
.answers button{
  width: 217px;
  height: 200px;
  margin-bottom: 15px;
  background-color: rgb(194, 208, 245);
  word-wrap: break-word;

}
.flags {
  padding: 0 30px 0 30px;
  height: 20px;
}
</style>