
<template>
  <div>
    <b-jumbotron header="Quiz" lead=""/>

    <div class="quiz-container row justify-content-center">
        <div v-for="i in 3" :key="i" class="quiz col-3">
            <h3>Bar quiz</h3>
        <img src="https://i.pcmag.com/imagery/reviews/03aizylUVApdyLAIku1AvRV-39.1605559903.fit_scale.size_760x427.png" alt="">
        <p>this quiz features a bunch of fun trivia questions, and the most famous bar locations</p>
        <router-link to="/">Play</router-link>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'quiz',
  data() {
    return {
      message: 'none'
    }
  }
}
</script>

<style>
    .quiz-container {
    }

    .quiz {
        max-width: 300px;
        height: 400px;
        background-color: #E0F5F5;
        border-radius: 25px;
        margin: 50px;
    }

    .quiz h3 {
        padding: 20px 0px 20px 20px;
    }

.quiz img {
        width: 150px;
        height: 150px;
        border-radius:50%;
        margin-bottom:20px;
    }

.quiz a {
        background-color: #369093;
        padding: 8px 35px 8px 35px;
        border-radius: 25px;
        color: #FFF;
        font-weight: 700;
    }
</style>
