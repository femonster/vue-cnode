<template>
<div class="m-bar">
    <div class="f-btn home-page"><a href="javascript:;" @click="toMyHome" class="my-person">我的</a></div>
    <div class="f-btn person-page">编辑</div>
    <div class="f-btn info-page">消息</div>
    <div class="login-modal" v-show="modal">
        <h4>亲，请先登录</h4>   
        <label for="act">accessToken:</label> 
        <input type="text" v-model="tmpPwd"/>
        <button type="button" @click="toLogin">登录</button>
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
          modal:false
      }
  },
  created(){
        this.accessToken = getCookie().accessToken;
  },
  methods:{
      checkLogin(){
          if(!this.accessToken){
              this.modal = true;
          }
      },
      toLogin(){

      },
      toMyHome(){
          
      }
  }
}
</script>
<style lang="scss" scoped>
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
}
</style>

