<template>
    <div style="background-color:#f8f7f7;height:800px;"> 
        <layout-header pagename="个人中心" :myInfo="myInfo" :isLogin="isLogin" @getUserInfo="getUserInfo"></layout-header>
        <el-row>
        <el-col :span="15" :push="2" style="margin-top:50px;font-size:14px;padding-left:20px;">
            个人中心 > <span>{{title}}</span>
        </el-col>
        </el-row>
        <div>
            <el-col :span="5" :push="2" class="module" style="text-align:center;">
                <img style="width:40%;margin:20px 30%;" v-if="myInfo.photo!=null" :src="myInfo.photo" alt="头像">
                <img v-else style="width:40%;margin:20px 30%;" src="../assets/img/default.jpg" alt="头像">
                <span style="font-size:14px;color:#425b77;">你好！{{myInfo.name}}</span>
                <el-menu :default-active="emmm" class="el-menu-vertical-demo" @select="handleSelect" router>
                    <el-menu-item index="/userCenter">
                        <i class="iconfont icon-yuanchenghuizhen"></i>
                        <span slot="title">我的会诊</span>
                    </el-menu-item>
                    <el-menu-item index="/shenqing">
                        <i class="iconfont icon-jilu"></i>
                        <span slot="title">会诊案例</span>
                    </el-menu-item>
                    <el-menu-item index="/shezhi">
                        <i class="iconfont icon-shezhi"></i>
                        <span slot="title">我的设置</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="15" :push="3" class="module">
                <router-view keep-alive :myInfo="myInfo"></router-view>
            </el-col>
        </div>
    </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
import "@/assets/css/iconfont.css";
export default {
    data(){
        return {
            myInfo: {},
            pagename: "个人中心",
            isLogin:false,
            emmm:"/userCenter",
            title:"",
        }
    },
    components: {
    layoutHeader: () => import("@/components/header"),
    },
    mounted() {
        this.getUserInfo();
        this.emmm=this.$route.path;
        switch(this.emmm){
            case "/userCenter":this.title="我的会诊";break;
            case "/shenqing":this.title="会诊案例";break;
            case "/shezhi":this.title="我的设置";break;
            }
    },
    watch:{
        emmm:function(){
            switch(this.emmm){
            case "/userCenter":this.title="我的会诊";break;
            case "/shenqing":this.title="会诊案例";break;
            case "/shezhi":this.title="我的设置";break;
            }
        }
    },
    methods:{
        handleSelect(val) {
            this.emmm=val;
        },
        getUserInfo() {
            var token = getCookie("token");
            if (token != null) {
                axion.getUserInfo({ token: getCookie("token") }).then(res => {
                 if(res.data.data!=null){
                    this.myInfo = res.data.data;
                    this.isLogin=true;  
                }
                });
            }
         },
    }
}
</script>

<style scoped>
.module {
    margin-top:10px;
    background-color:white;
    border: 1px solid rgba(47,58,92,.1);
}
.el-menu-vertical-demo {
    margin-top: 30px;
    width: 90%;
    margin-left: 10%;
    margin-bottom: 20px;
}
</style>
