<template>
  <div>
    <el-button type="user" size="mini" @click="addUser">添加用户</el-button>
    <el-button type="user" size="mini" @click="importUser">导入用户</el-button>
    <input type="file" name="file" id="file" style="display: none;" @change='uploads'>
    <el-input :span="12" placeholder="请输入用户姓名查询" class="select" prefix-icon="el-icon-search" v-model="select"  @keyup.enter.native="submit()" clearable></el-input>
    <el-table :data="users" style="width:802px;">
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="hospitalName" label="医院" width="200"></el-table-column>
      <el-table-column prop="department" label="科室" width="80"></el-table-column>
      <el-table-column prop="phone" label="电话" width="120"></el-table-column>
      <el-table-column prop="position" label="职位" width="120"></el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.userState === '1'">在线</span>
          <span v-else>离线</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <span style="cursor:pointer;" @click="deleteUser(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="10"
        :current-page="pageNo"
        @current-change="dosth"
      ></el-pagination>
    </div>
    

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
      user: null,
      pageNo:1,
      users:[],
      total:0,
    };
  },
  mounted() {
      this.getUserLists();

  },
  methods: {
    dosth(val){
        this.pageNo=val;
        this.getUserLists(this.select);

    },
    deleteUser(u){
        this.$alert("确定删除用户  " + u.hospitalName + ":   " + u.name, {
        confirmButtonText: "确定",
        callback: action => {
          if (`${action}` == "confirm") {
            var token = getCookie("token");
            axion
              .deleteUser({ token: getCookie("token"), userId: u.id })
              .then(d => {
                this.$message({
                            type: "info",
                            message: d.data.data
                });
                this.getUserLists();
              });
            // this.$message({
            //   type: "info",
            //   message: `删除成功!`
            // });
          }
        }
      });

    },
    getUserLists(val){
        axion.getUserLists({pageNo:this.pageNo,name:val}).then(res=>{
            this.users=res.data.data;
            this.total=parseInt(res.data.message);
        });
    },
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
        this.pageNo=1;
        this.getUserLists(this.select);
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
