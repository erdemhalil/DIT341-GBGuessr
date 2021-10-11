<template>
  <div>
    <h1>Leaderboard</h1>
    <b-row class="justify-content-center" id="leaderboard-row">
    <b-col class="" v-for="i in quizes" :key="i" lg="8" md="10" sm="12">
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
    fetch('http://localhost:3000/api/quizes/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        this.quizes = data
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  },
  methods: {
    requestScore(e) {
      const index = this.quizes.findIndex((item) => item.name === e)
      fetch(
        `http://localhost:3000/api/scores/quizes/${this.quizes[index]._id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.scores = []
          data.forEach(element => {
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
  padding: 20px;
}

#leaderboard-row {
  min-width: 100%;
}

#leaderboard-header {
  font-size: 22px!important;
}
</style>
