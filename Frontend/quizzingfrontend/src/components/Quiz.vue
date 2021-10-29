<template>
<div>
<div v-for="quiz in quizes" :key="quiz.id">
<div v-for="quiz2 in quiz" :key="quiz2.id">
    <div v-for="quiz3 in quiz2" :key="quiz3.id">
<p>{{quiz3.question}} {{quiz3.q1}} {{quiz3.q2}} {{quiz3.q3}} {{quiz3.q4}}</p>
</div>
</div>
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