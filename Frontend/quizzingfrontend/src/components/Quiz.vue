<template>

  <div>

    <input type="text" v-model="quizIndex">
    <button type="submit" v-on:mousedown="idFirstQuestion(); numberOfQuestions(); questionsInQuiz();"
            v-on:mouseup="changeNumberOfQuestionToInt(number_Of_Questions);">Start quiz</button>

    <div>{{ quizes.quiz[0].nameQuiz }}</div>

    <div v-for="question in questions" v-bind:key="question.questionsId">
      <h2>{{ question[0].question }}</h2>
      <ul>
        <li><button @click="clickAnswer(question[0].a1, question[0].correctAnswer)">{{ question[0].a1 }}</button></li>
        <li><button @click="clickAnswer(question[0].a2, question[0].correctAnswer)">{{ question[0].a2 }}</button></li>
        <li><button @click="clickAnswer(question[0].a3, question[0].correctAnswer)">{{ question[0].a3 }}</button></li>
        <li><button @click="clickAnswer(question[0].correctAnswer, question[0].correctAnswer)">{{ question[0].correctAnswer }}</button>
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
export default {
  data() {
    return {
      quizes: [],
      questions: [],
      number_Of_Questions: 0,
      id_First_Question: 0,
      quizIndex: 0,
      quizId: 0,
      questionId: 0,
      questionAnswered: false,
      correctBool: false,
      clickedAnswerMessage: "",
      lastAnswer: "",
      studentAnswers: [],
      correctAnswer: "",
      correctAnswers: [],
      questionIndex: 1,
      totalPoints: 0,
    }
  },
  // Hejhej
  mounted() {
    fetch('http://localhost:3000/api/quiz/')
        .then(res => res.json())
        .then(data => this.quizes = data)
  },
  methods: {
    numberOfQuestions() {
      fetch('http://localhost:3000/api/quiz/numberofquestions/' + this.quizIndex)
          .then(res => res.json())
          .then(data => this.number_Of_Questions = data)
    },
    idFirstQuestion() {
      fetch('http://localhost:3000/api/quiz/id_firstquestion/' + this.quizIndex)
          .then(res => res.json())
          .then(data => this.id_First_Question = data)
    },
    questionsInQuiz() {
      fetch('http://localhost:3000/api/quiz' + this.quizIndex + '/question' + this.questionIndex)
          .then(res => res.json())
          .then(data => this.questions = data)
    },
    nextQuestion() {
      this.questionAnswered = false
      this.questionIndex++
      fetch('http://localhost:3000/api/quiz' + this.quizIndex + '/question' + this.questionIndex)
          .then(res => res.json())
          .then(data => this.questions = data)
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
      for (let i = 0; i < this.studentAnswers.length; i++) {
        if (this.studentAnswers[i] === this.correctAnswers[i]) {
          this.totalPoints++
        }
      }
    },
    changeNumberOfQuestionToInt(x) {
      var parsedobj = JSON.parse(JSON.stringify(x))
      parsedobj = Object.values(parsedobj)
      this.number_Of_Questions = parsedobj[0]
    },
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