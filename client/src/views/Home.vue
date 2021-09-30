<template>
  <div class="background">
    <img id = "bannerImage" src="https://i.imgur.com/qA90xIX.png" alt="GBGuesser Banner">
    <div class="about">
      <h3 style="text-align:center;">ABOUT</h3>
      <p>Gothenburg Guesser, or GBGuesser, is a quizgame about geography, history and culture surrounding the swedish city Gothenburg!
        <br>
        Check it out!
      </p>
      <h3 style="text-align:center;">CREDITS</h3>
      <p style="text-align:center;">
        <br>Enis Bourbia
        <br>Erdem Halil
        <br>Edvin Danielsson
      </p>
    </div>
    <div class="randomQuiz">
      <p> bruh</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
#bannerImage {
  margin-top: -15px;
  width:100%;
  user-select: none;
}

.background {
  background:linear-gradient(45deg, #369093, #b3b3b3);
}

.about {
        position: relative;
        text-align: left;
        background-color: #E0F5F5;
        border-radius: 25px;
        border-width: 50px;
        width: 500px;
        margin:25px auto 10px auto;
    }
.randomQuiz
 {
        text-align: left;
        background-color: #E0F5F5;
        border-radius: 25px;
        border-width: 50px;
        width: 500px;
        margin:25px auto 10px auto;
    }
.quiz
{
       position: relative;
       max-width: 300px;
        height: 400px;
        background-color: #E0F5F5;
        border-radius: 25px;
        margin: 50px;
    }
</style>
