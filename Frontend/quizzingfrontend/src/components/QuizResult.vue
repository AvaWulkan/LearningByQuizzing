<template>
  <div class="stats-wrapper">
    <h1>Resultat</h1>
    <div class="points resultshadow">
      <h1 v-if="$parent.totalPoints/$parent.correctAnswers.length*100 === 100">Du fick alla rätt! Bra jobbat !</h1>
      <h1 v-else>Du fick {{ $parent.totalPoints}} / {{$parent.correctAnswers.length}} poäng</h1>
      <h1 v-if="$parent.totalPoints/$parent.correctAnswers.length*100 !== 100">({{($parent.totalPoints/$parent.correctAnswers.length*100).toFixed(0)}}% Rätt)</h1>
    </div>
    <button @click="showResult"><p>Visa resultat</p></button>

    <table v-show="showResults" class="resultstable">
      <thead>
        <tr>
          <th scope="col"><h2>Fråga</h2></th>
          <th scope="col"><h2>Ditt svar</h2></th>
          <th scope="col"><h2>Rätt svar</h2></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, index) in $parent.questions" :key="question">
          <td><p>{{question}}</p></td>
          <td v-bind:style="{backgroundColor: colorArray[index]}"><p>{{$parent.studentAnswers[index]}}</p></td>
          <td><p>{{$parent.correctAnswers[index]}}</p></td>
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
      colorArray: [],
      showResults: false
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
  },
  showResult() {
    if(this.showResults === false)
   this.showResults = true
   else
   this.showResults = false
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
  background-color: rgb(201, 221, 228);
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

.resultstable {
  min-width: 400px;
  max-width: 800px;
}

.resultshadow {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 20px;
}
</style>