<template>
  <div class="a-box" v-cloak ref="wrapper">
      <!-- 为什么不复用scroll组件，因为本来只打算在首页用scroll，所以scroll组件写的比较死，以后会用solt改写，使其更灵活一些，复用性更大 -->
        <div class="for-scroll">
            <div class="a-content-box z-depth-1">
                <div class="article-box">
                    <h2><span v-show="aData.good||aData.top" class="label top">{{aData.top?"置顶":"精华"}}</span>{{aData.title}}</h2>
                    <ul class="desc">
                        <li>发布于 {{aData.create_at | format}}</li>
                        <li>作者 {{aData.author?(aData.author.loginname?aData.author.loginname:"佚名"):"佚名"}}</li>
                        <li>{{aData.visit_count}} 次浏览</li>
                        <li>来自 {{aData.tab | formatTab}}</li>
                    </ul>
                    <div class="a-section" v-html="aData.content"></div>
                </div>
                <div class="comment-box">
                    <div class="c-header">{{aData.reply_count}} 回复</div>
                    <div class="reply-box">
                        <div class="reply-item" v-for="(item,index) in aData.replies" :key="index" :data-rid="item.id">
                            <div class="reply-title">
                                <span class="r-t r-img" :style="{backgroundImage:`url(${item.author.avatar_url})`}"></span>
                                <span class="r-t r-name">{{item.author?(item.author.loginname?item.author.loginname:"佚名"):"佚名"}}</span>
                                <span class="r-t r-time">{{index+1}}楼 - {{item.create_at | format}}</span>
                            </div>
                            <div class="reply-content" v-html="item.content"></div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="c-footer">
                <p>author zgk</p>
            </footer>
        </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import {getArticle} from 'api/api' 
import {dateFormat} from 'common/js/util'
export default {
    data(){
        return{
            aData:[],
        }
    },
    mounted(){
        // 防止初始化时DOM没有全部渲染完
        this.$nextTick(()=>{
            setTimeout(()=>{
                this.initScroll();
            },20)
        })

    },
    created(){
        this.getData();
    },
    filters:{
        format(val){
            if(!val) return;
            let tmpd = new Date(val);
            return dateFormat(tmpd,"yyyy-MM-dd hh:mm")
        },
        formatTab(val){
                if(!val) return;
                val = val.toString();
                let oTab = {
                    "ask": "问答",
                    "share": "分享",
                    "job": "招聘",
                    "good": "精华"
                }
                return oTab[val];
        }
    },
    methods:{
        getData(){
            let aid = this.$route.params.id;
            getArticle(aid).then((res)=>{
                if(res.success){
                        this.aData = res.data;
                        console.log(this.aData);
                }
            })
        },
        initScroll(){
             if(!this.$refs.wrapper) return;
            let options = {
                probeType: 1,
                scrollbar: {fade:true},
                bounce: true,
                click:true
            }

            // 初始化scroll
            this.scroll = new BScroll(this.$refs.wrapper,options);
        }
    }
}

</script>

<style lang="scss">
    $lignt-color : #08c;
    .a-box{
        margin: 13vh auto 0;
        width: 96%;
        height: 87vh;
        border-bottom: 1px solid #e1e1e1;
        overflow: hidden;
        .for-scroll{
            margin-top: 1vh;
            margin-bottom: 2vh;
            
            width: 100%;
            .a-content-box{
                width: 100%;
                box-sizing: border-box;
                padding: 5px;
                background-color: #ffffff;
            }
            .article-box{
                border-bottom: 1px solid #eeeeee;
                h2{
                    margin: 0;
                    padding: 0;
                    font-size: 18px;
                    line-height: 1.5;
                    .label{
                        margin-right: 10px;
                        vertical-align: text-bottom;
                    }
                }
            
                .desc{
                    background-color: #eee;
                    font-size: 12px;
                    line-height: 1.5;
                    padding-left: 20px;
                    color: #333;
                    border-radius: 5px;
                }

                .a-section{
                    color: #333333;
                    line-height: 1.5;
                    p{
                        text-indent: 2em;
                    }
                    img{
                        display: block;
                        width: 90%;
                        margin: 0 auto;
                    }
                    a{
                        color: $lignt-color;
                    }
                    
                }
            }
            .comment-box{
                margin-top: 10px;
                .c-header{
                    padding: 10px;
                    background-color: #f6f6f6;
                    border-radius: 3px 3px 0 0;
                    color: #333333;
                }
                .reply-item{
                    border-top: 1px solid #f0f0f0;
                    padding: 10px 0;
                    .reply-title{
                        font-size: 12px;
                        .r-t{
                            display: inline-block;  
                        }
                        .r-img{
                            width: 30px;
                            height: 30px;
                            border-radius: 3px;
                            background-repeat: no-repeat;
                            background-position: center;
                            background-size: cover;
                        }
                        .r-time{
                            color: $lignt-color;
                        }
                    }
                    .reply-content{
                        font-size: 13px;
                        line-height: 1.4;
                        a{
                            color: $lignt-color;
                        }
                        img{
                            display: block;
                            width: 50%;
                            margin:0 auto;
                        }
                    }
                }
            }
            .c-footer{
                width: 100%;
                text-align: center;
                font-size: 12px;
                color: #999999;
            }
        }
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
</style>


