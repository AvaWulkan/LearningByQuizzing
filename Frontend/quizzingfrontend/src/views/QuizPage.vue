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
/* MOBILE FIRST */


.quiz {
  grid-area: quiz;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.aside{
  display: none;
}

/* Tablet */
@media screen and (min-width: 768px) and (max-width: 1024px) {

}

/* Desktop */
@media screen and (min-width: 1025px) {
  .quizpagewrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
  "aside quiz .";
  }
  .aside {
    grid-area: aside;
    width: fit-content;
    margin-top: 70px;
  }
}

</style>