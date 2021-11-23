<template>
  <div class="stats-wrapper">
    <h1>Resultat</h1>
    <div class="points border">
      <h1 v-if="$parent.totalPoints/$parent.correctAnswers.length*100 === 100">Du fick alla rätt! Bra jobbat!</h1>
      <h1 v-else>Du fick {{ $parent.totalPoints}} / {{$parent.correctAnswers.length}} poäng</h1>
      <h1>({{($parent.totalPoints/$parent.correctAnswers.length*100).toFixed(0)}}% Rätt)</h1>
    </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Fråga</th>
            <th scope="col">Svar</th>
            <th scope="col">Rätt svar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(question, index) in $parent.questions" :key="question">
            <td>{{question}}</td>
            <td v-bind:style="{backgroundColor: colorArray[index]}">{{$parent.studentAnswers[index]}}</td>
            <td>{{$parent.correctAnswers[index]}}</td>
          </tr>
        </tbody>
        </table>
  </div>
</template>

<script>
export default {
  mounted(){
    this.markCorrectAnswerGreen()
  },
  data(){
    return{
      colorArray: []
    }
  },
methods:{
  markCorrectAnswerGreen(){
    for(let i = 0; i < this.$parent.correctAnswers.length; i++){
      if (this.$parent.correctAnswers[i] === this.$parent.studentAnswers[i]){
        this.colorArray.push('green')
      } else {
        this.colorArray.push('red')
      }
    }
  }

}
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