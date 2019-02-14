<template>
  <div id="app">
    <div class="hello">
      <h1>Am i getting rick rolled?</h1>
      <input v-model="shortUrl" placeholder="Your sketchy URL here...">
      <button type="button" name="button" @click="rickRollChecker" :disabled="request.ongoing">Check</button>
      <div v-if="request.done && !request.error">
        <h2 v-if="!rolled">NOT A RICK ROLL!</h2>
        <h2 v-if="rolled">You have been rolled my dude...</h2>
        <img v-if="rolled" alt="rolled logo" src="@/assets/rolled.png">
      </div>
      <h2 v-if="request.done && request.error">{{ request.error }}</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      shortUrl: '',
      rolled: false,
      request: {
        done: false,
        ongoing: false,
        error: null
      }
    }
  },
  methods: {
    rickRollChecker: async function () {
      this.request = {
        done: false,
        ongoing: true,
        error: null
      }
      try {
        let reply = await axios.post('/api', { url: this.shortUrl })
        this.rolled = reply.data.rolled
        this.request.error = reply.data.error
      } catch (error) {
        console.log(error)
        this.request.error = error.message
      }
      this.request.done = true
      this.request.ongoing = false
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input {
  width: 25%;
  height: 20px;
  border-radius: 3px;
  border: 1px solid #2c3e50;
  padding-left: 5px;
  padding-right: 5px;
}
button {
  margin-left: 10px;
}
</style>
