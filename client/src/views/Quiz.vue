
<template>
  <div>
    <b-jumbotron header="Quiz" lead=""/>

      <b-container>
        <b-row class="justify-content-center">
        <b-col class="quiz-columns" v-for="i in quizes" :key="i" lg="4" md="6" sm="12">
        <div class="quiz">
            <h3>{{i.name}}</h3>
        <img v-bind:src="i.image" alt="">
        <h6>{{i.category}}</h6>
        <p>{{i.description}}</p>
        <router-link :to="{path: '/quiz/' + i._id}">Play</router-link>
        </div>
        </b-col>
        </b-row>
      </b-container>
      </div>
</template>

<script>
import { Api } from '@/Api'

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
    Api.get('/quizes')
      .then(response => {
        console.log(response.data)
        response.data.forEach(element => {
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

    .quiz-columns {
      padding: 10px;
    }
    .quiz {
        min-height: 450px;
        background-color: #E0F5F5;
        border-radius: 25px;
        padding: 10px;
    }

    .quiz h3 {
        padding: 20px 0px 20px 0px;
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
