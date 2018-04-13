<template>
  <div class="m-header z-depth-1">
      <img src="https://cnodejs.org/public/images/cnodejs_light.svg" alt="logo">
      <ul class="all-list">
          <li class="active"><router-link :to="'all'">全部</router-link></li>
          <li><router-link :to="'good'">精华</router-link></li>
          <li><router-link :to="'share'">分享</router-link></li>
          <li><router-link :to="'ask'">问答</router-link></li>
          <li><router-link :to="'job'">招聘</router-link></li>
      </ul>
  </div>
</template>
<script>
export default {
  name:"m-header"
}
</script>
<style lang="scss">
.m-header{
    width:100%;
    background-color: #444;
    text-align: center;
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
            height: 5vh;
            list-style: none;
            font-size: 14px;
            display: inline-block;
            color:#fff;
            line-height: 2.5;
            box-sizing: border-box;
            a{
                color: #ffffff;
            }
        }
        li.active{
            border-bottom:5px solid #80bd01;
        }
    }
}
</style>

