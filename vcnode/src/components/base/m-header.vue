<template>
  <div class="m-header z-depth-1">
      <img src="https://cnodejs.org/public/images/cnodejs_light.svg" alt="logo">
      <ul class="all-list">
          <li><router-link :to="'/main/all'">全部</router-link></li>
          <li><router-link :to="'/main/good'">精华</router-link></li>
          <li><router-link :to="'/main/share'">分享</router-link></li>
          <li><router-link :to="'/main/ask'">问答</router-link></li>
          <li><router-link :to="'/main/job'">招聘</router-link></li>
      </ul>
  </div>
</template>
<script>
export default {
  name:"m-header",
  
}
</script>
<style lang="scss">
.m-header{
    width:100%;
    background-color: #444;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    a{
        text-decoration: none;
    }
    img{
        width: 35%;
        margin-top: 0.7vh;
        margin-bottom: 0.7vh;
    }
    .all-list{
        width: 100%;
        font-size: 0;
        margin:0;
        padding: 0;
        border-top:1px solid #e1e1e1;
        li{
            width: 20%;
            height: 6.2vh;
            list-style: none;
            font-size: 14px;
            display: inline-block;
            color:#fff;
            line-height: 6.2vh;
            box-sizing: border-box;
            a{
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                color: #ffffff;
            }
            a.router-link-active{
                border-bottom:5px solid #80bd01;    
            }
        }
    }
}
</style>

