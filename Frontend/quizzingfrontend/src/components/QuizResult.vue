<template>
<div class="stats-wrapper">
  <h1>Resultat</h1>
  <div class="points border">
    <h1 v-if="$parent.totalPoints/$parent.correctAnswers.length*100 === 100">Du fick alla rätt! Bra jobbat!</h1>
    <h1 v-else>Du fick {{ $parent.totalPoints}} / {{$parent.correctAnswers.length}} poäng</h1>
    <h1>({{($parent.totalPoints/$parent.correctAnswers.length*100).toFixed(0)}}% Rätt)</h1>
  </div>
  <div class="stats-container border">
    <div class="questions border shadow" v-for="question in $parent.questions" v-bind:key="question">
      <p>Fråga: {{ question }}?</p>
    </div>
    <div class="student-answers border shadow" v-for="answer in $parent.studentAnswers" v-bind:key="answer">
      <p>Ditt svar: {{answer}}</p>
    </div>
    <div class="correct-answers border shadow" v-for="answer in $parent.correctAnswers" v-bind:key="answer">
      <p>Rätt svar: {{answer}}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
h1 {
  text-align: center;
}
p {
  text-align: center;
}
.stats-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.points {
  padding: 20px;
  background-color: rgb(194, 208, 245);
  width: 100%;
}
.stats-container {
  flex-direction: column;
  columns: 3;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
}
.questions {
  background-color: #DDF0AF;
  padding: 20px;
  margin-bottom: 20px;
}
.student-answers {
  background-color: #F0B8AF;
  padding: 20px;
  margin: 0 20px 20px 20px;
}
.correct-answers {
  background-color: #99F5B3;
  padding: 20px;
  margin-bottom: 20px;
}
</style>