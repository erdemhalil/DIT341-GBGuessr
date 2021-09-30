<template>
  <div>
    <b-jumbotron header="Take quiz" lead=""/>
  <div class="question-container">
    <div class="meta-data-header"><span id="quiz-meta-name">{{quiz.name}}</span> <span id="quiz-meta-timer">10:39</span>
    <div class="question-step-info-container"><span id="question-step-header">Question</span> <span id="current-step">{{step}}</span><span id="total-quiz-length">/{{ questions.length }}</span></div>
    </div>
    <div class="answer-table">
    <p>{{ questions[0].description }}</p>
    <span class="question-option" v-for="i in 4" :key="i" >Lorem<input name="option" type="radio"></span>
    </div>
    <div class="question-meta-footer">
        <span id="quit-quiz-option">Quit quiz</span> <span id="next-question-option"><button>Next</button></span>
  </div>
  </div>
  </div>
</template>

<script>

export default {
  name: 'leaderboard',
  data() {
    return {
      message: 'none',
      quizId: this.$route.params.id,
      step: 1,
      questions: [],
      quiz: {}
    }
  },
  mounted() {
    fetch(`http://localhost:3000/api/quizes/${this.quizId}/questions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.questions = data.questions
        console.log(this.questions)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    fetch(`http://localhost:3000/api/quizes/${this.quizId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.quiz = data
        console.log(this.quiz)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
}
</script>

<style>

.question-container {
  width: 80%;
  margin: auto;
}

.meta-data-header {
  height: 100px;
}

#quiz-meta-name {
  color: #9c9c9c;
  font-size: 18px;
  font-weight: 900;
  float: left;
}

#quiz-meta-timer {
  color: #9c9c9c;
  font-size: 18px;
  font-weight: 900;
  float: right;
}

.question-step-info-container {
  max-width: 200px;
  display: inline-block;
  float: left;
  clear: left;
}

#current-step {
  font-size: 28px;
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
  border: 2px solid #21B0B5;
  border-radius: 25px;
  padding: 10px;
  margin: 10px;

}

.question-option input {
  float: right;
  position: relative;
  top: 5px;
   width: 25px;
  height: 1em;
}

.question-meta-footer {
  width: 500px;
  padding: 50px 0px 50px 0px;
  margin: auto;
}

#quit-quiz-option {
  float: left;
  font-weight: 600;
}

#next-question-option {
  float: right;
}

#next-question-option button {
  background: #369093;
  color: #FFF;
  font-weight: 700;
  border: none;
  padding: 5px 25px 5px 25px;
  border-radius: 10px;
}

</style>
