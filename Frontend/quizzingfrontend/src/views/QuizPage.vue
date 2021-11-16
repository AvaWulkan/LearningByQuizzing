<template>
<div>
  <Quiz/>
  <LatestResults/>
</div>
</template>

<script>
import Quiz from '../components/Quiz.vue'
import LatestResults from '../components/LatestResults.vue'

export default{
  data() {
    return {
      refresh: 0
    }
  },
  components: {
    Quiz,
    LatestResults
  },
}
</script>

<style>
</style>