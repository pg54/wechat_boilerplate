<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <Markdown></Markdown> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Markdown from './components/Markdown.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Markdown
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
