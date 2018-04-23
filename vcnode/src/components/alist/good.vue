<template>
  <div class="list-type good-list">
      <scroll 
      ref="scroll"
      @pullingDown="onPullingDown"
      @pullingUp="onPullingUp"
      :data="goodList"
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
        goodList:[]
      }
    },
    created(){
       this._getGoodList();
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
      _getGoodList(){
        getList(1,20,"good").then((res)=>{
            if(res.success){
                this.goodList = changeData(res.data);
            }
        })
      }
    }

  }
</script>
<style lang="scss" scoped>
  
</style>


