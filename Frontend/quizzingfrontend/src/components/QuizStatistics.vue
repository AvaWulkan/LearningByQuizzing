<template>
<div class="stats-wrapper">
  <h1>Resultat</h1>
<div class="points">
<h1>Du fick {{ $parent.totalPoints}} / {{$parent.correctAnswers.length}} poäng</h1>
<h1>({{($parent.totalPoints/$parent.correctAnswers.length*100).toFixed(0)}}% Rätt)</h1>
</div>
  <div class="stats-container">
    <!-- göra om divtagen -->
    <div class="questions" v-for="question in $parent.nameList" v-bind:key="question">
      <p>Fråga: {{ question }}</p>
    </div>

  <div class="student-answers" v-for="answer in $parent.studentAnswers" v-bind:key="answer">
    <p>Ditt svar: {{answer}}</p>
  </div>
  <div class="correct-answers" v-for="answer in $parent.correctAnswers" v-bind:key="answer">
    <p>Rätt svar: {{answer}}</p>
  </div>
    </div>
  </div>
<!--  <p>{{$parent.studentAnswers}}</p>
  <p>{{$parent.correctAnswers}}</p>-->

</template>

<script>
export default {

  data() {

    return {

      index: 0
    }
  },

  mounted() {


  }

}

</script>

<style scoped>

.stats-wrapper {

  display: flex;
  /*justify-content: center; */
  align-items: center;
  flex-direction: column;

}
.points {
  border: 2px solid black;
  border-radius: 16px;
  padding: 20px;

}

.stats-container {
  flex-direction: column;
  columns: 3;
  border: 2px solid black;
  border-radius: 16px;
  padding: 20px;
  margin-top: 20px;
}

.questions {
  border: 2px solid black;
  border-radius: 16px;
  padding: 20px;
}

.student-answers {
  border: 2px solid black;
  border-radius: 16px;
  padding: 20px;
  margin: 0 20px 0 20px;
}

.correct-answers {
  border: 2px solid black;
  border-radius: 16px;
  padding: 20px;
}

</style>