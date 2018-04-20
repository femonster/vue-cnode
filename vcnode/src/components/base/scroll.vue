<template>
  <div class="list-wrapper" ref="wrapper">
    <solt name="scroll"></solt>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  export default {
    props:{},
    mounted(){
      setTimeout(()=>{
        this._initScroll()
      },20)
    },
    methods:{
      _initScroll(){
        if(!this.$refs.wrapper) return;
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            click:this.click,
            scrollbar:{
              fade:true
            }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.list-wrapper {
    width: 100%;
    margin-top: 12vh;
    height: 88vh;
    box-sizing: border-box;
    overflow: hidden;
    .list-ul {
        width: 100%;
        list-style: none;
        margin: 0;
        padding: 0;
        li {
            width: 94%;
            margin: 1.5vh auto 0;
            min-height: 30vh;
            box-sizing: border-box;
            background-color: #fff;
        }
    }
}
</style>