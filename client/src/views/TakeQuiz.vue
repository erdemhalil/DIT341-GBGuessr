<template>
  <div>
    <div class="question-container">
      <b-row class="justify-content-center">
        <b-col cols lg="6">
          <div class="question-step-info-container">
            <span id="question-step-header">Question</span>
            <span id="current-step">{{ step + 1 }}</span
            ><span id="total-quiz-length">/{{ questions.length }}</span>
          </div>
        </b-col>
        <b-col cols lg="6">
          <div class="meta-data-header">
            <span id="quiz-meta-name">{{ quiz.name }}</span
            ><br />
            <span id="quiz-meta-timer">{{ timer }} Seconds</span>
          </div>
        </b-col>
      </b-row>
      <b-row class="justify-content-center">
        <b-col col lg="8" md="8" sm="12">
          <p id="question-description">{{ questions[step].description }}</p>
          <span
            class="question-option"
            v-for="y in questions[step].options"
            :key="y"
            >{{ y
            }}<input
              v-bind:name="step"
              type="radio"
              v-bind:value="y"
              v-model="answers"
          /></span>
        </b-col>
      </b-row>
      <div class="question-meta-footer">
        <span id="quit-quiz-option"
          ><router-link to="/quiz">Quit quiz</router-link></span
        >
        <span id="next-question-option"
          ><button
            v-on:click="nextQuestion()"
            v-if="step + 1 !== this.questions.length"
          >
            Next</button
          ><button v-else v-on:click="nextQuestion()" v-b-modal.modal-1>
            Submit
          </button></span
        >
      </div>
      </div>
      <div>
        <b-modal id="modal-1" title="Submit score" @ok="submitQuiz()">
        <p class="my-4"></p>You scored: <b>{{score}}</b> <br> You finished the quiz in: <b>{{timer}}</b> seconds<br>
        <input id="modal-username" type="text" placeholder="Enter username" v-model="username">
        </b-modal>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'leaderboard',
  data() {
    return {
      message: 'none',
      quizId: this.$route.params.id,
      step: 0,
      answers: null,
      questions: [],
      quiz: {},
      countInterval: null,
      timer: 0,
      score: 0,
      username: '',
      quiz_finished: false
    }
  },

  methods: {
    startTimer() {
      this.countInterval = setInterval(() => {
        this.timer += 1
      }, 1000)
    },
    nextQuestion() {
      if (this.questions[this.step].answer === this.answers) {
        this.score += this.questions[this.step].score
      }
      this.step++
    },
    submitQuiz() {
      if (this.username === '') {
        this.username = undefined
      }
      Api.post('/scores',
        {
          value: this.score,
          username: this.username,
          quiz_id: this.quiz._id
        })
        .catch((error) => {
          console.error('Error:', error)
        })
      this.$router.push('/quiz')
    }
  },

  mounted() {
    this.startTimer()
    Api.get(`quizes/${this.quizId}/questions`)
      .then((response) => {
        this.questions = response.data.questions
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    Api.get(`quizes/${this.quizId}`)
      .then((response) => {
        this.quiz = response.data
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
}
</script>

<style>
.question-container {
  padding-top: 100px;
}

.meta-data-header {
  height: 100px;
}

#quiz-meta-name {
  color: #9c9c9c;
  font-size: 18px;
  font-weight: 900;
}

#quiz-meta-timer {
  color: #9c9c9c;
  font-size: 18px;
  font-weight: 900;
}

.question-step-info-container {
}

#current-step {
  font-size: 28px;
  font-weight: 900;
}

#question-description {
  font-size: 25px;
  font-weight: 900;
}

#total-quiz-length {
  color: #9c9c9c;
  font-size: 22px;
  font-weight: 600;
}

#question-step-header {
  font-size: 24px;
  font-weight: 500;
}

.question-option {
  font-size: 22px;
  font-weight: 500;
  width: 500px;
  display: inline-block;
  text-align: left;
  border: 2px solid #21b0b5;
  border-radius: 25px;
  padding: 10px;
  margin: 10px;
}

@media screen and (max-width: 768px) {
  .question-option {
    width: 90vw;
  }
}

.question-option input {
  float: right;
  position: relative;
  top: 5px;
  width: 25px;
  height: 1em;
}

.question-meta-footer {
  padding: 50px 0px 50px 0px;
  width: 500px;
  margin: auto;
}

@media screen and (max-width: 768px) {
.question-meta-footer {
  width: 95vw;
}
#modal-username{
  max-width: 100%;
}
}

#quit-quiz-option a {
  float: left;
  margin-left: 10px;
  font-weight: 600;
  color: black;
}

#next-question-option {
  float: right;
}

#next-question-option button {
  background: #369093;
  color: #fff;
  font-weight: 700;
  border: none;
  padding: 5px 25px 5px 25px;
  border-radius: 10px;
}

#modal-username {
  padding: 8px 10px 8px 10px;
  width: 400px;
  border-radius: 5px;
  border: 1px solid gray;
}
</style>
