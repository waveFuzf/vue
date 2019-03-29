<template>
  <div>
    <el-col :span="10" :push="1" style="margin-top:20px;height:280px;">
      <span>我的名片</span>
      <span class="router">查看个人主页>></span>
      <div style="margin-top:20px;padding:20px;border: 1px solid rgba(47,58,92,.1);height:150px;">
        <span style="font-size: 24px; color: rgb(27, 34, 59); font-weight: bold;">{{myInfo.name}}</span><br><br>
        <span>{{myInfo.position}}</span>
        <span>{{myInfo.department}}</span><br><br>
        <span>{{myInfo.hosipitalName}}</span>
        <span>擅长：{{myInfo.description?myInfo.description:"暂无擅长"}}</span>
        <el-rate v-if="myInfo.userScore" v-model="myInfo.userScore" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
      </div>
    </el-col>
    <el-col :span="10" :push="2" style="margin-top:20px;height:280px;">
      <span>会诊统计</span>
      <router-link :to="'blConsult'"><span class="router">查看会诊主页>></span></router-link>
      <div style="margin-top:20px;padding:20px;border: 1px solid rgba(47,58,92,.1);height:150px;text-align:center;">
        <div style="width:40%;float:left;border-right:1px solid rgba(47,58,92,.1);margin-left:10%;margin-top:40px;">
          <span style="color:#ff9948;font-size:40px;">{{undone}}</span><br>
          <span style="color: rgb(27, 34, 59);font-size:16px;">会诊中</span>
        </div>
        <div style="width:40%;float:left;margin-top:40px;">
          <span style="color:#ff9948;font-size:40px;">{{done}}</span><br>
          <span style="color: rgb(27, 34, 59);font-size:16px;">已结束</span>
        </div>

      </div>
    </el-col>
  </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
  data() {
    return {
      done:0,
      undone:0,
    };
  },
  components: {
    // meetInfo: () => import("@/components/meetInfo")
  },
  props: ["myInfo"],
  mounted() {
    this.consultsInfo();
  },
  watch:{
    myInfo:function(val){
      this.consultsInfo();
    }

  },
  methods: {
    consultsInfo(){
      if(this.myInfo.userId){
        axion.getConsultsInfo({doctorType:1,token:getCookie("token"),userId:this.myInfo.userId}).then(res=>{
        if(res.data.data){
          this.done=res.data.data.done;
          this.undone=res.data.data.undone;
        }
      })
      }
      
    }
    // handleClick(tab) {
    //   if (tab._props.name == "first") {
    //     this.getMeetingByStatus(0);
    //   } else if (tab._props.name == "second") {
    //     this.getMeetingByStatus(null);
    //   }
    // },
    // getMeetingByStatus(val) {
    //   axion
    //     .getMeetingByStatus({ token: getCookie("token"), status: val })
    //     .then(res => {
    //       this.unDone = res.data.data;
    //       console.log(this.unDone);
    //     });
    // }
  }
};
</script>

<style scoped>
.router {
  margin-right:10px;
  float:right;
  color:#2f7ce1!important;
  cursor:pointer;
  font-size:14px;
}
</style>

