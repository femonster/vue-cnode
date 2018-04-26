<template>
  <div id="app">
    <m-header></m-header>
    <keep-alive>
      <router-view :key="key"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/base/m-header' 
export default {
  name: 'App',
  components:{
    MHeader
  },
  computed:{
      key(){
        return this.$route.name === 'article'? this.$route.name + +new Date(): this.$route.name
      }
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
