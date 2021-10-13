<template>
  <div>
    <p>
      <b>Welcome to the Admin page!</b>
    </p>
    <b-button size="lg" v-b-modal.modal-create-quiz>Create Quiz</b-button>
    <b-button size="lg" v-b-modal.modal-manage-quiz>Manage Quizes</b-button>
    <b-button size="lg" v-b-modal.modal-manage-score>Manage Scores</b-button>

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
      id="modal-manage-quiz"
      ref="modal"
      title="Manage Quiz"
      size="xl"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
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
      <b-button size="m" @click="deleteScore()" class="mr-2">
        Clear Leaderboard
      </b-button>
      <datalist id="scores-list">
        <option v-for="quiz in quizes" :key="quiz._id">{{ quiz.name }}</option>
      </datalist>
      <div>
        <b-table striped hover :items="scores" :fields="fields">
          <template #cell(delete)>
            <b-button size="sm" variant="danger" @click="deleteScore()" class="mr-2">
              Delete
            </b-button>
          </template>
        </b-table>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'home',
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
        },
        {
          key: 'delete',
          label: 'Delete Score',
          sortable: false
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
    console.log(this.$session.get('password'))
    if (this.$session.get('password') === 'bruh') {
      console.log('Welcome to the secret admin page!')
    } else {
      alert('No access for you')
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
          data.forEach((element) => {
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
    requestQuiz(e) {
      const index = this.chosenQuiz.findIndex((item) => item.name === e)
      fetch(`http://localhost:3000/api/quizes/${this.quizes[index]._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          data.forEach((element) => {
            this.quizes.push(element)
          })
          console.log(this.quizes)
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
      const index = this.quizes.findIndex((item) => item.name === e)
      fetch(
        `http://localhost:3000/api/scores/quizes/${this.quizes[index]._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
  }
}
</script>
<style>
</style>
