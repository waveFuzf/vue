<template>
  <div>
    <el-row>
      <!-- <router-link to="500">
        <el-button>跳转</el-button>
      </router-link> -->
    </el-row>
    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="select" :disabled="stupid" style="width:250px" @keyup.enter.native="submit" clearable>
    </el-input>
    <el-table :data="user" v-loading="loading" stripe style="border:1px solid #cccdce;width:802px;height:290px;">
      <el-table-column prop="loginName" label="登陆账号" width="80">
      </el-table-column>
      <el-table-column prop="realName" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200">
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="120">
      </el-table-column>
      <el-table-column prop="deptName" label="部门" width="120">
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '1'">在线</span>
          <span v-else>离线</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <span @click="showDialog(scope.row)">编辑</span>
          <span @click="deleteUser(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="dosth">
      </el-pagination>
    </div>
    <!-- <el-select v-model="value10" multiple filterable allow-create default-first-option placeholder="请选择">
      <el-option v-for="item in user" :key="item.name" :label="item.name" :value="item.name">
      </el-option>
    </el-select> -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="userInfo" label-width="80px" size="mini">
        <el-form-item label="姓名">
          <el-input v-model="userInfo.realName" :placeholder="userInfo.realName"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <!-- <el-autocomplete class="inline-input" v-model="userInfo.deptId" :placeholder=editUser.deptId :fetch-suggestions="querySearch" :trigger-on-focus="false">
          </el-autocomplete> -->
          <el-autocomplete class="inline-input" v-model="userInfo.deptId" :placeholder="userInfo.deptId" :fetch-suggestions="querySearch">
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userInfo.phone" :placeholder="userInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email" :placeholder="userInfo.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
    </el-dialog>

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
      pageSize: 5,
      total: 0,
      dialogFormVisible: false,
      select: "",
      user: [],
      dept: [],
      stupid: false,
      userInfo: {
        id: "",
        realName: "",
        phone: "",
        email: "",
        deptId: ""
      }
    };
  },
  mounted() {
    this.getUserCount();
    this.getDeptsList();
  },
  methods: {
    dosth(val) {
      if(this.select==""){
        this.getUsersList(val);
        return;
      }
      submit(val);
    },
    getUserCount() {
      axion.getUserCount({ token: getCookie("token") }).then(res => {
        this.total = res.data;
        if (res.data != 0) {
          this.getUsersList(1);
        }
      });
    },
    getDeptsList() {
      axion.getDeptsList({ token: getCookie("token") }).then(res => {
        this.dept = res.data.data;
        for (var x in this.dept) {
          this.dept[x].value = this.dept[x].deptName;
        }
        console.log(this.dept);
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    querySearch(queryString, cb) {
      var dept = this.dept;
      var results = queryString
        ? dept.filter(this.createFilter(queryString))
        : dept;
      cb(results);
      console.log(results);
    },
    createFilter(queryString) {
      return dept => {
        return (
          dept.deptName.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    getUsersList(i) {
      this.loading = true;
      axion.getAll({ token: getCookie("token"), pageNo: i }).then(Response => {
        this.user = Response.data.data;
        this.loading = false;
        for (var x in this.user) {
          this.user[x].value = this.user[x].realName;
        }
      });
    },
    submit(val) {
      var l=val;
      axion
        .getByName({ name: this.select,pageSize: this.pageSize,pageNo:1,token:getCookie("token") })
        .then(Response => (this.user = Response.data.data));
    },
    showDialog(user) {
      this.userInfo.id = user.id;
      this.userInfo.realName = user.realName;
      this.userInfo.phone = user.phone;
      this.userInfo.email = user.email;
      this.userInfo.deptId = user.deptId;
      this.dialogFormVisible = true;
      console.log(this.userInfo);
    },
    update() {
      axion.updateUserInfo(getCookie("token"), this.userInfo).then(res => {
        if (res.data.code === "SUCCESS") {
          this.$message.success("修改成功!");
          this.dialogFormVisible = !this.dialogFormVisible;
          return;
        } else {
          this.$message.error(res.data.message);
          this.dialogFormVisible = !this.dialogFormVisible;
          return;
        }
      });
    },
    deleteUser(u) {
      this.$alert("确定删除用户:" + u.loginName + "   " + u.realName, {
        confirmButtonText: "确定",
        callback: action => {
          if (`${action}` == "confirm") {
            var token = getCookie("token");
            axion
              .deleteUser({ token: getCookie("token"), userId: u.id })
              .then(d => {
                console.log(d);
              });
            // this.$message({
            //   type: "info",
            //   message: `删除成功!`
            // });
          }
        }
      });
    }
  }
};
</script>
