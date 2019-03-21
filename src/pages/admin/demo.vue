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
            <el-radio v-model="form.radio" label="300" style="line-height:40px;width:40px;">全部</el-radio>
            <el-radio v-model="form.radio" label="301" style="width:40px;">常规</el-radio>
            <el-radio v-model="form.radio" label="302" style="width:40px;">细胞</el-radio>
            <el-radio v-model="form.radio" label="303" style="width:40px;">冰冻</el-radio>
        </el-row>
       </el-row>
       <el-table
          :data="consults"
          stripe
          style="border:1px solid #cccdce;width:910px;height:290px;margin-top:20px;"
        >
          <el-table-column prop="consultNo" label="病理号" width="130"></el-table-column>
          <el-table-column prop="caseTypeName" label="类型" width="110"></el-table-column>
          <el-table-column prop="consultPatient.patientName" label="患者姓名" width="80"></el-table-column>
          <el-table-column prop="consultPatient.age" label="年龄" width="50"></el-table-column>
          <el-table-column prop="doctors[1].doctorName" label="会诊专家" width="80"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column label="状态" width="150">
              <template slot-scope="scope">
                <span>{{consultStatus[scope.row.consultStatus]}}</span>
                <span v-if="[0,1].indexOf(scope.row.isSettlement)>=0" :class="{color:scope.row.isSettlement==0}" style="color:blue;">
                    {{scope.row.isSettlement==0?"结算未通过":"结算通过"}}
                </span>
              </template>
          </el-table-column>
          <el-table-column label="操作" width="149">
            <template slot-scope="scope">
                <i v-if="scope.row.consultStatus==3" @click="dosth(scope.row,true)" class="iconfont" style="font-size:12px;">&#xe60f;确认收货</i>
                <i v-else class="el-icon-search" @click="dosth(scope.row,false)">查看</i>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog class="watch" title="查看详情" :visible.sync="watchVisible" width="600px" @close="successCloes2">
            <watch-detail ref="watchInit" :clickItem="clickItem" @adminGetConsultList="adminGetConsultList" :type="$route.query.type"></watch-detail>
        </el-dialog>
        <el-dialog title="确认收货" :visible.sync="confirmVisible" @close="successCloes">
            <confirm-receive ref="initDialog" :clickItem="clickItem" @adminGetConsultList="adminGetConsultList"></confirm-receive>
        </el-dialog>
    </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
import "@/assets/css/default.css";
export default {
    components:{
        confirmReceive: () => import("@/components/confirmReceive"),
        watchDetail:() => import("@/components/watchDetail")
    },
    data() {
        return{
           clickItem:null,
           confirmVisible:false,
           consultStatus:['','待提交','待支付','待收货','待诊断','已退回','已诊断','已取消','待补充','待二次诊断','申请退回','申请取消'],
           consults:[],
           form:{
               hospitalId:null,
               statusType:null,
               startTime:null,
               endTime:null,
               pageSize:10,
               pageNum:1,
               radio:"300",
           },
           watchVisible:false,
        }       
    },
    watch:{
        $route:function(){
            this.form.statusType=this.$route.query.type;
            this.adminGetConsultList();
        },
        form:{
            handler(){
                this.adminGetConsultList();
            },
            deep:true,
            immediate:true,
        }
    },
     mounted() {
        this.form.statusType=this.$route.query.type;
        this.adminGetConsultList();
     },
     methods:{
         adminGetConsultList(){
            this.watchVisible=false;
            this.confirmVisible=false;
            axion.adminGetConsultList(this.form).then(res=>{
            this.consults=res.data.data;
        });
         },
         successCloes(){
             this.$refs.initDialog.changeLoading();
         },
         successCloes2(){
             this.$refs.watchInit.changeLoading();
         },
         dosth(val,flag){
             flag?this.confirmVisible=true:this.watchVisible=true;
             this.clickItem=val;
             setTimeout(() => {
                flag?this.$refs.initDialog.init():this.$refs.watchInit.init();
             }, 1000);
         }

     }
    
}
</script>

<style>
i {
  cursor: pointer;
}
.watch .el-dialog__body{
padding:0px 20px;
}
.color {
    color: red !important;
}
</style>

