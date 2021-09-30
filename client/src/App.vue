<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/quiz">Quiz</router-link>
      <router-link to="/leaderboard">Leaderboard</router-link>
      <div class="nav-links">
          <router-link to="/" id="sign-up">SIGN UP</router-link>
          <router-link to="/">LOG IN</router-link>
      </div>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
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
  height: 50px;
  padding-left: 100px;
  position: sticky;
  z-index: 99;
  top: 0;
}

#nav a{
  padding: 15px 20px 20px 0px;
  color: #FFF;
  font-weight: 700;
  float: left;
}

#nav a:hover {
  text-decoration: none;
}

.nav-links {
  float: right;
}

</style>
