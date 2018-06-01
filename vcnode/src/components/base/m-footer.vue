<template>
<div class="m-bar">
    <div class="f-btn home-page"><router-link :to="'/all'">首页</router-link></div>
    <div class="f-btn person-page"><a href="javascript:;" @click="toMyMes">消息</a></div>
    <div class="f-btn info-page"><a href="javascript:;" @click="toMyHome">我的</a></div>
    <div class="login-modal" v-if="!islogin" v-show="ismodal">
        <div class="login-div animated" :class="{bounceInDown:ismodal}">
            <h4 v-text="titleText"></h4>   
            <input type="text" v-model.trim="tmpPwd" placeholder="accessToken"/>
            <button type="button" class="cancel-btn" @click="toLoginClose" :disabled="isloading">取消</button>
            <button type="button" class="login-btn" @click="toLogin" :disabled="isloading">登录</button>    
        </div>
    </div> 
</div>  
</template>
<script>
 import {setCookie,getCookie,delCookie } from "common/js/util";
 import {checkAccess} from 'api/api';
export default {
  data(){
      return {
          tmpPwd:"",
          accessToken:"",
          islogin:false,
          ismodal:false,
          isloading:false,
          titleText:"天王盖地虎！"
      }
  },
  created(){
        this.accessToken = getCookie().accessToken;
        if(this.accessToken){
           this.islogin = true;
        }
  },
  methods:{
      toLogin(){
        if(!this.tmpPwd){
            this.titleText="正晌午说话，谁还没有家？";
            return;
        }
        this.titleText = "正在验证暗号...";
        this.isloading = true;
        checkAccess(this.tmpPwd).then((res)=>{
            if(res.success){
                setCookie(this.accessToken,this.tmpPwd,window.location.host,30);
                this.titleText = "宝塔镇河妖！是自家兄弟！";
                this.islogin = true;
            }
        }).catch((e)=>{
            this.isloading = false;
            this.titleText="野鸡闷头钻，哪能上天王山？";
        })
      },
      toLoginClose(){
          this.ismodal = false;
      },
      toMyHome(){
        if(!this.islogin){
            setTimeout(()=>{
                this.ismodal = true;
            },300);
        }else{

        }
      },
      toMyMes(){
          if(!this.islogin){
            setTimeout(()=>{
                this.ismodal = true;
            },300);
        }else{
            
        }
      }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/common/scss/animate.scss';
.m-bar{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 6.5vh;
    width: 100%;
    background-color: #444;
    box-sizing: border-box;
    border-top: 1px solid #80bd01;
    font-size: 0;
    a{
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: #ffffff;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;

    }
    .my-person:active{
        color: #80bd01;
    }
    .f-btn{
        display: inline-block;
        width: 33.33333%;
        height: 100%;
        font-size: 14px;
        line-height: 6.5vh;
        text-align: center;
        color: #ffffff;
    }

    .login-modal{
        position: fixed;
        z-index: 1001;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        .login-div{
            position: absolute;
            width: 90%;
            height: 30vh;
            background: #ffffff;
            left: 5%;
            top: 32vh;  
            font-size: 14px; 
            border-radius: 5px;
            box-sizing: border-box;
            padding: 10px;
            h4{
                margin: 0;
                padding: 0;
                height: 5vh;
                line-height: 5vh;
                text-align: center;
                border-bottom: 2px solid #80bd01;
            }
            input{
                display: block;
                width: 80%;
                height: 5vh;
                margin:4vh auto;
                text-indent: 1em;
            }
            button{
                width: 40%;
                outline: none;
                border:none;
                height: 4vh;
            }
            .login-btn{
                background-color: #80bd01;
                color: #ffffff;
            }
            .cancel-btn{
                background-color: #ffffff;
                border:1px solid #80bd01;
                 margin-left: 10%;
            }
        }


    }
}
</style>

