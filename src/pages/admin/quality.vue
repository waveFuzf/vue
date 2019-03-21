<template>
    <div>
        <el-row style="border-left:4px solid #409EFF;">
            <span style="font-size:20px;color:#425b77;margin:20px;">搜索条件</span><br>
        <el-row style="margin-top:20px;margin-left:30px;">
            <el-date-picker v-model="selectForm.beginTime" type="date" placeholder="起始日期" value-format=" yyyy-MM-dd" format="yyyy-MM-dd">
            </el-date-picker>
            <el-date-picker v-model="selectForm.endTime" type="date" placeholder="结束日期" value-format=" yyyy-MM-dd" format="yyyy-MM-dd">
            </el-date-picker>
        </el-row>
        <el-row style="margin-top:20px;margin-left:30px;">
            <el-tabs v-model="selectForm.activeName" style="float:left;width:240px;">
                <el-tab-pane label="切片质量" name="1"></el-tab-pane>
                <el-tab-pane label="初步诊断质量" name="2"></el-tab-pane>
            </el-tabs>
            <el-radio v-model="selectForm.radio" label="1" style="line-height:40px;">按医院</el-radio>
            <el-radio v-model="selectForm.radio" label="2">按部位</el-radio>
        </el-row>
        </el-row>
        <el-row style="font-size:14px;color:#425b77;margin-top:20px;line-height:28px;">
            <span>共有 <span style="color:#409EFF;">{{res.length}} </span>项</span>
            <el-button style="float:right;" size="mini" @click="exportExcel">导出Excel</el-button>
        </el-row>
        <el-table
          id="out-table"
          v-loading="loading"
          :data="res"
          stripe
          style="border:1px solid #cccdce;width:880px;height:290px;margin-top:20px;"
        >
          <el-table-column prop="name" :label="selectForm.radio=='1'?'医院名称':'部位'" width="130"></el-table-column>
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


    </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
    components: {
       
    },
    watch:{
        selectForm:{
            handler(){
                if(!!this.selectForm.beginTime==!!this.selectForm.endTime){
                    this.selectQualityInfo();
                }
            },
            deep:true,
            immediate:true,
        },
        count:function(){
            console.log(this.count);
        }
    },
    data() {
        return{
           selectForm:{
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
         exportExcel () {
         var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             var fileName=this.selectForm.activeName=='1'?"远程病理切片质控报告":"远程病理初诊质控报告";
             if(!!this.selectForm.beginTime&&!!this.selectForm.endTime){
                 fileName=fileName+this.selectForm.beginTime+"至"+this.selectForm.endTime;
             }
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName+'.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
        },
         getPercent(num){
           return (Math.round(num / this.count * 10000) / 100.00)+"%";  
         },
         selectQualityInfo(){
             this.loading=true;
             axion.selectQualityInfo(this.selectForm).then(res=>{
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

