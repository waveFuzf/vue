<template>
    <div style="background-color:#f8f7f7;">
        <layout-header pagename="个人中心" :myInfo="myInfo" :isLogin="isLogin" @getUserInfo="getUserInfo"></layout-header>
        <el-row>
            <el-col :span="15" :push="2" style="margin-top:50px;font-size:14px;padding-left:20px;">
                首页 > 我的会诊列表 > 申请会诊
            </el-col>
        </el-row>

        <el-row :gutter="40" style="width:80%;margin:20px auto;">
            <el-col :span="18" style="border:1px solid #cec5c5;height:470px;background-color:white;">
                <div style="margin-top:20px;;width:95%;border-bottom:1px solid #cec5c5;height:40px;font-size:20px;">
                    <span>线上支付</span>
                    <span style="color:#425b77;font-size:12px;float:right;">送检医生：<span style="color:#1296db;">{{myInfo.name}}</span></span>
                </div>
                <div style="margin-top:20px;;width:100%;height:110px;">
                    <div style="font-size:14px;color:#425b77;float:left;">会诊安排:</div>
                    <div style="float:left;margin-left:20px;border-bottom:1px solid #cec5c5;width:85%;height:110px;">
                        <img style="float:left;" width="15%;" src="../assets/img/default.jpg">
                        <div style="float:left;font-size:14px;margin-left:20px;">
                            <br><span style="color:#1296db;">{{doctorInfo.doctorPosition}}</span><br><br>
                            <span>{{doctorInfo.hospitalName}}</span>
                        </div>
                        <div style="float:right;margin-right:20px;margin-top:30px;">
                            <span style="color:#ff9948;font-size:16px;">￥{{(fee/100).toFixed(2)}}</span>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top:20px;;width:80%;height:50px;">
                    <div style="float:right;font-size:16px;margin-right:20px;">费用总计：<span style="color:#ff9948;font-size:16px;">￥{{(fee/100).toFixed(2)}}</span></div>
                </div>

                <div style="width:95%;height:110px;border-bottom:1px solid #cec5c5;">
                    <div style="font-size:14px;color:#425b77;float:left;">支付方式:</div>
                    <div style="float:left;margin-left:20px;width:85%;">
                        <img :class="{chosed:payType==1}" width="20%" src="../assets/img/pay_zhifubao.png" @click="payType=1">
                        <img :class="{chosed:payType==2}" width="20%" src="../assets/img/pay_xianxia.png" @click="payType=2">
                    </div>
                    
                </div>

                <el-button style="margin-top:20px;" @click="confirmPay">确认支付</el-button>
                


            </el-col>
            <el-col :span="6" :push="1" style="background-color:white;border:1px solid #e6e6e6;padding:30px;color:#415b77;font-size:20px">

             会诊流程
             <el-steps direction="vertical" :active="1" space="50px" style="margin-top:10px;">
                <el-step title="填写会诊申请单"></el-step>
                <el-step title="线上支付会诊费用"></el-step>
                <el-step title="专家阅片并编辑诊断意见"></el-step>
                <el-step title="打印报告"></el-step>
            </el-steps>
        </el-col>
        </el-row>
        <div style="background-color:#374266;height:50px;margin-top:20px;width:100%;"></div>
    </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";

export default {
    data(){
        return {
            consultId:'',
            myInfo: {},
            pagename: "个人中心",
            isLogin:false,
            doctorInfo:"",
            consultDetail:'',
            payType:1,
            bcjc:0,
            fee:"",
            caseTypeId:"",
        }
    },
    components: {
    layoutHeader: () => import("@/components/header"),
    },
    mounted() {
        this.consultId=this.$route.query.consultId;
        this.caseTypeId=this.$route.query.caseTypeId;
        this.bcjc=this.caseTypeId=='304'?1:0;
        this.getConsultByConsultId()
        this.getUserInfo();
    },
    methods:{
        confirmPay(){
            axion.getPayUrl({consult_id:this.consultId,payType:this.payType,bcjc:this.bcjc,token:getCookie("token")}).then(res=>{
                if(res.data.code=="SUCCESS"){
                    this.$router.push("/blConsultInfo?consult_id="+this.consultId+"&doctorType=0");
                }
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
        
        getConsultByConsultId(){
            axion.getConsultByConsultId({consultId:this.consultId,token:getCookie("token")}).then(res=>{
                this.doctorInfo=res.data.data.doctors[1];
                this.consultDetail=res.data.data;

                if(this.caseTypeId!='304'){
                    this.fee=this.consultDetail.price;
                }else {
                    this.fee=this.consultDetail.supplementPrice;
                }
            });
        },
    }
}
</script>

<style>
.chosed {
    border: 1px solid #1d68ca;
}
</style>


