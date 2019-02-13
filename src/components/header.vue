<template>
  <header class="header" style="height:50px">
    <div style="margin-left:200px;margin-top:30px;height:100%;">
      <img class="floatLeft" src="../assets/img/icon-font.png" style="height:50px;">
      <img class="floatLeft" src="../assets/img/icon.png">
      <div class="title">{{pagename}}</div>
      <div class="login-yes floatRight" style="margin-right:100px;width:200px;">
        <img class="floatLeft" v-if="myInfo.PhotoPath!=null" :src="myInfo.PhotoPath" alt="头像">
        <img class="floatLeft" v-else src="../assets/img/default.jpg" alt="头像">
        <div style="font-size: 14px;margin-top:20px;float:left;">
          {{myInfo.realName}}
        </div>
        <el-button type="primary" size="mini" v-on:click="exit" style="margin-left:20px;margin-top:15px;">退出</el-button>
      </div>
    </div>
  </header>
</template>

<script>
import "@/assets/css/default.css";
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
  props: ["pagename", "myInfo"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
      exit: function(event) {
      axion
        .userLogout({ token: getCookie("token"), username: this.myInfo.loginName })
        .then(d => {
          if (d.status == 200) {
            this.$message.success("退出成功!");
            this.$router.push("/");
          }
        });
    }
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
</style>

