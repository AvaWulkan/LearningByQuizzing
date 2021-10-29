<template>
<div>
<div v-for="quiz in quizes.slice(0,1)" :key="quiz.id">
<p>{{quiz}}</p>
</div>

<!--  <div v-for="quiz in quizes.slice(1,2)" :key="quiz.id" class="quiz">
&lt;!&ndash;  <h1>{{ quiz.question }}</h1>
  <button type="button" @click="quizEval">{{quiz.q1}}</button>
  <button type="button" @click="quizEval">{{quiz.q2}}</button>
  <button type="button" @click="quizEval">{{quiz.q3}}</button>
  <button type="button" @click="quizEval">{{quiz.q4}}</button>&ndash;&gt;

  </div>-->
  </div>
</template>

<script>
export default{
  data() {
    return {
      quizes: []
    }
  },
  mounted(){
    fetch('http://localhost:3000/quizes')
    .then(res => res.json())
    .then(data => this.quizes = data)
  },
  methods: {
    quizEval(){
      }
    }
    }
  
</script>

<style>

</style>