<template>
  <div class="list-wrapper" ref="wrapper">
    <div class="list-ul-div">
      <ul class="list-ul">
          <li class="z-depth-1" v-for="(item,index) in data" :key="index" :data-aid="item.id">
              <router-link :to="{name:'article',params:{id:item.id}}">
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
              </router-link>
          </li>
      </ul>
      <!-- 下拉刷新 -->
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
          <div class="before-trigger" v-if="beforePullDown">
            <span>下拉刷新</span>
          </div>
          <div class="after-trigger" v-else>
            <div v-if="isPullingDown" class="loading">
              <loading></loading>
            </div>
          </div>
      </div>
      <!-- 上滑加载 -->
      <div class="pullup-wrapper">
          <div class="before-trigger" v-if="isPullUpFinish">
              <span>暂无更多</span>
          </div>
          <div class="after-trigger" v-else>
              <loading></loading>
          </div>
      </div>
    </div>

  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import Loading from 'components/base/loading';
  import {getList,getArticle} from 'api/api';
  import {changeData} from 'common/js/util';
  export default {
    data(){
      return{
          odata:this.data,
          page:2,
          limit:20,
          pullDownStyle: '',
          bubbleY: 0,
          beforePullDown:true,
          isPullingDown: false,
          isPullUpFinish:false, 
      }
    },
    props:{
      stab:{
        type:String,
        default:""
      },
      probeType:{
          type:Number,
          defalut:1
      },
      scrollbar: {
        type: null,
        default: false
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      pullDownRefresh: {
        type: null,
        default: true
      },
      pullUpLoad: {
        type: null,
        default: true
      },
      data:{
          type:Array,
          default:null
      },
      bounce: {
        default: true
      }
    },
    mounted(){
        setTimeout(()=>{
          this.initScroll();
        },20)
    },
    created() {
      this.pullDownInitTop = -100
    },
    methods:{
      // refresh scroll
      refresh() {
        this.scroll && this.scroll.refresh();
        this.beforePullDown = true; 
      },
      _getAllList(up){
        getList(this.page,this.limit,this.stab).then((res)=>{
            if(res.success){
              if(up===1){
                  this.odata =this.data.concat(changeData(res.data));
                  this.scroll.finishPullUp();
                  if(res.data.length<this.limit){
                       this.isPullUpFinish = true;
                  }
              }else{
                  this.odata = changeData(res.data);
                  // 为了看loading更清楚一些  
                  setTimeout(()=>{
                    this.scroll.finishPullDown(); 
                    this.isPullingDown = false;   
                  },1000);
              }

              setTimeout(()=>{
                  this.$emit("concatData",this.odata);
                  this.page++;
                  this.refresh();
              },500);
              
            }
        })
      },
      // init scroll
      initScroll(){
        if(!this.$refs.wrapper) return;
        let options = {
            probeType: this.probeType,
            scrollbar: this.scrollbar,
            pullDownRefresh: this.pullDownRefresh,
            pullUpLoad: this.pullUpLoad,
            bounce: this.bounce,
            click:true
        }

        // 初始化scroll
        this.scroll = new BScroll(this.$refs.wrapper,options);

        if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }

        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
        
      },
      // 上滑加载
      _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
          if(!this.isPullUpFinish){
              this._getAllList(1);
          }
        })
      },
      // 下拉刷新
      _initPullDownRefresh() {
        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false;
          this.isPullingDown = true;
          this.page = 1;
          this._getAllList(2);
        })

        this.scroll.on('scroll', (pos) => {
          if (!this.pullDownRefresh) {
            return
          }
          if (this.beforePullDown) {
            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, -55)}px`
          }
        })
      }
    },
    components:{
      Loading,
      // Bubble
    }
  }
</script>
<style lang="scss" scoped>
.list-wrapper {
    width: 100%;
    height: 87vh;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
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
            a{
              display: block;
              text-decoration: none;
              color: #333333;
            }
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
      top: -1000px; //一开始不要显示
      position: absolute;
      width: 100%;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all;
      text-align: center;
      margin-top: 5px;
      .after-trigger{
        margin-top: 10px;
        width: 100%;
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