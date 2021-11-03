<template>

  <div>
<!--        <div v-for="quiz in quizes" v-bind:key="quiz.quizId">{{quiz}}</div>-->

      <input type="text" v-model="quizIndex">
      <button type="submit" v-on:click="idFirstQuestion(); numberOfQuestions(); questionsInQuiz();">Start quiz</button>



    <input type="text" v-on:keydown="numberOfQuestions">

    <div>{{quizes.quiz[0].nameQuiz}}</div>

    <div v-for="question in questions" v-bind:key="question.questionsId">
      <h2>{{question[0].question}}</h2>
      <ul>
        <li><button @click="clickAnswer(question[0].a1, question[0].correctAnswer);">{{question[0].a1}}</button></li>
        <li><button @click="clickAnswer(question[0].a2, question[0].correctAnswer)">{{question[0].a2}}</button></li>
        <li><button @click="clickAnswer(question[0].a3, question[0].correctAnswer)">{{question[0].a3}}</button></li>
        <li><button @click="clickAnswer(question[0].correctAnswer, question[0].correctAnswer)">{{question[0].correctAnswer}}</button></li>
      </ul>
    </div>
    <div>
      <p v-if="clickedAnswerMessage.length > 1">{{clickedAnswerMessage}}</p>
    </div>
      <button v-if="questionAnswered" type ="submit" @click="nextQuestion()">Next question</button>
      <p>{{studentAnswers}}</p>
      <p>{{correctAnswers}}</p>
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
      questionIndex: 1
    }
  },
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

    },

    clickAnswer(selected, correct) {
        this.questionAnswered = true
        if(selected === correct){
          this.correctBool = true
          this.clickedAnswerMessage = "You got basic math right, you rock!"
        } else {
        this.clickedAnswerMessage = "Fucking idiot, you got basic math wrong!"
        }

        this.lastAnswer = selected
        this.correctAnswer = correct
    },



  }
}

</script>

<style>

</style>