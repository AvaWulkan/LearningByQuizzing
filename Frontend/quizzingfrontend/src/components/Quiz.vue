<template>

  <div>
    <div>
      
      <ul>
        <li v-for="quiz in quizes.quiz" v-bind:key="quiz"><button @click="selectedQuiz(quiz.nameQuiz)">{{quiz.nameQuiz}}</button></li>
      </ul>
    </div>

    <div v-for="question in questionsInQuiz.questions" v-bind:key="question">
      <h2>{{ question}}</h2>
      <ul>
        <li><button @click="clickAnswer(question.a1, question.correctAnswer)">{{ question.a1 }}</button></li>
        <li><button @click="clickAnswer(question.a2, question.correctAnswer)">{{ question.a2 }}</button></li>
        <li><button @click="clickAnswer(question.a3, question.correctAnswer)">{{ question.a3 }}</button></li>
        <li><button @click="clickAnswer(question.correctAnswer, question.correctAnswer)">{{ question.correctAnswer }}</button>
        </li>
      </ul>
    </div>
    <div>
      <p v-if="clickedAnswerMessage.length > 1">{{ clickedAnswerMessage }}</p>
      <button v-if="questionAnswered && questionIndex < this.number_Of_Questions" type="submit" @click="nextQuestion();">Next question</button>
      <button v-if="questionAnswered && questionIndex == this.number_Of_Questions" type="submit" @click=" nextQuestion(); finishQuiz();">Finish quiz</button>
      <p>{{ number_Of_Questions }}</p>
      <p>{{ totalPoints }}</p>
    </div>

    <p>Visar studentens svar {{ studentAnswers }}</p>
    <p>Visar korrekta svar {{ correctAnswers }}</p>

  </div>

</template>

<script>
// import axios from 'axios';
export default {
  data() {
    return {
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
    }
  },
  // Hejhej
  mounted() {
    // axios.get('http://localhost:3000/api/quiz/').then(response => (this.quizes = response.data));
fetch('http://localhost:3000/api/quiz/')
        .then(res => res.json())
        .then(data => this.quizes = data)
  },
  methods: {
    selectedQuiz(quiz) {
      fetch('/api/quiz'+ quiz + '/questions')
      .then(res => res.json())
      .then(data => this.questionsInQuiz = data)
      // axios.get('http://localhost:3000/api/quiz'+ quiz +'/questions').then(response => (this.questionsInQuiz = response.data));
    },
/*    nextQuestion() {
      this.questionAnswered = false
      this.questionIndex++
      fetch('http://localhost:3000/api/quiz' + this.quizIndex + '/question' + this.questionIndex)
          .then(res => res.json())
          .then(data => this.questions = data)
      this.clickedAnswerMessage = ""
      this.studentAnswers.push(this.lastAnswer)
      this.correctAnswers.push(this.correctAnswer)
      this.randomize()
    },*/
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
      for (let i = 0; i < this.studentAnswers.length; i++) {
        if (this.studentAnswers[i] === this.correctAnswers[i]) {
          this.totalPoints++
        }
      }
    },

/*    changeNumberOfQuestionToInt(x) {
      var parsedobj = JSON.parse(JSON.stringify(x))
      parsedobj = Object.values(parsedobj)
      this.number_Of_Questions = parsedobj[0]
    },*/

    randomize() {
      var ul = document.querySelector('ul');
      for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
      }
    }
  }
}

</script>

<style>

</style>