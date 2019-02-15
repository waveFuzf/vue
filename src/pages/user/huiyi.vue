<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待进行会议" name="first"></el-tab-pane>
      <el-tab-pane label="待审核会议" name="second"></el-tab-pane>
    </el-tabs>
    <section v-if="activeName == 'first'">
        <meet-info v-for="item in unDone" :meetInfo="item" :key="item.index"></meet-info>
    </section>
    <section v-if="activeName == 'second'">{{res}}</section>
  </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
  data() {
    return {
      activeName: "first",
      unDone: "",
    };
  },
  components: {
    meetInfo: () => import("@/components/meetInfo")
  },
  props: ["myInfo"],
  mounted() {
    this.getMeetingByStatus(0);
  },
  methods: {
    handleClick(tab) {
      if (tab._props.name == "first") {
        this.getMeetingByStatus(0);
      } else if (tab._props.name == "second") {
        this.getMeetingByStatus(null);
      }
    },
    getMeetingByStatus(val) {
      axion
        .getMeetingByStatus({ token: getCookie("token"), status: val })
        .then(res => {
          this.unDone = res.data.data;
          console.log(this.unDone);
        });
    }
  }
};
</script>

