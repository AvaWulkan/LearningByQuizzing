<template>

  <div>

      <input type="text" v-model="quizIndex">
      <button type="submit" v-on:mousedown="idFirstQuestion(); numberOfQuestions(); questionsInQuiz();">Start quiz</button>

    <div>{{quizes.quiz[0].nameQuiz}}</div>

    <div v-for="question in questions" v-bind:key="question.questionsId">
      <h2>{{question[0].question}}</h2>
      <button type="submit" v-on:click="getAnswers(question[0].a1, question[0].a2, question[0].a3, question[0].correctAnswer)">Get Answers</button>
      <ul>

       <li v-for="element in answerList" :key="element">
          <button @click="clickAnswer(element, answerList.correctAnswer)">
            {{element}}
            </button></li>

      <!--  <li><button @click="clickAnswer(question[0].a1, question[0].correctAnswer);">{{question[0].a1}}</button></li>
        <li><button @click="clickAnswer(question[0].a2, question[0].correctAnswer)">{{question[0].a2}}</button></li>
        <li><button @click="clickAnswer(question[0].a3, question[0].correctAnswer)">{{question[0].a3}}</button></li>
        <li><button @click="clickAnswer(question[0].correctAnswer, question[0].correctAnswer)">{{question[0].correctAnswer}}</button></li>-->
      </ul> 

    </div>
    <div>
      <p v-if="clickedAnswerMessage.length > 1">{{clickedAnswerMessage}}</p>
       <button v-if="questionAnswered && questionIndex < this.number_Of_Questions" type ="submit" @click="nextQuestion();">Next question</button>
       <button v-if="questionAnswered && questionIndex == this.number_Of_Questions" type ="submit" @click=" nextQuestion(); finishQuiz();">Finish quiz</button>
       <p>Number of questions: {{number_Of_Questions}}</p>
       <p>{{totalPoints}}</p>
       <p>{{answerList}}</p>
    </div>
     
      <p>{{studentAnswers}}</p>
      <p>{{correctAnswers}}</p>
    
  </div>

</template>

<script>
export default {
  data() {
    return {
      answerList: [],
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
            setTimeout(() => {
              this.parseNumberOfQuestionsToInt(this.number_Of_Questions);  // this is fine
            }, 200)
          
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
          setTimeout(() => {
            this.success();  // this is fine
              }, 200)
    },
    
     nextQuestion() {
      // randomizeAnswerList() 
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

    finishQuiz() {
      for (let i = 0; i < this.studentAnswers.length; i++) {
        if(this.studentAnswers[i] === this.correctAnswers[i]){
          this.totalPoints++
        }
        
      }
    },
    parseNumberOfQuestionsToInt(x){
      var parsedobj = JSON.parse(JSON.stringify(x))
      parsedobj = Object.values(parsedobj)
      this.number_Of_Questions = parsedobj[0]
    },
    getAnswers(a1, a2, a3, correctAnswer){
       const tempList = [a1, a2, a3, correctAnswer];
       this.answerList = tempList
       console.log(tempList)
    },

    success() {
      console.log("HAII")
    }
    
  },
}

</script>

<style>

</style>