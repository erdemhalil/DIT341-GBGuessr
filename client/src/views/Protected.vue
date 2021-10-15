<template>
  <div>
    <p>
      <b>Welcome to the Admin page!</b>
    </p>
    <div class="buttons">
      <b-button size="lg" v-b-modal.modal-create-quiz>Create Quiz</b-button>
      <b-button size="lg" v-b-modal.modal-list-quizes>Manage Quizes</b-button>
      <b-button size="lg" v-b-modal.modal-manage-score>Manage Scores</b-button>
    </div>

    <!-- CREATE QUIZ -->
    <b-modal
      id="modal-create-quiz"
      ref="modal"
      title="Create Quiz"
      size="xl"
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
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
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
          <template #cell(_id)="data">
            <b-button
              size="sm"
              variant="danger"
              v-on:click="deleteQuiz(data.value)"
              class="mr-2 responsive-button"
            >
              Delete
            </b-button>
            <b-button size="sm" class="responsive-button" v-b-modal.modal-modify-quiz>Modify</b-button>
          </template>
        </b-table>
      </div>
      <b-modal
        id="modal-modify-quiz"
        ref="modal"
        title="Modify Quiz"
        size="lg"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <datalist id="questions-list">
          <option v-for="question in questions" :key="question._id">
            {{ question.name }}
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
            <template #cell(_id)="data">
              <b-button
                size="sm"
                variant="danger"
                v-on:click="deleteQuiz(data.value)"
                class="mr-2"
              >
                Delete
              </b-button>
              <b-button size="sm" v-b-modal.modal-modify-quiz v-on:click="requestQuestion(data_value)">Modify</b-button>
            </template>
          </b-table>
        </div>
      </b-modal>
    </b-modal>
    <!-- MANAGE SCORE -->
    <b-modal
      id="modal-manage-score"
      ref="modal"
      title="Manage Score"
      size="xl"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form-input
        list="scores-list"
        v-on:change="(e) => requestScore(e)"
      ></b-form-input>
      <b-button size="m" class="mr-2 responsive-button leaderboard-button"> Clear Leaderboard (W.I.P.) </b-button>
      <datalist id="scores-list">
        <option v-for="quiz in quizes" :key="quiz._id">{{ quiz.name }}</option>
      </datalist>
      <div>
        <b-table ref="table" striped hover :items="scores" :fields="fields">
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
          labe: 'Score',
          sortable: true
        }
      ],
      name: '',
      nameState: null,
      description: '',
      submittedDescriptions: [],
      image: '',
      imageState: null,
      category: '',
      categoryState: null,
      chosenQuiz: ''
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
          this.quizes = [] // resets the score
          response.data.forEach((element) => {
            this.quizes.push(element)
          })
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    requestQuestion(e) {
      console.log(e)
      Api.get(`quizes/${e}/${this.questions}`)
        .then((response) => {
          this.questions = []
          response.data.forEach((element) => {
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
      fetch('http://localhost:3000/api/quizes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          description: this.description,
          image: this.image,
          category: this.category
        })
      })
    },
    deleteScore(e) {
      console.log(e)
      Api.delete(`/scores/${e}`).catch((error) => {
        console.error('Error:', error)
      })
      this.$refs.table.refresh()
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

.modal-content label {
  font-size: 17px!important;
}

@media screen and (max-width: 600px) {
.modal-content {
  font-size: 7px;
}

.responsive-button {
  padding: 0px!important;
  font-size: 7px;
}

.leaderboard-button {
  margin: 5px;
}
}

</style>
