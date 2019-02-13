<template>
  <div>
    <layout-header :pagename="pagename" :myInfo="myInfo"></layout-header>
    <main style="margin-left:200px;margin-top:50px;height:100%;">
      <el-col :span="4">
        <el-menu default-active="/userHomePage/huiyi" class="el-menu-vertical-demo" router>
          <el-menu-item index="/userHomePage/huiyi">
            <i class="iconfont icon-huiyi"></i>
            <span slot="title">我的会议</span>
          </el-menu-item>
          <el-menu-item index="/userHomePage/jilu">
            <i class="iconfont icon-jilu"></i>
            <span slot="title">会议记录</span>
          </el-menu-item>
          <el-menu-item index="/userHomePage/shenqing">
            <i class="iconfont icon-shenqing"></i>
            <span slot="title">申请会议</span>
          </el-menu-item>
          <el-menu-item index="/userHomePage/shezhi">
            <i class="iconfont icon-shezhi"></i>
            <span slot="title">我的设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="12">
          <router-view keep-alive :myInfo="myInfo"></router-view>
      </el-col>
    </main>
  </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
import '@/assets/css/iconfont.css'
export default {
  components: {
    layoutHeader: () => import("@/components/header")
  },

  data() {
    return {
      myInfo: {},
      pagename: "个人中心"
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      axion.getUserInfo({ token: getCookie("token") }).then(res => {
        this.myInfo = res.data.data;
      });
    }
  }
};
</script>
