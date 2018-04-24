<template>
  <div class="list-type all-list">
      <scroll 
      ref="scroll"
      :data="allList"
      :scrollbar="scrollbarObj"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      :startY="parseInt(startY)"
      @pullingDown="onPullingDown"
      @pullingUp="onPullingUp"
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
        stab:"all",
        page:1,
        limit:20,
        scrollbar: true,
        scrollbarFade: true,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多数据了',
        defaultRefreshTxt: '刷新成功',
        startY: 0,
        scrollToX: 0,
        scrollToY: -200,
        scrollToTime: 700,
        scrollToEasing: 'bounce',
        scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
      }
    },
    computed: {
      scrollbarObj: function () {
        return this.scrollbar ? {fade: this.scrollbarFade} : false
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop),
          txt:this.defaultRefreshTxt
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    created(){
       this._getAllList();
    },
    components:{
      Scroll
    },
    methods:{
      // 滚动到某个坐标
      scrollTo() {
        this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime, ease[this.scrollToEasing])
      },
      // 下拉刷新
      onPullingDown(){
        this.page=1;
        this._getAllList();
      },
      // 上滑加载
      onPullingUp(){
        this._getAllList(1);
      },
      // 获取数据
      _getAllList(up){
        getList(this.page,this.limit).then((res)=>{
            if(res.success){
              if(!!up){
                  this.allList =this.allList.concat(changeData(res.data));
              }else{
                  this.allList = changeData(res.data);                
              } 
              this.page++;
            }
        })
      }
    }

  }
</script>
<style lang="scss" scoped>
  
</style>


