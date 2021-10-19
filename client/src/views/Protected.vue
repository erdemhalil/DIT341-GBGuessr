<template>
  <div>
    <div class="buttons">
      <h1>
        <b>Admin Page</b>
      </h1>
      <b-button size="lg" v-b-modal.modal-create-quiz>Create Quiz</b-button>
      <b-button
        size="lg"
        v-on:click="requestAllQuizes()"
        v-b-modal.modal-list-quizes
        >Manage Quizes</b-button
      >
      <b-button size="lg" v-b-modal.modal-manage-score>Manage Scores</b-button>
    </div>

    <!-- CREATE QUIZ -->
    <b-modal
      id="modal-create-quiz"
      ref="modal"
      title="Create Quiz"
      size="xl"
      ok-title="Submit"
      @show="resetModal"
      @hidden="resetModal"
      @ok="validateForms('modal-create-quiz', $event)"
    >
      <form ref="quizForm" @submit.stop.prevent="handleSubmit">
        <b-form-group
          ref="quizName"
          id="quizname"
          label="Quiz Name"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          ref="quizCategory"
          label="Category"
          invalid-feedback="Category is required"
          :state="categoryState"
        >
          <b-form-input
            id="category-input"
            required
            v-model="category"
            :state="categoryState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Description"
          invalid-feedback="Description is required"
          :state="descriptionState"
        >
          <b-form-input
            id="description-input"
            v-model="description"
            :state="descriptionState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Image Link"
          invalid-feedback="Image is required"
          :state="imageState"
        >
          <b-form-input
            id="image-input"
            type="URL"
            required
            v-model="image"
            :state="imageState"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <!-- MANAGE QUIZES -->
    <b-modal
      id="modal-list-quizes"
      ref="modal"
      title="Manage Quiz"
      size="xl"
      ok-only="true"
      ok-title="Leave"
    >
      <datalist id="quizes-list">
        <option v-for="quiz in quizes" :key="quiz._id">{{ quiz.name }}</option>
      </datalist>
      <div>
        <b-table
          ref="quiz-table"
          striped
          hover
          :items="quizes"
          :fields="quizFields"
        >
          <template #cell(_id)="quizData">
            <b-button
              class="responsive-button"
              size="sm"
              variant="danger"
              v-on:click="deleteQuiz(quizData.value)"
            >
              Delete
            </b-button>
            <b-button
              size="sm"
              class="responsive-button"
              v-on:click="requestQuestion(quizData.value)"
              v-b-modal.modal-view-quiz
              >Modify</b-button
            >
          </template>
        </b-table>
      </div>
      <!-- view specific quiz modal -->
      <b-modal
        id="modal-view-quiz"
        ref="modal"
        title="Viewing Quiz"
        size="xl"
        ok-only="true"
        ok-title="Leave"
      >
        <b-button size="m" v-b-modal.modal-add-question>
          Add new Question
        </b-button>
        <b-button size="m" v-b-modal.modal-edit-quiz variant="info">
          Edit Quiz
        </b-button>
        <datalist id="questions-list">
          <option v-for="quiz in quizes" :key="quiz._id">
            {{ quiz.name }}
          </option>
        </datalist>
        <div>
          <b-table
            ref="questions-table"
            striped
            hover
            :items="questions"
            :fields="questionFields"
          >
            <template #cell(_id)="questionData">
              <b-button
                class="responsive-button"
                size="sm"
                variant="danger"
                v-on:click="deleteQuestion(questionData.value)"
              >
                Delete
              </b-button>
              <b-button
                size="sm"
                variant="info"
                v-b-modal.modal-patch-score
                class="responsive-button"
              >
                Score
              </b-button>
              <b-modal
                id="modal-patch-score"
                ref="modal"
                title="Update Score"
                size="m"
                ok-variant="success"
                ok-title="Submit"
                @show="resetModal"
                @ok="patchQuestionScore(questionData.value, $event)"
              >
                <p>Update the score of the question:</p>
                <b-form-input
                  ref="patchScore"
                  id="questionScore-input"
                  v-model="questionScore"
                  :state="questionScoreState"
                  required
                  type="number"
                ></b-form-input>
              </b-modal>
            </template>
          </b-table>
        </div>
      </b-modal>
      <!-- add question modal -->
      <b-modal
        id="modal-add-question"
        ref="modal"
        title="Add Question"
        size="xl"
        ok-title="Submit"
        @show="resetModal"
        @ok="validateForms('modal-add-question', $event)"
      >
        <form ref="questionForm" @submit.stop.prevent="handleSubmit">
          <p style="font-size: 10px">Current quiz ID: {{ selectedQuiz }}</p>
          <b-form-group
            ref="description"
            id="questionDescription"
            label="Question Description"
            label-for="questionDescription-input"
            invalid-feedback="Description is required"
            :state="questionDescriptionState"
          >
            <b-form-input
              id="questionDescription-input"
              v-model="questionDescription"
              :state="questionDescriptionState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            ref="questionOptions"
            label="Options"
            label-for="questionOptions-input"
            invalid-feedback="Options and Answer are required"
            :state="questionOptionsState"
          >
            <p style="font-size: 13px">
              Separate each option with a semicolon ' ; '
            </p>
            <b-form-input
              id="questionOptions-input"
              v-model="questionOptions"
              :state="questionOptionsState"
              required
            ></b-form-input>
            <p style="font-size: 13px">Correct Answer</p>
            <b-form-input
              id="questionAnswer-input"
              v-model="questionAnswer"
              :state="questionAnswerState"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Score"
            label-for="questionScore-input"
            invalid-feedback="Score is required and must be a whole number"
            :state="questionScoreState"
          >
            <b-form-input
              id="questionScore-input"
              v-model="questionScore"
              required
              type="number"
              :state="questionScoreState"
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
      <!-- edit (put) quiz -->
      <b-modal
        id="modal-edit-quiz"
        ref="modal"
        title="Edit Quiz"
        size="xl"
        ok-title="Submit"
        @show="resetModal"
        @hidden="resetModal"
        @ok="validateForms('modal-edit-quiz', $event)"
      >
        <form ref="quizForm" @submit.stop.prevent="handleSubmit">
          <b-form-group
            ref="quizName"
            id="quizname"
            label="Quiz Name"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="name"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            ref="quizCategory"
            label="Category"
            invalid-feedback="Category is required"
            :state="categoryState"
          >
            <b-form-input
              id="category-input"
              required
              v-model="category"
              :state="categoryState"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Description"
            invalid-feedback="Description is required"
            :state="descriptionState"
          >
            <b-form-input
              id="description-input"
              v-model="description"
              :state="descriptionState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Image Link"
            invalid-feedback="Image is required"
            :state="imageState"
          >
            <b-form-input
              id="image-input"
              type="URL"
              required
              v-model="image"
              :state="imageState"
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </b-modal>
    <!-- MANAGE SCORE -->
    <b-modal
      id="modal-manage-score"
      ref="modal"
      title="Manage Score"
      size="xl"
      ok-only="true"
      ok-title="Leave"
    >
      <b-form-input
        list="scores-list"
        v-on:change="(id) => requestScore(id)"
      ></b-form-input>
      <b-button
        size="m"
        variant="danger"
        v-b-modal.modal-clear-leaderboard
        class="responsive-button"
      >
        Clear All Leaderboards
      </b-button>
      <b-modal
        id="modal-clear-leaderboard"
        ref="modal"
        title="Are you Sure?"
        size="m"
        ok-variant="success"
        ok-title="Yes"
        cancel-title="No"
        @ok="deleteAllScore()"
      >
        <p>
          This action will delete all scores from all leaderboards in all
          quizes, and is irreversible!
        </p>
      </b-modal>
      <datalist id="scores-list">
        <option v-for="quiz in quizes" :key="quiz._id">{{ quiz.name }}</option>
      </datalist>
      <div>
        <b-table
          ref="table"
          striped
          hover
          :items="scores"
          :fields="scoreFields"
        >
          <template #cell(_id)="scoreData">
            <b-button
              size="sm"
              variant="danger"
              v-on:click="deleteScore(scoreData.value)"
              class="mr-2 responsive-button"
            >
              Delete
            </b-button>
          </template>
        </b-table>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { Api } from '@/Api'
export default {
  name: 'home',
  data() {
    return {
      message: 'Test!',
      quizes: [],
      scores: [],
      questions: [],
      scoreFields: [
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
        },
        {
          key: '_id',
          label: 'Delete Score',
          sortable: false
        }
      ],
      quizFields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true
        },
        {
          key: 'description',
          label: 'Description',
          sortable: true
        },
        {
          key: 'category',
          labe: 'Category',
          sortable: true
        },
        {
          key: '_id',
          label: 'Actions',
          sortable: false
        }
      ],
      questionFields: [
        {
          key: 'description',
          label: 'Description',
          sortable: true
        },
        {
          key: 'answer',
          label: 'Answer',
          sortable: true
        },
        {
          key: 'score',
          label: 'Score',
          sortable: true
        },
        {
          key: '_id',
          label: 'Actions',
          sortable: false
        }
      ],
      quizname: '',
      nameState: '',
      descriptionState: '',
      imageState: '',
      categoryState: '',
      selectedQuiz: '',
      questionDescription: '',
      questionDescriptionState: null,
      questionAnswer: '',
      questionAnswerState: null,
      questionOptions: '',
      questionOptionsState: null,
      questionScore: null,
      questionScoreState: null
    }
  },
  beforeMount() {
    if (!this.$session.get('user')) {
      this.$router.push('/admin')
    }
  },
  mounted() {
    Api.get('/quizes')
      .then((response) => {
        response.data.forEach((element) => {
          this.quizes.push(element)
        })
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    Api.get('/questions')
      .then((response) => {
        response.data.forEach((element) => {
          this.questions.push(element)
        })
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  },
  methods: {
    requestAllQuizes() {
      this.quizes = []
      Api.get('/quizes')
        .then((response) => {
          response.data.forEach((element) => {
            this.quizes.push(element)
          })
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    requestScore(id) {
      const index = this.quizes.findIndex((item) => item.name === id)
      Api.get(`/scores/quizes/${this.quizes[index]._id}`)
        .then((response) => {
          this.scores = [] // resets the score
          response.data.forEach((element) => {
            // adds the all score from the Get method
            this.scores.push(element)
            this.scores.forEach((score) => {
              score.created_on =
                score.created_on.slice(0, 10) +
                ' ' +
                score.created_on.slice(11, 19)
            })
          })
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    requestQuiz() {
      Api.get(`quizes/${this.quizes}`)
        .then((response) => {
          this.quizes = []
          response.data.forEach((element) => {
            this.quizes.push(element)
          })
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    requestQuestion(id) {
      this.selectedQuiz = id // remembers the quiz ID
      this.questions = []
      Api.get(`quizes/${id}/questions/`)
        .then((response) => {
          response.data.questions.forEach((element) => {
            this.questions.push(element)
          })
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    checkFormValidity() {
      const valid = this.$refs.quizForm.checkValidity() // boolean
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
      this.description = ''
      this.descriptionState = null
      this.image = null
      this.imageState = null
      this.category = null
      this.categoryState = null
      this.questionScore = null
      this.questionScoreState = null
      this.questionDescription = null
      this.questionDescriptionState = null
      this.questionAnswer = null
      this.questionAnswerState = null
      this.questionOptions = null
      this.questionOptionsState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      this.createQuiz()
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-create-quiz')
      })
    },
    validateForms(currentModal, bvModalEvt) {
      bvModalEvt.preventDefault()
      console.log('validateForms initiliazed')
      // make an AND statement e.g. if (is a URL && x.checkValidity() )
      if (
        currentModal === 'modal-create-quiz' ||
        currentModal === 'modal-edit-quiz'
      ) {
        this.nameState = this.$refs.quizForm['name-input'].checkValidity()
        this.categoryState =
          this.$refs.quizForm['category-input'].checkValidity()
        this.descriptionState =
          this.$refs.quizForm['description-input'].checkValidity()
        this.imageState = this.$refs.quizForm['image-input'].checkValidity()
        if (this.$refs.quizForm.checkValidity()) {
          if (currentModal === 'modal-create-quiz') {
            this.createQuiz()
          } else this.putQuiz()
          // Hide the modal manually
          this.$nextTick(() => {
            this.$bvModal.hide(currentModal)
          })
        }
      }
      if (currentModal === 'modal-add-question') {
        this.questionDescriptionState =
          this.$refs.questionForm['questionDescription-input'].checkValidity()
        this.questionOptionsState =
          this.$refs.questionForm['questionOptions-input'].checkValidity()
        this.questionAnswerState =
          this.$refs.questionForm['questionAnswer-input'].checkValidity() // Must match one option
        this.questionScoreState =
          this.$refs.questionForm['questionScore-input'].checkValidity() // Must be an int

        if (this.$refs.questionForm.checkValidity()) {
          this.createQuestion()
          this.$nextTick(() => {
            this.$bvModal.hide(currentModal)
          })
        }
      }
    },
    createQuiz() {
      Api.post('/quizes', {
        name: this.name,
        description: this.description,
        image: this.image,
        category: this.category
      }).catch((error) => {
        console.error('Error:', error)
      })
    },
    createQuestion() {
      const optionList = this.questionOptions.split(/\s*(?:;|$)\s*/)
      Api.post(`/quizes/${this.selectedQuiz}/questions`, {
        description: this.questionDescription,
        options: optionList,
        answer: this.questionAnswer,
        score: this.questionScore
      }).catch((error) => {
        console.error('Error:', error)
      })
    },
    deleteScore(id) {
      Api.delete(`/scores/${id}`)
        .catch((error) => {
          console.error('Error:', error)
        })
        .then((response) => {
          const index = this.scores.findIndex((score) => score._id === id)
          if (~index) {
            this.scores.splice(index, 1)
          }
        })
    },
    deleteAllScore() {
      Api.delete('/scores').catch((error) => {
        console.error('Error:', error)
      })
    },
    deleteQuiz(id) {
      Api.delete(`/quizes/${id}`)
        .catch((error) => {
          console.error('Error:', error)
        })
        .then((response) => {
          const index = this.quizes.findIndex((quiz) => quiz._id === id)
          if (~index) {
            this.quizes.splice(index, 1)
          }
        })
    },
    deleteQuestion(id) {
      Api.delete(`/questions/${id}`)
        .catch((error) => {
          console.error('Error:', error)
        })
        .then((response) => {
          const index = this.questions.findIndex(
            (question) => question._id === id
          )
          if (~index) {
            this.questions.splice(index, 1)
          }
        })
    },
    putQuiz() {
      Api.put(`/quizes/${this.selectedQuiz}`, {
        name: this.name,
        description: this.description,
        image: this.image,
        category: this.category
      }).catch((error) => {
        console.error('Error:', error)
      })
    },
    patchQuestionScore(id, bvModalEvt) {
      bvModalEvt.preventDefault()
      console.log(this.questionScore)
      const valid = this.$refs.patchScore.checkValidity()
      this.questionScoreState = valid
      if (valid) {
        Api.patch(`/questions/${id}`, {
          score: this.questionScore
        }).catch((error) => {
          console.error('Error:', error)
        })
        this.$nextTick(() => {
          this.$bvModal.hide('modal-patch-score')
        })
      }
    }
  }
}
</script>
<style>
.buttons {
  margin: 10% auto auto auto;
}
.buttons button {
  margin: 10px;
}
.buttons h1 {
  margin-bottom: 50px;
}

.btn {
  margin-right: 5px;
}

.modal-content label {
  font-size: 17px !important;
}

@media screen and (max-width: 600px) {
  .modal-content {
    font-size: 7px;
  }

  .responsive-button {
    padding: 0px !important;
    font-size: 7px;
  }

  .leaderboard-button {
    margin: 5px;
  }
}
</style>
