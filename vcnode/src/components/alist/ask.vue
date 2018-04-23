<template>
  <div class="list-type ask-list">
      <scroll 
      ref="scroll"
      @pullingDown="onPullingDown"
      @pullingUp="onPullingUp"
      :data="askList"
      >
      </scroll>
  </div>
</template>
<script>
  import Scroll from 'components/base/scroll';
  import {getList,getArticle} from 'api/api';
  import {changeData} from 'common/js/util';
  export default {
    data(){
      return {
        askList:[]
      }
    },
    created(){
       this._getAskList();
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
      _getAskList(){
        getList(1,20,"ask").then((res)=>{
            if(res.success){
                this.askList = changeData(res.data);
            }
        })
      }
    }

  }
</script>
<style lang="scss" scoped>
  
</style>


