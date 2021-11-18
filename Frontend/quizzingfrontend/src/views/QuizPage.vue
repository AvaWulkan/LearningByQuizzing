<template>
<div>
  <Quiz/>
  <div v-if="!$store.state.quizChosen">
  <StudentResults/>
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

<style>
</style>