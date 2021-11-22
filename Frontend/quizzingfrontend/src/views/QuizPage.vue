<template>
<div class="quizpagewrapper">
  <div class="aside" v-if="!$store.state.quizChosen">
    <StudentResults/>
  </div>
  <div class="quiz">
    <Quiz/>
  </div>
</div>
</template>

<script>
import Quiz from '../components/Quiz.vue'
import StudentResults from '../components/StudentResults.vue'

export default{
  data() {
    return {
      refresh: 0
    }
  },
  components: {
    Quiz,
    StudentResults
  },
}
</script>

<style scoped>

.quizpagewrapper{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
  "aside quiz .";
}

.quiz {
  grid-area: quiz;
  display: flex;
  justify-content: center;
  width: 100%;
}

.aside {
  grid-area: aside;
  width: fit-content;
}


</style>