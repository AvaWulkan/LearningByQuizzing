<template>
<div>
  <h1>Du fick {{ $parent.totalPoints}} / {{$parent.correctAnswers.length}} poäng</h1>
  <div v-for="answer in $parent.studentAnswers" v-bind:key="answer">
    <p>Ditt svar: {{answer}}</p>
  </div>
  <div v-for="answer in $parent.correctAnswers" v-bind:key="answer">
    <p>Rätt svar: {{answer}}</p>
  </div>
<!--  <p>{{$parent.studentAnswers}}</p>
  <p>{{$parent.correctAnswers}}</p>-->
</div>
</template>

<script>
export default {

}

</script>

<style>

</style>