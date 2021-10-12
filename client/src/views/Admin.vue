<template>
  <div class="passwordDescription">
    <b-form @submit="onSubmit">
      <b-form-group>
        <b-form-input
          list="my-list-id"
          id="passwordInput"
          type="password"
          placeholder="Type in the secret password..."
          v-model="form.password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  name: 'admin',
  data() {
    return {
      message: 'none',
      form: {
        password: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      console.log(JSON.stringify(this.form))
      console.log(this.$session.get('password'))
      this.$session.set('password', this.form.password)
      if (this.$session.get('password') === 'bruh') {
        this.$router.push('/admin/protected')
      }
    }
  }
}
</script>
<style>
.passwordDescription {
  text-align: center;
  margin: auto auto auto 25%;
}
</style>
