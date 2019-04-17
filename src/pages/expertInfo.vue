<template>
    <div style="background-color:#f8f7f7;"> 
        <layout-header pagename="" :myInfo="myInfo" :isLogin="isLogin" @getUserInfo="getUserInfo"></layout-header>
        <el-row>
        <el-col :span="15" :push="2" style="margin-top:50px;font-size:14px;padding-left:20px;">
            首页 > 全部专家 > <span style="color: #1296db;">{{doctorInfo.name}}</span> 
        </el-col>
        </el-row>
        <div style="margin-top:20px;">
            <div style="width:80%;height:250px;margin:0 auto;border:1px solid #cec5c5;background-color:white;">
                <div>
                    <div style="height:150px;width:180px;padding:20px;float:left;">
                        <img v-if="doctorInfo.photo!=null" :src="doctorInfo.photo" alt="头像">
                        <img v-else src="../assets/img/default.jpg" alt="头像">
                        <el-rate style="margin-left:40px;" v-if="doctorInfo.userScore" v-model="doctorInfo.userScore" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
                    </div>
                    <div style="margin-top:20px;color:#333;font-size:13px;float:left;height:210px;min-width:300px;">
                        <span style="font-size:20px;font-weight:bolder;">{{doctorInfo.name}}&nbsp;&nbsp;</span>
                        <span>{{doctorInfo.position}}</span><br><br>
                        <span>{{doctorInfo.hospitalName}}&nbsp;&nbsp;{{doctorInfo.department}}</span><br><br>
                        <span>擅长：{{doctorInfo.goodAt?doctorInfo.goodAt:"暂无信息"}}</span><br><br>
                        <span>简介：{{doctorInfo.description?doctorInfo.description:"暂无信息"}}</span>
                    </div>
                    <div style="float:right;margin-top:20px;padding:20px 40px;font-size:13px;color:#333;width:200px;border-left:1px solid #cec5c5;">
                        <el-button type="primary" v-on:click="dosth">申请会诊</el-button><br><br>
                        会诊费用：<br><br>
                        <div v-for="item in doctorInfo.prices" :key="item.index" v-if="item.priceTypeId!=304">
                            {{item.priceTypeName}}<span style="color:red;font-size:16px;margin-left:10px;">￥{{(item.price/100).toFixed(2)}}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="width:80%;margin:0 auto;margin-top:30px;font-weight:bolder;font-size:22px;">推荐病例
                <router-link :to="'blCase'"><button class="more color-blue" style="background:none;float:right;margin: 20px 30px 0px 0px;font-size:12px">更多>></button></router-link>
                <button class="more " @click="refreshCase()" style="background:none;float:right;font-size:12px;margin: 20px 20px 0px 0px;">换一换 <img style="width:11px;" src="../assets/img/refresh.png"></button></div>
            <div style="width:80%;height:250px;margin:20px auto;">
                
            </div>

            <div style="width:80%;height:250px;margin:0 auto;border:1px solid #cec5c5;background-color:white;">
                <div style="width:95%;margin:10px auto;font-size:20px;color:#111;">
                    评价(<span style="color:orange;">{{count}}</span>)
                </div>
                <div style="width:95%;margin:10px auto;border:0.5px solid #cec5c5;"></div>
                <div style="width:95%;margin:5px auto;color:#111;" v-for="item in evaluates" :key="item">
                    {{item}}
                </div>
            </div>

        </div>


        <div style="background-color:#374266;height:50px;margin-top:20px;width:100%;"></div>
    </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie,cache } from "@/util/cookie.js";

export default {
    components: {
    layoutHeader: () => import("@/components/header"),
    },
    data(){
        return {
            count:0,
            myInfo: {},
            doctorId:'',
            pagename: "个人中心",
            isLogin:false,
            doctorInfo:{},
            evaluates:[],
        }
    },
    mounted() {
        this.doctorId=this.$route.query.doctorId;
        this.getExpertInfoById();
        this.getUserInfo();
    },
    methods:{
        refreshCase(){

        },
        dosth(){

        },
        getExpertInfoById(){
            axion.getExpertInfoById({doctorId:this.doctorId}).then(res=>{
                this.doctorInfo=res.data.data;
            });
            axion.getEvaluateById({doctorId:this.doctorId}).then(res=>{
                this.evaluates=res.data.data;
            })
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
img { 
    width: 100%;
    height: auto;
    border-radius: 100px;
}
button {
    border: none;
    outline:none;
    cursor: pointer;
}
</style>


