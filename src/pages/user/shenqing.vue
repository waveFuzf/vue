<template>
  <div>
     <el-col style="margin-top:20px;height:390px;">
      <span style="margin-left:20px;">我收藏的</span>
       <el-table
          :data="consults"
          v-loading="loading"
          stripe
          style="border:1px solid #cccdce;width:95%;height:290px;margin:20px auto;"
        >
          <el-table-column prop="consultNo" label="病理号" width="130"></el-table-column>
          <el-table-column prop="caseTypeName" label="类型" width="110"></el-table-column>
          <el-table-column prop="consultPatient.patientName" label="患者姓名" width="80"></el-table-column>
          <el-table-column prop="consultPatient.age" label="年龄" width="60"></el-table-column>
          <el-table-column prop="doctors[1].doctorName" label="会诊专家" width="80"></el-table-column>
          <el-table-column  label="创建时间" width="100">
            <template slot-scope="scope">
              {{getDate(scope.row.createTime)}}
            </template>
          </el-table-column>
          <el-table-column label="部位" width="80" prop="parts">
            
          </el-table-column>
          <el-table-column label="操作" width="162">
            <template slot-scope="scope">
              <i class="el-icon-search" @click="$router.push('blConsultInfo?consult_id='+scope.row.consult_id+'&doctorType='+scope.row.doctorType)">查看</i>
              <i class="el-icon-star-off" @click="editConsultCollection(scope.row,0)">取消收藏</i>
            </template>
          </el-table-column>
        </el-table> 
        <div class="block" style="text-align:right;margin-bottom:10px;">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="10"
            @current-change="dosth"
          ></el-pagination>
        </div>
     </el-col>
  </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
  data() {
    return {
      consults:[],
      loading:true,
      total:0,
      consultStatus:['','待提交','待支付','待收货','待诊断','已退回','已诊断','已取消','待补充','待二次诊断','待诊断'],
    };
  },
  components: {
  },
  props: ["myInfo"],
  mounted() {
    this.getConsultCollection(1);
    
  },
  methods: {
    editConsultCollection(val,collection){
      axion.editConsultCollection({token:getCookie("token"),doctorType:val.doctorType,consult_id:val.consult_id,collection:collection}).then(res=>{
        if(res.data.data=='success'){
          this.getConsultCollection(1);
        }
      })
    },
    dosth(){

    },
    getDate(val){
      return val.substring(0,10);

    },
    getConsultCollection(val){
      this.loading=true;
      axion.getConsultCollection({pageNum:val}).then(res=>{
        if(res.data.code="SUCCESS"){
          this.consults=res.data.data;
          this.loading=false;
          this.total=parseInt(res.data.message);
        }
      })
    }
  }
};
</script>

<style scoped>
.router {
  margin-right:10px;
  float:right;
  color:#2f7ce1!important;
  cursor:pointer;
  font-size:14px;
}
i {
  cursor: pointer;
}
.el-table__empty-text{
  margin: 90px;
}
</style>

