<template>
  <div class="passwordDescription">
    <b-form @submit="fetchUsers" id="login-form">
      <b-form-group>
        <b-form-input
          id=""
          type="text"
          placeholder="Email"
          v-model="form.email"
        ></b-form-input>
        <b-form-input
          id="passwordInput"
          type="password"
          placeholder="Password"
          v-model="form.password"
        ></b-form-input>
      </b-form-group>
      <b-button type="button" v-on:click="fetchUsers()" variant="primary"
        >Submit</b-button
      >
    </b-form>
  </div>
</template>
<script>
import { Api } from '@/Api'
export default {
  name: 'admin',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  beforeMount() {
    if (this.$session.get('user')) {
      location.href = '/admin/protected'
    }
  },
  methods: {
    fetchUsers() {
      Api.get('/users/')
        .then((response) => {
          response.data.User.forEach((element) => {
            if (element.email === this.form.email) {
              if (element.password === this.form.password) {
                this.$session.set('user', element._id)
                location.href = '/admin/protected'
                return element
              }
            }
          })
          return false
        })
        .catch((error) => {
          this.message = error
        })
    }
  }
}
</script>
<style>
.passwordDescription {
  text-align: center;
}

#login-form {
  width: 400px;
  margin: 200px auto auto auto;
}

#login-form input {
  margin: 10px;
}
</style>
