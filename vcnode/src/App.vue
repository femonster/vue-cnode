<template>
  <div id="app">
    <keep-alive>
        <transition>
            <router-view></router-view>
        </transition>
    </keep-alive>
    <m-footer></m-footer>
  </div>
</template>

<script> 
import MFooter from 'components/base/m-footer' 
export default {
  name: 'App',
  components:{
    MFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>
