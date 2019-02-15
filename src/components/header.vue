<template>
<div>
  <header class="header" style="height:50px">
    <div style="margin-left:200px;margin-top:30px;height:100%;">
      <img class="floatLeft" src="../assets/img/icon-font.png" style="height:50px;">
      <!-- <div class="title">{{pagename}}</div> -->
      <div v-if="isLogin" class="login-yes floatRight" style="margin-right:100px;width:200px;">
        <img class="floatLeft" v-if="myInfo.photo!=null" :src="myInfo.photo" alt="头像">
        <img class="floatLeft" v-else src="../assets/img/default.jpg" alt="头像">
        <div style="font-size: 12px;margin-top:20px;float:left;color:#333;">
          {{myInfo.name}}
        </div>
        <el-button type="primary" size="mini" v-on:click="exit" style="margin-left:20px;margin-top:15px;">退出</el-button>
      </div>
      <div v-else class="login-no floatRight" style="margin-right:100px;width:200px;">
          <img class="floatLeft" src="../assets/img/default.jpg" alt="头像">
          <div style="font-size: 12px;margin-top:20px;float:left;color:#333;">
          &nbsp;<a @click="showLoginOrSign(true)">登录</a>&nbsp;|&nbsp;<a @click="showLoginOrSign(false)">注册</a>&nbsp;
          </div>
      </div>
    </div>
  </header>
  <el-dialog :visible.sync="goLogin" width="30%">
  <dialog-login ref="dialogLogin" v-if="goLogin" :type='type' @closeDialog="closeDialog"></dialog-login>
  </el-dialog>  
</div>
</template>

<script>
import "@/assets/css/default.css";
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
  components: {
    dialogLogin: () => import("@/components/loginPage")
  },

  props: ["pagename", "myInfo","isLogin"],
  data() {
    return {
        type:true,
        goLogin:false,
    };
  },
  mounted() {},
//   watch: {
//       goLogin : function(){
//           this.goLogin=this.checkLogin;
//       }
//   },
  methods: {
      showLoginOrSign(val){
          this.goLogin=true;
          this.type=val;
      },
      exit: function(event) {
      axion
        .userLogout({ token: getCookie("token"), username: this.myInfo.loginName })
        .then(d => {
          if (d.status == 200) {
            this.$message.success("退出成功!");
            this.$router.push("/");
          }
        });
    },
     closeDialog(){
         this.goLogin=false;
         this.$emit('getUserInfo')
    },
  }
};
</script>

<style scoped>
.title {
  color: #1296db;
  margin-left: 20px;
  font-size: 20px;
  height: 100%;
  line-height: 65px;
  float: left;
}
.login-no a{
    cursor: pointer;
}
</style>

