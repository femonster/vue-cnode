<template>
  <div class="list-type all-list">
      <scroll 
      ref="scroll"
      :data="allList"
      :stab="stab"
      @concatData="concatData"
      >
      </scroll>
  </div>
</template>
<script>
  import Scroll from 'components/base/scroll';
  import {getList,getArticle} from 'api/api';
  import {changeData,ease} from 'common/js/util';
  export default {
    data(){
      return {
        allList:[],
        stab:"share",
        limit:20
      }
    },
    created(){
      // 初始化数据
       this._getAllList();
    },
    components:{
      Scroll
    },
    methods:{
      concatData:function(adata){
        this.allList = adata;
      },
      // // 获取数据
      _getAllList(up){
        getList(1,this.limit,this.stab).then((res)=>{
            if(res.success){
                  this.allList = changeData(res.data);                
            }
        })
      }
    }

  }
</script>
<style lang="scss" scoped>
  .list-type{
      margin-top: 13vh;
  }
</style>


