<template>
  <div class="list-wrapper" ref="wrapper">
    <ul class="list-ul">
        <li class="z-depth-1" v-for="(item,index) in data" :key="index" :data-aid="item.id">
            <div class="title-box">
              <div class="title-img">
                <div class="img-wrap" :style="{backgroundImage:`url(${item.author.avatar_url})`}"></div>
                <p>{{item.author.loginname}}</p>
              </div>
              <div class="title-content">
                  <h5>{{item.title}}</h5>
                  <span>{{item.create_at}}</span>
              </div>
            </div>
            <div class="article" v-html="item.content"></div>
            <div class="card-footer">
                <span class="count">浏览：{{item.visit_count}}</span>
                <span class="count">回复：{{item.reply_count}}</span>
                <div class="label-icon">
                    <span class="label top" v-show="item.good">精华</span>
                    <span class="label top" v-show="item.top">置顶</span>
                    <span class="label" v-show="(!!item.tab)&&(item.tab!='精华')">{{item.tab}}</span>
                </div>
            </div>
        </li>
    </ul>
    <div class="pullup-wrapper" v-if="pullUpLoad">
        <div class="before-trigger" v-if="!isPullUpLoad">
            <span>暂无更多</span>
        </div>
        <div class="after-trigger" v-else>
            <loading></loading>
        </div>
    </div>
    <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
          <div v-else><span>刷新成功</span></div>
        </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import Bubble from 'components/base/bubble';
  import Loading from 'components/base/loading';
  import {getList,getArticle} from 'api/api';
  import {changeData} from 'common/js/util';
  export default {
    data(){
      return{
        beforePullDown: true,
        isPullingDown: false,
        isPullUpLoad: false,
        bubbleY: 0,
        pullDownStyle: '',
        page:1,
        limit:20
      }
    },
    props:{
      probeType:{
          type:Number,
          defalut:1
      },
      tab:{
        type:String,
        default:"all"
      },
      pullUpLoad: {
          type: null,
          default: false
      },
      pullDownRefresh: {
        type: null,
        default: false
      },
      pullUpLoad: {
        type: null,
        default: false
      },
      click:{
          type:Boolean,
          default:true
      },
      listenScroll:{
          type:Boolean,
          default:false
      },
      data:{
          type:Array,
          default:null
      }
    },
    mounted(){
      setTimeout(()=>{
        this._initScroll();
      },20)
    },
    methods:{
      //获取数据
      _getAllList(){
        getList(this.page,this.limit).then((res)=>{
            if(res.success){
                this.data = changeData(res.data);
                this.page++;
            }
        })
      },
      // refresh scroll
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      // init scroll
      _initScroll(){
        if(!this.$refs.wrapper) return;
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            click:this.click,
            scrollbar:{
              fade:true
            },
            pullDownRefresh: {
              threshold: 50,
              stop: 20
            },
            pullUpLoad:{
              threshold: -50
            }
        })

        this._initPullUpLoad();
        // this.scroll.on('pullingDown',()=>{
        //     console.log("下拉刷新");
        //     setTimeout(()=>{
        //         this.scroll.finishPullDown(); 
        //     },1000);
            
        // });
        
      },
      // 下拉加载
      _initPullUpLoad(){
          this.scroll.on('pullingUp',()=>{
              console.log('下拉加载~~~');
              this.isPullUpLoad = true;
              this.$emit('pullingUp');
          })
      }
    },
    components:{
      Loading,
      Bubble
    }
  }
</script>
<style lang="scss" scoped>
.list-wrapper {
    width: 100%;
    margin-top: 13vh;
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
            box-sizing: border-box;
            background-color: #fff;
            padding: 10px 15px;
            overflow: hidden;
            .title-box{
              font-size: 0;
              width: 100%;
              height: 9vh;
              border-bottom:1px solid #eee;
              div{
                vertical-align: top;
                display: inline-block;
                height:100%;
                box-sizing: border-box;
              }
              .title-img{
                  font-size: 13px;
                  width: 25%;
                  text-align: left;
                  .img-wrap{
                    background-color: #333;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    width: 10vw;
                    height: 10vw;
                    border-radius: 50%;
                    display: inline-block;
                  }
                  p{
                    text-align: left;
                    line-height: 1.5;
                    padding: 0;
                    margin: 0;
                    display: block;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                  }
              }
              .title-content{
                  font-size: 13px;
                  width: 75%;
                  padding-left: 5px;
                  position: relative;
                  h5{
                    padding: 10px 0;
                    margin: 0;
                    font-size: 13px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    text-align: right;
                  }
                  span{
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                  }
              } 
            }
            .article{
              font-size: 13px;
              color: #333;
              line-height: 2;
              overflow: hidden;
              min-height: 18vh;
              text-indent: 2em;
              padding: 5px;
              word-wrap: break-word;
            }
            .card-footer{
              margin-top: 2vh;
              height: 3vh;
              font-size: 12px;
              .count{
                display: inline-block;
                height: 100%;
                vertical-align: top;
                line-height: 1.9;
                margin-right: 5px;
              }
              .label-icon{
                float: right;
                .label{
                  display: inline-block;
                  font-size: 12px;
                  color:#999;
                  padding: 2px 4px;
                  border-radius: 3px;
                  background-color: #e5e5e5;
                }
                .top{
                  background-color:#80bd01;
                  color: #fff; 
                }
              }
              
            }
        }
    }
    .pulldown-wrapper{
      position: absolute;
      width: 100%;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all;
      .after-trigger{
        margin-top: 10px;
      }
    }
    .pullup-wrapper{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 0;
    }
}
</style>