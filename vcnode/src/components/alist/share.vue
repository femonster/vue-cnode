<template>
  <div class="list-type share-list">
      <scroll 
      ref="scroll"
      @pullingDown="onPullingDown"
      @pullingUp="onPullingUp"
      :data="shareList"
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
        shareList:[]
      }
    },
    created(){
       this._getShareList();
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
      _getShareList(){
        getList(1,20,"share").then((res)=>{
            if(res.success){
                this.shareList = changeData(res.data);
            }
        })
      }
    }

  }
</script>
<style lang="scss" scoped>
  
</style>


