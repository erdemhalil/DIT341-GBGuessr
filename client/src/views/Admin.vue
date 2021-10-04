<template>
  <div class="passwordDescription">
    <p>
      <br />
      Welcome to the secret page!
      <br />
      Please enter the very secret password.
    </p>
    <input type="password" id="inputPass" />
    <button id= "submitButton" v-on:click="submitPassword()">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    submitPassword() {
      const inputValue = document.getElementById('inputPass').value
      console.log(inputValue)
      if (inputValue === 'bruh') {
        console.log('very nice')
      } else {
        console.log('frick')
      }
    }
  }
}
</script>
<style>
.passwordDescription {
  text-align: left;
  margin: auto auto auto 50%;
}
</style>
