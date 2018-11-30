<template>
  <el-container>

    <el-header>
      <img src="../assets/img/icon.png" style="width:auto;height:60px;float:left;">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1"><a @click="$router.push('user')">处理中心</a></el-menu-item>
        <el-submenu index="2">
          <template slot="title">会议申请审核</template>
          <el-menu-item index="2-1">未审核</el-menu-item>
          <el-menu-item index="2-2">已审核</el-menu-item>
          <el-menu-item index="2-3">审核统计</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">数据统计</el-menu-item>
      </el-menu>
      <div class="userInfo">你好,{{myInfo.realName}}!
      </div>
      <el-button type="primary" size="mini" v-on:click="exit">退出</el-button>
      <!-- <div class="line"></div> -->
    </el-header>
    <el-container>
      <el-aside width="180px">Aside</el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
  data() {
    return {
      activeIndex: "1",
      myInfo: {}
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      axion.getUserInfo({token:getCookie("token")}).then(res => {
        this.myInfo=res.data.data;
        console.log(this.myInfo);
      });
    },
    exit: function(event) {
      axion
        .userLogout({ token: getCookie("token"), username: "1777" })
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
<style>
.el-header {
  line-height: 60px;
  padding: 0;
}
.el-menu-demo {
  width: (418-96) px;
  margin: 0 20px;
  float: left;
}
.userInfo {
  font-size: 14px;
  float: left;
}
.el-button {
  margin: 0 50px;
}
.el-main {
  padding-top: 30px;
  padding-left: 50px;
}

</style>
