<template>
  <div class="list-type job-list">
      <scroll 
      ref="scroll"
      @pullingDown="onPullingDown"
      @pullingUp="onPullingUp"
      :data="jobList"
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
        jobList:[]
      }
    },
    created(){
       this._getJobList();
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
      _getJobList(){
        getList(1,20,"job").then((res)=>{
            if(res.success){
                this.jobList = changeData(res.data);
            }
        })
      }
    }

  }
</script>
<style lang="scss" scoped>
  
</style>


