<template>
  <div>
    <layout-header ref="showLoginOrSign" :pagename="''" :myInfo="myInfo" :isLogin="isLogin" @getUserInfo="getUserInfo"></layout-header>
    <div class="caseConsultation-procedure-div">
        <button id="tpsqhz" @click="ApplyOpenLesson()">立即<br>申请</button>
    </div>
    <div class="caseConsultation-process-system">我们提供以下的服务</div>
    <div class="caseConsultation-process-eng">What We Offer</div>
    <div style="width:100%;height:200px;">
        <div v-for="info in services" :key="info.index" class="floatLeft" style="width:20%;margin:2.5%;"> 
            <img class="floatLeft" :src="info.icon">
            <div class="floatLeft" style="width:60%;">
                <div style="color:#425b77;font-weight:bold;">{{info.title}}</div>
                <div style="margin-top:5%;font-size:12px;">{{info.introduce}}</div>
            </div>
        </div>
    </div>

    <div class="caseConsultation-process-system">最优秀的专家队伍</div>
    <div class="caseConsultation-process-eng">Experts</div>
    <div style="width:100%;height:250px;">
        <doctor-info v-for="item in doctorsInfo" :doctorInfo="item" :key="item.index"></doctor-info>
    </div>

    <div class="caseConsultation-process-system">会诊流程</div>
    <div class="caseConsultation-process-eng">Process</div>
    <div class="caseConsultation-process-img">
    </div>

    <div style="background-color:#374266;height:50px;margin-top:20px;width:100%;"></div>
    
    
  </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
import "@/assets/css/iconfont.css";
export default {
  components: {
    layoutHeader: () => import("@/components/header"),
    doctorInfo: () => import("@/components/doctorInfo"),
  },

  data() {
    return {
      myInfo: {},
      doctorsInfo:[],
      pagename: "个人中心",
      isLogin:false,
      progress:[{icon:require("../assets/img/icon-process1.png"),title:"收集患者病例资料"},
                {icon:require("../assets/img/icon-process2.png"),title:"提交申请并支付"},
                {icon:require("../assets/img/icon-process3.png"),title:"在线提交数字切片/寄送切片"},
                {icon:require("../assets/img/icon-process4.png"),title:"会诊专家阅片并且发报告"}
      ],
      services:[{icon:require("../assets/img/icon-process1.png"),title:"自由申请资格",introduce:"用户自行在平台注册，认证通过后即可向不同级别专家发起会诊申请"},
                {icon:require("../assets/img/icon-process2.png"),title:"快速入驻成专家",introduce:"名医个人：以个人身份提交申请， 审核通过后即可成为自由执业专家 名医团队：以团体身份提交申请， 审核通过后即可成为会诊专家团队"},
                {icon:require("../assets/img/icon-process3.png"),title:"免费数字化服务",introduce:"寄送切片会诊的用户，我们将返回给您高年资专家签名报告和免费数字化服务"},
                {icon:require("../assets/img/icon-process4.png"),title:"数字切片会诊",introduce:"与平台对接后快速扫描切片上传，专家移动会诊，支持术中冰冻会诊，最快1小时内出报告"}],
    };
  },
  mounted() {
    this.getUserInfo();
    this.getExpertsInfo();
  },
  methods: {
    getExpertsInfo(){
        axion.getExpertsInfo().then(res=>{
            this.doctorsInfo=res.data.data;
        })
    },  
    ApplyOpenLesson(){
        if(this.isLogin){
            this.$router.push("/blConsultType")
        }else{
            this.$refs.showLoginOrSign.showLoginOrSign(true);
        }
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
    }
  }
};
</script>
