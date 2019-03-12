<template>
    <div class="main" style="400px;">
      <div>
        <div class="username" style="margin-top:20px;">
          <input type="text" placeholder="请输入用户名" v-model="nameInput" />
        </div>
        <div class="password">
          <input type="password" placeholder="请输入密码" v-model="passwordInput" suffix-icon="el-icon-view" />
        </div>
        <a class="forget floatRight" href="/forget">忘记密码?</a><br>
        <el-button type="primary" @click="login">{{(type)?"登录":"注册"}}</el-button>
        <div class="footer">{{(type)?"没":"已"}}有账号？<span @click="changeType">{{(!type)?"登录":"注册"}}</span></div>
      </div>
    </div>
</template>
<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie} from "@/util/cookie.js";
import '@/assets/css/default.css';
export default {
  data() {
    return {
      note: {
        backgroundImage: "url(" + require("../assets/img/background.png")
      },
      nameInput: "",
      passwordInput: "",
      setLoginPrams: {
        loginName: "",
        password: ""
      },
    };
  },
  props:["type"],
  methods: {
    changeType() {
      this.type = !this.type;
    },
    login() {
      if (this.passwordInput == "" || this.nameInput == "") {
        this.$message.error("用户名或密码不能为空！");
        return;
      }
      this.setLoginPrams.loginName = this.nameInput;
      this.setLoginPrams.password = this.passwordInput;
      if (this.type) {
        axion.userLogin(this.setLoginPrams).then(d => {
          if (d.data.data == null) {
            this.$message.error("登录失败,请联系管理员！");
            return;
          }
          saveCookie("token", d.data.data);
          if(d.data.message=="1"){
            console.log("我是管理员！");
            this.$router.push("/homePage");
            return;
          }
          this.$emit('closeDialog')
        });
      } else {
        axion.userSign(this.setLoginPrams).then(d => {
          if (d.data.data == null) {
            this.$message.error(d.data.message);
            return;
          }
          this.type = !this.type;
        });
      }
    }
  }
};
</script>

<style scoped>
input {
  height: 30px;
  width: 360px;
  margin-top: 20px;
  border: none;
  border-bottom: 1px solid #ebebeb;
  outline: none;
}
.el-button--primary {
  margin-top: 20px;
  height: 30px;
  width: 360px;
  color: #fff;
  line-height: 0px;
}
a {
  font-size: 13.3333px;
  color: #8590a6;
  text-decoration: none;
  margin-top: 5px;
}
.footer {
  margin-top: 20px;
  background-color: #f6f6f6;
  width: 100%;
  height: 50px;
  font-size: 13.3333px;
  color: #939193;
  line-height: 50px;
  border-top: 1px solid #ebebeb;
}
.main {
  text-align: center;
  width: 100%;
  border: 1px solid white;
  background-color: white;
  position: relative;
}
</style>
