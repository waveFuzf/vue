<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待进行会议" name="first"></el-tab-pane>
      <el-tab-pane label="待审核会议" name="second"></el-tab-pane>
    </el-tabs>
    <section v-if="activeName == 'first'"></section>
    <section v-if="activeName == 'second'"></section>
  </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  props: ["myInfo"],
  mounted() {
    this.getMeetingByStatus(0);
  },
  methods: {
    handleClick(tab) {
      if(tab._props.name == 'first'){
          this.getMeetingByStatus(0);
      }else if (tab._props.name == 'second'){
          this.getMeetingByStatus();
      }
    },
    getMeetingByStatus(val){
       axion.getMeetingByStatus({ token: getCookie("token"),status: val}).then(res => {
        console.log(res);
      });
    }

  }
};
</script>

