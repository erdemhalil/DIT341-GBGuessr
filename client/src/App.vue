<template>
  <div id="app">
<div class="fixed">
  <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#"><router-link to="/">Home</router-link></b-nav-item>
        <b-nav-item href="#"><router-link to="/quiz">Quiz</router-link></b-nav-item>
        <b-nav-item href="#"><router-link to="/leaderboard">Leaderboard</router-link></b-nav-item>
        <b-nav-item href="#"><router-link to="/admin">Admin</router-link></b-nav-item>
        <b-nav-item  v-on:click="logout" href="#" v-if="logoutButton"><router-link to="/admin/protected">Log out</router-link></b-nav-item>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>
<script>

export default {
  name: 'quiz',
  data() {
    return {
    }
  },
  methods: {
    logout() {
      console.log('kjgfdhj')
      this.$session.remove('user')
      console.log(this.$session.get('user'))
      location.href = '/admin'
    }
  },
  computed: {
    logoutButton: function () {
      if (this.$session.get('user')) {
        console.log(this.$session.get('user'))
        return true
      }
      return false
    }
  }
}

</script>
<style>

* {
  transition: 100ms;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  min-width: 100%;
  background:linear-gradient(45deg, #369093, #b3b3b3);
  padding-left: 100px;
  position: sticky;
  z-index: 99;
  top: 0;
}

.nav-link a {
  color: #FFF;
  font-weight: 700;
  float: left;
}

.nav-link a:hover {
  text-decoration: none;
}

.nav-links {
  float: right;
}
</style>
