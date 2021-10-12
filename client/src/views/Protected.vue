<template>
  <div>
    <p>Hi! This is the page where you will be able to delete scores and whatnot</p>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  beforeMount() {
    console.log(this.$session.get('password'))
    if (this.$session.get('password') === 'bruh') {
      alert('Welcome to the secret admin page!')
    } else {
      alert('no access for you buddy')
      this.$router.push('/admin')
    }
  }
}
</script>
<style>
</style>
