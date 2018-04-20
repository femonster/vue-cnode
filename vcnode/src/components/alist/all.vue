<template>
  <div class="list-type all-list">
      <scroll 
      ref="scroll"
      @pullingDown="onPullingDown"
      @pullingUp="onPullingUp"
      :data="allList"
      >
        <ul class="list-ul">
          <li class="z-depth-1" v-for="(item,index) in allList" :key="index">
            {{item.id}}
          </li>
        </ul>
      </scroll>
  </div>
</template>
<script>
  import Scroll from 'components/base/scroll';
  import {getList,getArticle} from 'api/api';
  export default {
    data(){
      return {
        allList:[]
      }
    },
    created(){
       this._getAllList()
    },
    components:{
      Scroll
    },
    methods:{
      onPullingDown(){
         console.log('触底加载');
      },
      onPullingUp(){
        console.log('下拉加载');
      },
      _getAllList(){
        getList(1,20).then((res)=>{
            
            if(res.success){
                this.allList = res.data;
            }
        })
      }
    }

  }
</script>
<style lang="scss" scoped>

</style>


