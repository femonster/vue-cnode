<template>
  <div id="mainBox">
    <m-header></m-header>
    <keep-alive>
        <transition :name="transName">
            <router-view :key="key"></router-view>
        </transition>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/base/m-header' 
export default {
  name: 'main',
  data(){
    return {
       transName:"",
       atab:["all","good","share","ask","job"]
    }
  },
  components:{
    MHeader
  },
  watch:{
    '$route' (to,from){
        if(to.name==="article"||from.name==="article"){
           this.transName = "fade";
        }else{
          let toIndex = this.atab.indexOf(to.name);
          let fromIndex = this.atab.indexOf(from.name);
          if(toIndex > fromIndex){
              this.transName = "slide-left";
          }else{
              this.transName = "slide-right";
          }
        }
        
    }
  },
  computed:{
      key(){
        return this.$route.name === 'article'? this.$route.name + +new Date(): this.$route.name
      }
  }
}
</script>
<style lang="scss">
.slide-left-active, .slide-left-leave-active,
.slide-right-active, .slide-right-leave-active {
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>


