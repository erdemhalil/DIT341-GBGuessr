<template>
  <div>
    <h1>Leaderboard</h1>
    <b-row class="justify-content-center" id="leaderboard-row">
    <b-col class="" :key="i" lg="8" md="10" sm="12">
    <b-form-input
      list="my-list-id"
      v-on:change="(e) => requestScore(e)"
    ></b-form-input>

    <datalist id="my-list-id">
      <option v-for="quiz in quizes" :key="quiz._id">{{ quiz.name }}</option>
    </datalist><br/>
    <div>
      <b-table striped hover :items="scores" :fields="fields"></b-table>
    </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'leaderboard',
  data() {
    return {
      message: 'none',
      quizes: [],
      scores: [],
      fields: [
        {
          key: 'username',
          label: 'Name',
          sortable: true
        },
        {
          key: 'value',
          label: 'Score',
          sortable: true
        },
        {
          key: 'created_on',
          sortable: true
        }
      ]
    }
  },
  mounted() {
    Api.get('/quizes')
      .then(response => {
        this.quizes = response.data
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  },
  methods: {
    requestScore(e) {
      const index = this.quizes.findIndex((item) => item.name === e)
      Api.get(`/scores/quizes/${this.quizes[index]._id}`)
        .then(response => {
          this.scores = []
          response.data.forEach(element => {
            this.scores.push(element)
            this.scores.forEach(score => {
              score.created_on = score.created_on.slice(0, 10) + ' ' + score.created_on.slice(11, 19)
            })
          })
          console.log(this.scores)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }
}
</script>
<style>
h1 {
  padding-top: 100px;
}

#leaderboard-row {
  min-width: 100%;
}

#leaderboard-header {
  font-size: 22px!important;
}
</style>
