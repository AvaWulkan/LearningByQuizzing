<template>
<div>
<h1>Quizes</h1>
<Quiz/>
<QuizStatistics/>
</div>
</template>


<script>
import Quiz from '../components/Quiz.vue'
import QuizStatistics from '../components/QuizStatistics.vue'

export default{
  components: {
    Quiz
  }
}

</script>

<style>
</style>