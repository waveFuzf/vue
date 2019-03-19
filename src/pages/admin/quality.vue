<template>
    <div>
        <el-row style="border-left:4px solid #409EFF;">
            <span style="font-size:20px;color:#425b77;margin:20px;">搜索条件</span><br>
        <el-row style="margin-top:20px;margin-left:30px;">
            <el-date-picker v-model="form.beginTime" type="date" placeholder="起始日期">
            </el-date-picker>
            <el-date-picker v-model="form.endTime" type="date" placeholder="结束日期">
            </el-date-picker>
        </el-row>
        <el-row style="margin-top:20px;margin-left:30px;">
            <el-tabs v-model="form.activeName" style="float:left;width:240px;">
                <el-tab-pane label="切片质量" name="1"></el-tab-pane>
                <el-tab-pane label="初步诊断质量" name="2"></el-tab-pane>
            </el-tabs>
            <el-radio v-model="form.radio" label="1" style="line-height:40px;">按医院</el-radio>
            <el-radio v-model="form.radio" label="2">按部位</el-radio>
        </el-row>
        </el-row>
        <el-table
          v-loading="loading"
          :data="res"
          stripe
          style="border:1px solid #cccdce;width:100%;height:290px;margin-top:20px;"
        >
          <el-table-column prop="name" :label="form.radio=='1'?'医院名称':'部位'" width="130"></el-table-column>
          <el-table-column prop="one" label="质量不合格" width="120"></el-table-column>
          <el-table-column prop="two" label="质量基本合格" width="120"></el-table-column>
          <el-table-column prop="three" label="质量合格" width="120"></el-table-column>
          <el-table-column prop="four" label="质量优秀" width="120"></el-table-column>
          <el-table-column prop="count" label="总例数" width="120"></el-table-column>
          <el-table-column label="占百分比" width="120">
              <template slot-scope="scope">
                  {{getPercent(scope.row.count)}}
              </template>
          </el-table-column>
        </el-table> 
        {{form}}     


    </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
    components: {
       
    },
    watch:{
        form:function(){
            this.selectQualityInfo();
        }
    },
    data() {
        return{
           form:{
               beginTime:null,
               endTime:null,
               activeName:"1",
               radio:"1",
           },
           loading:true,
           res:[],
           count:0,
           
        }       
    },
     mounted() {
         this.selectQualityInfo();
     },
     methods:{
         getPercent(num){
           return (Math.round(num / this.count * 10000) / 100.00)+"%";  
         },
         selectQualityInfo(){
             this.loading=true;
             axion.selectQualityInfo(this.form).then(res=>{
                 this.res=res.data.data;
                 this.count=parseInt(res.data.message);
                 this.loading=false;
             })
         }

     }
    
}
</script>

<style>
i {
    cursor: pointer;
    font-size:13px;
}
.cell input {
    height: 30px;
}
.el-input__suffix {
    top: 5px !important;
}
</style>

