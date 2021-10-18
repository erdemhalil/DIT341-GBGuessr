<template>
  <div>
    <p>
      <b>Welcome to the Admin page!</b>
    </p>
    <div class="buttons">
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
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          ref="name"
          id="quizname"
          label="Quiz Name"
          label-for="name-input"
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
          ref="category"
          label="Category"
          label-for="category-input"
          invalid-feedback="Category is required"
          :state="categoryState"
        >
          <b-form-input
            id="category-input"
            v-model="category"
            :state="categoryState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Description"
          label-for="description-input"
          invalid-feedback="Description is required"
          :state="descriptionState"
        >
          <b-form-input
            id="description-input"
            v-model="description"
            :state="descriptionState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Image Link"
          type="URL"
          label-for="image-input"
          invalid-feedback="Image is required"
          :state="imageState"
        >
          <b-form-input
            id="image-input"
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
        size="lg"
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
                size="sm"
                variant="danger"
                v-on:click="deleteQuestion(questionData.value)"
              >
                Delete
              </b-button>
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
        @ok="createQuestion"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
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
            :state="categoryState"
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
            invalid-feedback="Score is required"
            :state="descriptionState"
          >
            <b-form-input
              id="questionScore-input"
              v-model="questionScore"
              :state="questionScoreState"
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
      <!-- edit quiz -->
      <b-modal
        id="modal-edit-quiz"
        ref="modal"
        title="Edit Quiz"
        size="xl"
        @ok="patchQuiz"
      >
        <p style="font-size: 13px">Empty fields will not change the quiz.</p>
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            ref="name"
            id="quizname"
            label="Quiz Name"
            label-for="name-input"
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
            ref="category"
            label="Category"
            label-for="category-input"
            invalid-feedback="Category is required"
            :state="categoryState"
          >
            <b-form-input
              id="category-input"
              v-model="category"
              :state="categoryState"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Description"
            label-for="description-input"
            invalid-feedback="Description is required"
            :state="descriptionState"
          >
            <b-form-input
              id="description-input"
              v-model="description"
              :state="descriptionState"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Image Link"
            type="URL"
            label-for="image-input"
            invalid-feedback="Image is required"
            :state="imageState"
          >
            <b-form-input
              id="image-input"
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
      <b-button size="m" variant="danger" v-b-modal.modal-clear-leaderboard>
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
        @ok="deleteAllScore"
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
          <template #cell(_id)="data">
            <b-button
              size="sm"
              variant="danger"
              v-on:click="deleteScore(data.value)"
              class="mr-2"
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
      descriptionState: null,
      nameState: null,
      imageState: null,
      categoryState: null,
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
    if (this.$session.get('user')) {
      console.log(this.$session.get('user'))
    } else {
      alert('Please login to get access')
      this.$router.push('/admin')
    }
  },
  mounted() {
    Api.get('/quizes')
      .then((response) => {
        console.log(response.data)
        response.data.forEach((element) => {
          this.quizes.push(element)
        })
        console.log(this.quizes)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    Api.get('/questions')
      .then((response) => {
        console.log(response.data)
        response.data.forEach((element) => {
          this.questions.push(element)
        })
        console.log(this.questions)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  },
  methods: {
    requestAllQuizes() {
      console.log('Requesting ALL quizes!')
      this.quizes = []
      Api.get('/quizes')
        .then((response) => {
          console.log('Now we are getting em!!')
          response.data.forEach((element) => {
            this.quizes.push(element)
          })
          console.log(this.quizes)
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
          console.log(this.scores)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    requestQuiz() {
      Api.get(`quizes/${this.quizes}`)
        .then((response) => {
          this.quizes = []
          console.log(response.data)
          response.data.forEach((element) => {
            this.quizes.push(element)
          })
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    requestQuestion(id) {
      console.log(id)
      this.selectedQuiz = id // remembers the quiz ID
      this.questions = []
      Api.get(`quizes/${id}/questions/`)
        .then((response) => {
          console.log(response.data.questions)
          response.data.questions.forEach((element) => {
            this.questions.push(element)
          })
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity() // boolean
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
      this.description = ''
      this.descriptionState = null
      this.image = ''
      this.imageState = null
      this.category = ''
      this.categoryState = null
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
      // Push the name to submitted names
      this.createQuiz()
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-create-quiz')
      })
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
      console.log(this.questionOptions)
      const optionList = this.questionOptions.split(/\s*(?:;|$)\s*/)
      console.log(optionList)
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
      console.log(id)
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
      console.log(id)
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
    }
  }
}
</script>
<style>
.buttons {
  margin: 15% auto auto auto;
}
.buttons button {
  margin: 10px;
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
