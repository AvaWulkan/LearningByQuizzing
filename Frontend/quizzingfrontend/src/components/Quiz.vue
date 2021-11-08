<template>

  <div>
    <div v-if="finishedQuiz">
    <div v-if="listOfQuizes">
      <ul>
        <li v-for="quiz in quizes.quiz" v-bind:key="quiz"><button @click="selectedQuiz(quiz.nameQuiz)">{{quiz.nameQuiz}}</button></li>
      </ul>
    </div>

    <div v-for="question in questionsInQuiz" v-bind:key="question">
      <!-- <p>Antal frågor {{question.length}}</p> -->
      <h2>{{ question[index].question}}</h2>
      <ul class="answers">
        <li><button @click="clickAnswer(question[index].a1, question[index].correctAnswer)">{{ question[index].a1 }}</button></li>
        <li><button @click="clickAnswer(question[index].a2, question[index].correctAnswer)">{{ question[index].a2 }}</button></li>
        <li><button @click="clickAnswer(question[index].a3, question[index].correctAnswer)">{{ question[index].a3 }}</button></li>
        <li><button @click="clickAnswer(question[index].correctAnswer, question[index].correctAnswer)">{{ question[index].correctAnswer }}</button>
        </li>
      </ul>
          <div>
      <p v-if="clickedAnswerMessage.length > 1">{{ clickedAnswerMessage }}</p>
      <button v-if="questionAnswered && index < question.length-1" type="submit" @click="nextQuestion();">Next question</button>
      <button v-if="questionAnswered && index == question.length-1" type="submit" @click="finishQuiz();">Finish quiz</button>
      <!-- <p>Poäng {{ totalPoints }}</p> -->
    </div>
    </div>
    <!-- <p>Visar studentens svar {{ studentAnswers }}</p> -->
    <!-- <p>Visar korrekta svar {{ correctAnswers }}</p> -->
    </div>
    <div v-if="!finishedQuiz">
    <QuizStatistics/>    
    </div>
  </div>

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
      numberOfQuestionsInQuiz: 0,
      finishedQuiz: true
    }
  },

  mounted() {

fetch('http://localhost:3000/api/quiz/')
        .then(res => res.json())
        .then(data => this.quizes = data)
  },
  methods: {
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
        this.correctBool = true
        this.clickedAnswerMessage = "You got basic math right, you rock!"
      } else {
        this.clickedAnswerMessage = "Fucking idiot, you got basic math wrong!"
      }
      this.lastAnswer = selected
      this.correctAnswer = correct
    },
    finishQuiz() {
      this.finishedQuiz = false
      this.questionAnswered = false
      this.clickedAnswerMessage = ""
      this.studentAnswers.push(this.lastAnswer)
      this.correctAnswers.push(this.correctAnswer)
      for (let i = 0; i < this.studentAnswers.length; i++) {
        if (this.studentAnswers[i] === this.correctAnswers[i]) {
          this.totalPoints++
        }
      }

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


</style>