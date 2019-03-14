<template>
  <div style="background-color:#f8f7f7;height:800px;">
    <layout-header
      :pagename="pagename"
      :myInfo="myInfo"
      :isLogin="isLogin"
      @getUserInfo="getUserInfo"
    ></layout-header>
    <el-col :span="15" :push="2" style="margin-top:50px;font-size:14px;padding-left:20px;">
      {{title1}} > {{title2}} 
      <span v-if="doctorType==1">>&nbsp;<el-tag type="info" closable @close="getConsultsInfo(0)">会诊中</el-tag></span>
    </el-col>
    <div>
      <el-col :span="15" :push="2" class="module">
        <div style="width:90%;padding-left:30px;margin:20px;">会诊列表</div>
        <el-table
          :data="consults"
          v-loading="loading"
          stripe
          style="border:1px solid #cccdce;width:100%;height:290px;"
        >
          <!-- <el-table-column prop="index" label="序号" width="53"></el-table-column> -->
          <el-table-column prop="consultNo" label="病理号" width="130"></el-table-column>
          <el-table-column prop="caseTypeName" label="类型" width="110"></el-table-column>
          <el-table-column prop="consultPatient.patientName" label="患者姓名" width="80"></el-table-column>
          <el-table-column prop="consultPatient.age" label="年龄" width="60"></el-table-column>
          <el-table-column prop="doctors[1].doctorName" label="会诊专家" width="80"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column label="状态" width="90">
              <template slot-scope="scope">
                <span >{{consultStatus[scope.row.consultStatus]}}</span>
              </template>
          </el-table-column>
          <el-table-column label="操作" width="149">
            <template slot-scope="scope">
                <i v-if="scope.row.consultStatus==1" class="el-icon-edit" @click="$router.push('blConsultType?consult_id='+scope.row.consult_id)">编辑</i>
                <i class="iconfont icon-zhifu-01" v-else-if="scope.row.consultStatus==2&&!scope.row.supplementSlideType" style="font-size:14px;" @click="$router.push('payOnline?consultId='+scope.row.consult_id+'&caseTypeId='+scope.row.caseTypeId)">支付</i>
                <i class="iconfont icon-zhifu-01" v-else-if="scope.row.consultStatus==2&&scope.row.supplementSlideType" style="font-size:14px;" @click="$router.push('payOnline?consultId='+scope.row.consult_id+'&caseTypeId=304')">支付</i>
                <i class="el-icon-search" v-else @click="$router.push('blConsultInfo?consult_id='+scope.row.consult_id+'&doctorType='+doctorType)">查看</i>
                <i class="el-icon-edit" v-if="scope.row.consultStatus==8" @click="showBCJC(scope.row)">补充检查</i>
                <i class="el-icon-delete" v-if="[1,2].indexOf(scope.row.consultStatus)>=0 && doctorType==0" @click="deleteConsult(scope.row)">删除</i>
                <i class="el-icon-star-off" v-if="scope.row.doctors[doctorType].collection==0 && scope.row.consultStatus==6" @click="editConsultCollection(scope.row,1)">收藏</i>
              <i class="el-icon-star-off" v-if="scope.row.doctors[doctorType].collection==1 && scope.row.consultStatus==6" @click="editConsultCollection(scope.row,0)">取消收藏</i>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="text-align:right">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="dosth"
          ></el-pagination>
        </div>
      </el-col>
      <el-col :span="5" :push="3" class="module" style="height:150px;">
        <div style="width:100%;padding-left:30px;margin-top:20px;">我的工作量</div>
        <div
          style="width:40%;float:left;border-right:1px solid rgba(47,58,92,.1);margin-left:10%;margin-top:20px;text-align:center;cursor:pointer;"
          @click="getConsultsInfo(1)"
        >
          <span style="color:#ff9948;font-size:40px;">{{undone}}</span>
          <br>
          <span style="color: rgb(27, 34, 59);font-size:16px;">会诊中</span>
        </div>
        <div style="width:40%;float:left;margin-top:20px;text-align:center;">
          <span style="color:#ff9948;font-size:40px;">{{done}}</span>
          <br>
          <span style="color: rgb(27, 34, 59);font-size:16px;">已结束</span>
        </div>
      </el-col>
    </div>

    <el-dialog title="补充检查" :visible.sync="bcjcVisible" class="bcjc" @close="closeBCJC">
      <bcjc-dialog ref="initDialog" :clickItem="clickItem" @successClose="getConsultsInfo(0)"></bcjc-dialog>
    </el-dialog>


  </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
import "@/assets/css/iconfont.css";

export default {
  data() {
    return {
      clickItem:'',
      bcjcVisible:false,
      title1:"首页",
      title2:"我的会诊列表",
      myInfo: {},
      pagename: "",
      isLogin: false,
      done: 0,
      undone: 0,
      consults:[],
      loading:false,
      total:0,
      pageSize:10,
      doctorType:0,
      consultStatus:['','待提交','待支付','待收货','待诊断','已退回','已诊断','已取消','待补充','待二次诊断'],
    };
  },
  components: {
    layoutHeader: () => import("@/components/header"),
    bcjcDialog:() =>import("@/components/bcjcDialog")
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    closeBCJC(){
      this.$refs.initDialog.loading=true;
    },
    showBCJC(val){
      this.bcjcVisible=true;
      this.clickItem=val.consult_id;
      setTimeout(()=>{
      this.$refs.initDialog.init();
      },1000)

    },
    dosth(){

    },
    editConsultCollection(val,collection){
      axion.editConsultCollection({token:getCookie("token"),doctorType:this.doctorType,consult_id:val.consult_id,collection:collection}).then(res=>{
        if(res.data.data=='success'){
          this.getConsultsInfo(this.doctorType);
        }
      })
    },
    getConsultsInfo(val) {
        this.loading=true;
        this.doctorType=val;
        this.bcjcVisible=false;
        axion.getConsultsByUserId({userId:this.myInfo.userId,token:getCookie("token"),doctorType:val}).then(res=>{
            this.consults=res.data.data;
            this.total=parseInt(res.data.message);
            this.loading=false;
        });
    },
    consultsInfo() {
      axion
        .getConsultsInfo({
          doctorType: 1,
          token: getCookie("token"),
          userId: this.myInfo.userId
        })
        .then(res => {
          this.done = res.data.data.done;
          this.undone = res.data.data.undone;
        });
    },
    deleteConsult(u) {
      this.$alert("确定删除病理号:" + u.consultNo, {
        confirmButtonText: "确定",
        callback: action => {
          if (`${action}` == "confirm") {
            var token = getCookie("token");
            axion
              .deleteConsult({ token: getCookie("token"), consultNo: u.consult_id,consultStatus:7})
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
    getUserInfo() {
      var token = getCookie("token");
      if (token != null) {
        axion.getUserInfo({ token: getCookie("token") }).then(res => {
          if (res.data.data != null) {
            this.myInfo = res.data.data;
            this.isLogin = true;
            this.consultsInfo();
            this.getConsultsInfo(0);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.module {
  margin-top: 10px;
  background-color: white;
  border: 1px solid rgba(47, 58, 92, 0.1);
}
i {
  cursor: pointer;
}
.el-dialog__body {
  padding: 0px 20px !important;
}
.bcjc .el-dialog {
  height:500px;

}
</style>
