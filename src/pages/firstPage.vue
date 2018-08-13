<template>
  <div>
    <el-row>
      <router-link to="500">
        <el-button>跳转</el-button>
      </router-link>
      <el-button type="primary" v-on:click="json">JSON</el-button>
    </el-row>
    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="select" :disabled="stupid" style="width:250px" @keyup.enter.native="submit" clearable>
    </el-input>
    <el-table :data="student" stripe style="width: 900px">
      <el-table-column prop="id" label="编号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="city" label="城市" width="180">
      </el-table-column>
      <el-table-column prop="birthday" label="生日" width="180">
      </el-table-column>
    </el-table>
    <div>
      <el-radio-group v-model="radio">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    </div>
    <el-autocomplete class="inline-input" v-model="state" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false"></el-autocomplete><br>
    <el-select v-model="value10" multiple filterable allow-create default-first-option placeholder="请选择">
      <el-option v-for="item in student" :key="item.name" :label="item.name" :value="item.name">
      </el-option>
    </el-select>
  </div>

</template>

<style>
</style>

<script>
import axion from "@/util/http_url.js";
export default {
  data() {
    return {
      select: "",
      radio: "上海",
      state: "",
      student: [],
      stupid: false,
      value10: []
    };
  },
  mounted() {
    this.getEvaluateList();
  },
  methods: {
    querySearch(queryString, cb) {
      var student = this.student;
      var results = queryString
        ? student.filter(this.createFilter(queryString))
        : student;
      cb(results);
      console.log(results);
    },
    createFilter(queryString) {
      return student => {
        return (
          student.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    json() {
      // let emmm=this.student;
      // emmm.forEach(function(e,index){
      //   alert(emmm[index].name)
      // })
      // for(var e in emmm){
      //   alert(emmm[e].name);
      // }
      // for(var emm in this.student){
      //   alert(this.student[emm].name)
      // }
      this.stupid = !this.stupid;
    },
    getEvaluateList() {
      axion.getAll().then(Response => {
        this.student = Response.data;
        for (var x in this.student) {
          this.student[x].value = this.student[x].name;
        }
        console.log(this.student);
      });
    },
    submit() {
      axion
        .getByName({ name: this.select })
        .then(Response => (this.student = Response.data));
    }
  }
};
</script>
