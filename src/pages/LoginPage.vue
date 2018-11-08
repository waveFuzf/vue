<template>
    <ts-login :top-tab="toptab">
    <div class="ts-loginlabel username" style="margin-top:20px;">
      <input type="text" placeholder="请输入用户名" v-model="nameInput" />
    </div>
    <div class="ts-loginlabel password">
      <input type="password" placeholder="请输入密码" v-model="passwordInput" />
    </div>
    <div class="ts-loginlabel">
      <el-checkbox v-model="checked">10天内自动登录</el-checkbox>
      <router-link to="500">
      <a class="ts-fogot">忘记密码？</a>
      </router-link>
    </div>
    <div class="ts-loginlabel">
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </ts-login>
</template>
<script>
import axion from "@/util/http_url.js";
import {saveCookie} from '@/util/cookie.js'
export default {
 data() {
    return {
      checked: true,
      nameInput: '',
      passwordInput: '',
      setLoginPrams: {
        loginName: '',
        password: '',
      }
    }
  },
  methods:{
      login(){
          if(this.passwordInput==''||this.nameInput==''){
              this.$message.error("用户名或密码不能为空！");
              return;
          }
          this.setLoginPrams.loginName=this.nameInput;
          this.setLoginPrams.password=this.passwordInput;
          axion.userLogin(this.setLoginPrams).then(d=>{
              console.log("111");
          })
      }
  }
    
}
</script>
