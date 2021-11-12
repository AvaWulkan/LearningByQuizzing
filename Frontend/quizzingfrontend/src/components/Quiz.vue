<template>
<body>
  <div>
    <div v-if="!finishedQuiz">
      <div id="listOfQuizes" v-if="listOfQuizes">
        <h1>Quizmeny</h1>
        <ul id="quizList">
          <li v-for="quiz in quizes.quiz" v-bind:key="quiz"><button @click="selectedQuiz(quiz.nameQuiz)">{{quiz.nameQuiz}}</button></li>
        </ul>
      </div>
      <div id="questions" v-for="question in questionsInQuiz" v-bind:key="question">
        <h2>Fråga {{question[index].idQuizes}} av {{question.length}}</h2>
        <h1 id="questionh1">{{ question[index].question}}?</h1>
        <ul class="answers">
          <li><button @click="clickAnswer(question[index].a1, question[index].correctAnswer)">{{ question[index].a1 }}</button></li>
          <li><button @click="clickAnswer(question[index].a2, question[index].correctAnswer)">{{ question[index].a2 }}</button></li>
          <li><button @click="clickAnswer(question[index].a3, question[index].correctAnswer)">{{ question[index].a3 }}</button></li>
          <li><button @click="clickAnswer(question[index].correctAnswer, question[index].correctAnswer)">{{ question[index].correctAnswer }}</button></li>
        </ul>
        <div id="submitDiv">
        <h2 v-if="clickedAnswerMessage.length > 1">{{ clickedAnswerMessage }}</h2>
        <button v-if="questionAnswered && index < question.length-1" type="submit" @click="nextQuestion();">Next question</button>
        <button v-if="questionAnswered && index == question.length-1" type="submit" @click="finishQuiz();">
          <img class="flags" src="../assets/flagflipped.png" alt="">Finish quiz<img class="flags" src="../assets/flag.png" alt=""></button>
        </div>
      </div>
    </div>
    <div v-if="finishedQuiz">
    <QuizStatistics/>    
    </div>
  </div>
</body>
</template>

<script>
import QuizStatistics from './QuizStatistics.vue'
import axios from 'axios'
export default {
  components: {
    QuizStatistics
  },
  data() {
    return {
      listOfQuizes: true,
      index: 0,
      quizes: [],
      questionsInQuiz: [],
      questionAnswered: false,
      correctBool: false,
      clickedAnswerMessage: "",
      lastAnswer: "",
      studentAnswers: [],
      correctAnswer: "",
      correctAnswers: [],
      totalPoints: 0,
      finishedQuiz: false,
      nameList: [],
    }
  },
  mounted() {
    fetch('http://localhost:3000/api/quiz/')
        .then(res => res.json())
        .then(data => this.quizes = data)
  },
  methods: {
    populateList() {
      for (let i = 0; i <= this.index; i++) {
        this.nameList.push(this.questionsInQuiz.question[i].question)
      }
    },
    selectedQuiz(quiz) {
      axios.get('http://localhost:3000/api/quiz'+ quiz +'/questions').then(response => (this.questionsInQuiz = response.data));
      this.listOfQuizes = false
    },
    nextQuestion() {
      this.questionAnswered = false
      this.index++
      this.clickedAnswerMessage = ""
      this.studentAnswers.push(this.lastAnswer)
      this.correctAnswers.push(this.correctAnswer)
      this.randomize()
    }, 
    clickAnswer(selected, correct) {
      this.questionAnswered = true
      if (selected === correct) {
        this.answerBool = true
        this.correctBool = true
        this.clickedAnswerMessage = "Rätt, fan vad duktig du var då!"
      } else {
        this.answerBool = false
        this.clickedAnswerMessage = "Fucking idiot!"
      }
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
    },
    randomize() {
      var ul = document.querySelector('.answers');
      for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
      }
    }
  }
}

</script>

<style scoped>
body{
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  margin: 0px;
}
button:hover {
  transition: all 0.1s ease-in;
  transform: scale(0.98);
  box-shadow: 5px 7px rgba(160,160,160, 0.6);
  cursor:pointer;
}
.answers button{
  width: 217px;
  padding: 50px;
  margin-bottom: 15px;
  background-color: rgb(194, 208, 245)
}
.flags {
  padding: 0 30px 0 30px;
  height: 20px;
}
</style>