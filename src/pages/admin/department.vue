<template>
  <div>
    <!-- <el-button type="dept" size="mini" @click="addDept">添加部门</el-button>
    <el-button type="dept" size="mini" @click="importDept">导入部门</el-button>-->
    <!-- <el-input
      :span="12"
      placeholder="请输入内容"
      class="select"
      prefix-icon="el-icon-search"
      v-model="select"
      :disabled="stupid"
      @keyup.enter.native="submit()"
      clearable
    ></el-input>-->
    <el-table
      :data="dept"
      v-loading="loading"
      stripe
      style="border:1px solid #cccdce;width:642px;height:290px;"
    >
      <el-table-column prop="deptName" label="部门名称" width="120"></el-table-column>
      <el-table-column prop="directorName" label="主管" width="80"></el-table-column>
      <el-table-column prop="phone" label="电话" width="120"></el-table-column>
      <el-table-column prop="introdecu" label="介绍" width="200"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <span @click="showDialog(scope.row)">编辑</span>
          <span @click="deleteDept(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="dosth"
      ></el-pagination>
    </div>
    <!-- <el-select v-model="value10" multiple filterable allow-create default-first-option placeholder="请选择">
      <el-option v-for="item in user" :key="item.name" :label="item.name" :value="item.name">
      </el-option>
    </el-select>-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="deptInfo" label-width="80px" size="mini">
        <el-form-item label="部门名称">
          <el-input v-model="deptInfo.deptName"></el-input>
        </el-form-item>
        <el-form-item label="主管">
          <el-autocomplete
            class="inline-input"
            v-model="deptInfo.directorName"
            :fetch-suggestions="querySearch"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="deptInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="介绍
        ">
          <el-input v-model="deptInfo.introdecu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="导入部门" :visible.sync="importFormVisible">
      <div slot="footer" class="dialog-footer">
        <a href="/api/department/getDeptExcelFile" download="w3logo">
          <el-button>下载示例文件</el-button>
        </a>
        <input type="file" name="file" @change="uploads">
      </div>
    </el-dialog>-->
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
      total: 0,
      dept: [],
      loading: false,
      pageSize: 5,
      deptInfo:{
          id:"",
          deptName:"",
          directorName:"",
          phone:"",
          introdecu:"",
      },
      dialogFormVisible:false,
      directors:[]
    };
  },
  mounted() {
    this.getDeptCount();
    this.getDirectors();
  },
  methods: {
    deleteDept(u){
        this.$alert("确定删除部门:" + u.deptName, {
        confirmButtonText: "确定",
        callback: action => {
          if (`${action}` == "confirm") {
            var token = getCookie("token");
            axion
              .deleteDept({ token: getCookie("token"), id: u.id })
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
    },  
    getDirectors(){
        axion.getDirectors({token:getCookie("token")}).then(res=>{
            this.directors=res.data.data;
            for(var x in this.directors){
              this.directors[x].value = this.directors[x].realName;
            }
        })
    },
    update() {
      axion.updateDeptInfo(getCookie("token"), this.deptInfo).then(res => {
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
    getDeptCount() {
      axion.getDeptCount({ token: getCookie("token") }).then(res => {
        this.total = res.data;
        if (res.data != 0) {
          this.getDeptList(1);
        }
      });
    },
    getDeptList(val) {
      console.log(val);
      axion.getDept({ token: getCookie("token"), pageNo: val }).then(res => {
        this.dept = res.data.data;
        this.loading=false;
        console.log(this.dept);
      });
    },
    dosth(val) {
      this.loading=true;
      this.getDeptList(val);
    },
    showDialog(val){
      this.deptInfo.id = val.id;
      this.deptInfo.deptName = val.deptName;
      this.deptInfo.phone = val.phone;
      this.deptInfo.introdecu = val.introdecu;
      this.deptInfo.directorName=val.directorName;
      this.dialogFormVisible = true;
    },
    querySearch(queryString, cb) {
      var directors = this.directors;
      var results = queryString
        ? directors.filter(this.createFilter(queryString))
        : directors;
      cb(results);
      console.log(results);
    },
    createFilter(queryString) {
      return directors => {
        return (
          directors.realName.indexOf(queryString) === 0
        );
      };
    },
  }
};
</script>

<style>
.select {
  margin-bottom: 10px;
  width: 150px;
  margin-left: 410px;
}
.block {
  width: 640px;
  text-align: center;
}
.el-button--dept {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
