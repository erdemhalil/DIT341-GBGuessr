<template>
  <div class="background">
    <img id = "bannerImage" src="https://i.imgur.com/qA90xIX.png" alt="GBGuesser Banner">
    <div class="aboutContainer">
    <div class="about">
      <h3 style="text-align:center;">ABOUT</h3>
      <p>Gothenburg Guesser, or GBGuesser, is a quizgame about geography, history and culture surrounding the swedish city Gothenburg!
      </p>
      <h3 style="text-align:center;">CREDITS</h3>
      <p style="text-align:center;">
        Enis Bourbia
        <br>Edvin Danielsson
        <br>Erdem Halil
      </p>
      <div id="playButton">
        <router-link to="/quiz"><b>TO QUIZES</b></router-link>
        </div>
    </div>
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
  width:100%;
  user-select: none;
}

.background {
  position: absolute;
  min-height: 100vh;
  background:linear-gradient(45deg, #369093, #b3b3b3);
}

.about {
        text-align: left;
        background-color: #E0F5F5;
        padding: 10px;
        border-radius: 25px;
        width: 40vw;
        margin:35px auto 10px auto;
    }
.about p {
  margin: 3px 30px 3px 30px;
}

.about h3 {
  margin: 10px auto 20px auto;
}
#playButton {
  background: #369093;
  padding: 8px 20px 8px 20px;
  border-radius: 50px;
  margin: auto auto 4% auto;
  width: 180px;
  text-align: center;
}
#playButton a{
 color: #E0F5F5;
}

@media screen and (max-width: 768px) {
  .about {
    width: 80vw;
  }
}

</style>
