<template>
  <div class="toolBar">
      <div class="circle z-depth-1 prev" v-show="prev"  @click="toPrev">←</div>
      <div class="circle z-depth-1 toTop" :class="{show:posy<-100}" @click="tellFather">
          ↑
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      prev:false
    }
  },
  mounted(){
    if(this.$route.name==="article"){
        this.prev=true;
    }
  },
  props:{
    posy:{
          type:Number,
          defalut:0
      }
  },
  methods:{
    tellFather(){
      this.$emit("toTop");
    },
    toPrev(){
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss" scoped>
.circle{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #80bd01;
  text-align: center;
  line-height: 40px;
  color: #ffffff;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bolder;
}
.toolBar{
  position: fixed;
  bottom: 15px;
  right: 15px;
  .toTop{
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .show{
    opacity: 1;
  }
}
</style>


