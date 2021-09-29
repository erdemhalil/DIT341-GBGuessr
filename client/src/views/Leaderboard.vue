<template>
  <div>
    <b-jumbotron header="Leaderboards" lead="" />
    <b-form-input
      list="my-list-id"
      v-on:change="(e) => requestScore(e)"
    ></b-form-input>

    <datalist id="my-list-id">
      <option v-for="quiz in quizes" :key="quiz._id">{{ quiz.name }}</option>
    </datalist>
    <div>
      <b-table striped hover :items="scores" :fields="fields"></b-table>
    </div>
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
          key: 'value',
          label: 'Score',
          sortable: true
        },
        {
          key: 'rank',
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
        console.log(this.quizes)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  },
  methods: {
    requestScore(e) {
      const index = this.quizes.findIndex((item) => item.name === e)
      console.log(index)
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
          this.scores = data
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
</style>
