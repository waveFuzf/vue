<template>
  <div style="background-color:#f8f7f7;">
    <layout-header pagename="管理中心" :myInfo="myInfo" :isLogin="isLogin" @getUserInfo="getUserInfo"></layout-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>

    <div style="background-color:#374266;height:50pxs;width:100%;"></div>
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
      isLogin: false
    };
  },
  mounted() {
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
