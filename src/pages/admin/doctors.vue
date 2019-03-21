<template>
  <div>
    <el-button type="user" size="mini" @click="addUser">添加用户</el-button>
    <el-button type="user" size="mini" @click="importUser">导入用户</el-button>
    <input type="file" name="file" id="file" style="display: none;" @change='uploads'>
    <el-input :span="12" placeholder="请输入用户姓名查询" class="select" prefix-icon="el-icon-search" v-model="select"  @keyup.enter.native="submit()" clearable></el-input>

    

  </div>
</template>

<style>
</style>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
  data() {
    return {
      loading: false,
      pageSize: 10,
      total: 0,
      select: "",
      user: [],
    };
  },
  mounted() {

  },
  methods: {
    uploads(e) {
      //获取到当前文件对象
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      axion.uploadUserExcel(formData, getCookie("token"));
    },
    addUser() {
      console.log("function addUser() is not defined!");
    },
    importUser() {
        document.querySelector('#file').click()
    },
    submit(){
        
    }
  }
};
</script>

<style>
.select {
  margin-bottom: 10px;
  width: 200px;
  margin-left: 410px;
}
</style>
