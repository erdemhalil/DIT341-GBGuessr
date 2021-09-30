
<template>
  <div>
    <b-jumbotron header="Quiz" lead=""/>

    <div class="quiz-container row justify-content-center">
        <div v-for="i in quizes" :key="i" class="quiz col-3">
            <h3>{{i.name}}</h3>
        <img v-bind:src="i.image" alt="">
        <h6>{{i.category}}</h6>
        <p>this quiz features a bunch of fun trivia questions, and the most famous bar locations</p>
        <router-link :to="{path: '/quiz/' + i._id}">Play</router-link>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'quiz',
  data() {
    return {
      message: 'none',
      quizes: []
    }
  },
  mounted() {
    this.url_data = this.$route.params.id
    fetch('http://localhost:3000/api/quizes/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.forEach(element => {
          this.quizes.push(element)
        })
        console.log(this.quizes)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
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
