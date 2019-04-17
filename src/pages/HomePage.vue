<template>
  <div style="background-color:#f8f7f7;">
    <layout-header pagename="管理中心" :myInfo="myInfo" :isLogin="isLogin" @getUserInfo="getUserInfo"></layout-header>
    <el-container style="minHeight:804px;margin:0 auto;">
      <el-aside width="200px" style="minHeight:814px;background-color:white;">
        <el-menu :default-active="emmm" class="el-menu-vertical-demo" style="border:none;" @open="handleOpen" @close="handleClose" router>
          <el-submenu index="/blControl">
            <template slot="title">
              <span>病理管理</span>
            </template>
            <el-menu-item index="/blControl?type=1">未完成</el-menu-item>
            <el-menu-item index="/blControl?type=2">已完成</el-menu-item>
            <el-menu-item index="/blControl?type=3">已取消</el-menu-item>
          </el-submenu>
          <el-menu-item index="/priceControl" v-if="!myInfo.hospitalId"> 
            <span slot="title">价格管理</span>
          </el-menu-item>
          <el-menu-item index="/qualityControl">
            <span slot="title">质控管理</span>
          </el-menu-item>
          <el-menu-item index="/doctorsControl">
            <span slot="title">医师管理</span>
          </el-menu-item>
          <el-menu-item index="/hospitalControl" v-if="!myInfo.hospitalId">
            <span slot="title">医院管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container style="background-color:white;margin-left:10px;margin-top:10px;">
        <el-main>
          <router-view keep-alive></router-view>
        </el-main>
      </el-container>
    </el-container>

    <div style="background-color:#374266;height:50px;width:100%;"></div>
  </div>
</template>
<script>
import axion from "@/util/http_url.js";
import "@/assets/css/default.css";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
  data() {
    return {
      activeIndex: "1",
      myInfo: {},
      isLogin: false,
      stupid: "/blControl?type=1",
      emmm:null,
    };
  },
  mounted() {
    this.emmm=this.$route.fullPath;
    this.getUserInfo();
  },
  components: {
    layoutHeader: () => import("@/components/header")
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getUserInfo() {
      var token = getCookie("token");
      if (token != null) {
        axion.getUserInfo({ token: getCookie("token") }).then(res => {
          if (res.data.data != null) {
            this.myInfo = res.data.data;
            this.isLogin = true;
          }
        });
      }
    },
    exit: function(event) {
      axion
        .userLogout({
          token: getCookie("token"),
          username: this.myInfo.loginName
        })
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
