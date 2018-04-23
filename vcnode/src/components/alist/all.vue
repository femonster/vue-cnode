<template>
  <div class="list-type all-list">
      <scroll 
      ref="scroll"
      :data="allList"
      :tab="stab"
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
        allList:[],
        stab:"all"
      }
    },
    created(){
       this._getAllList();
    },
    components:{
      Scroll
    },
    methods:{
      onPullingDown(){
         console.log('触底加载');
      },
      _getAllList(){
        getList(1,20).then((res)=>{
            if(res.success){
                this.allList = changeData(res.data);
            }
        })
      }
    }

  }
</script>
<style lang="scss" scoped>
  
</style>


