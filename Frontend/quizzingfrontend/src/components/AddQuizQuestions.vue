<template>
<div>
  <h1>{{ $parent.newQuizName }}</h1>
    <input v-model="newQuestion" type="text" placeholder="Skriv fråga">
    <input v-model="newCorrectAnswer" type="text" placeholder="Korrekt svar / Alternativ 1">
    <input v-model="newA1" type="text" placeholder="Svarsalternativ 2">
    <input v-model="newA2" type="text" placeholder="Svarsalternativ 3">
    <input v-model="newA3" type="text" placeholder="Svarsalternativ 4">

    <p>{{ newQuestion }}</p>
    <p>{{ newCorrectAnswer }}</p>
    <p>{{ newA1 }}</p>
    <p>{{ newA2 }}</p>
    <p>{{ newA3 }}</p>

</div>
</template>

<script>
export default {
    data(){
        return {
            newQuestion: null,
            newCorrectAnswer: null,
            newA1: null,
            newA2: null,
            newA3: null,
        }
    }
}

</script>

<style>

</style>