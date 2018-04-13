<template>
  <div id="app">
    <m-header></m-header>
    <router-view/>
  </div>
</template>

<script>
import MHeader from 'components/m-header' 
export default {
  name: 'App',
  components:{
    MHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
