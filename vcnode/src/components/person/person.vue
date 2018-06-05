<template>
    <div class="me-div">
        <div class="me-title">

        </div>
        <div class="me-things">

        </div>
    </div>
</template>
<style lang="scss" scoped>
    .me-div{
        width: 100%;
        .me-title{
            height: 35vh;
            width: 100%;
            background-color: red;
        }
    }
</style>
<script>
import { getCookie } from "common/js/util";
import { getMeInfo } from 'api/api';
export default {
    name:"me",
    data(){
        return {
            myInfo:{}
        }
    },
    created(){
        this.token = getCookie().accessToken;
        this.loginname = getCookie().loginname;
        if(this.token && this.loginname){
            this.getInfo(this.loginname);
        }else{
            this.$router.push('/main/all');
        }
    },
    methods:{
        getInfo(loginname){
            getMeInfo(loginname).then((res)=>{
                console.log(res);
            })
        }
    }
}
</script>


