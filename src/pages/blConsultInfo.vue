<template>
  <div style="background-color:#f8f7f7;">
    <layout-header
      :pagename="pagename"
      :myInfo="myInfo"
      :isLogin="isLogin"
      @getUserInfo="getUserInfo"
    ></layout-header>
    <el-row>
      <el-col
        :span="15"
        :push="2"
        style="margin-top:50px;font-size:14px;padding-left:20px;"
      >{{title1}} > {{title2}} > {{patientInfo.patientName}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="15" :push="2" class="module">
        <div style="width:90%;padding:10px;margin:20px;border-bottom: 1px solid #ebebeb;">
          会诊编号：
          <span style="color:#409EFF;">{{consultDetail.consultNo}}</span>
          <span style="color:#425b77;font-size:12px;float:right;">
            送检医生：
            <span style="color:#1296db;">{{expectDoc.doctorName}}</span>
          </span>
        </div>
        <div style="width:90%;padding:10px 0px;margin:20px 20px 0px 20px;">
          <consult-status-tag :consultStatus="consultDetail" :doctorType="doctorType"></consult-status-tag>
        </div>

        <el-collapse style="width:92.5%;margin-left:20px;border-top:0px;" v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="el-icon-document" style="margin-left:20px;">申请单</i>
            </template>
            <div style="width:90%;padding:10px;margin:20px;margin-bottom:0px;height:400px;">
              <img style="float:left;" width="10%" src="../assets/img/default.jpg">
              <div style="color:#425b77;font-size:14px;margin:15px;" class="floatLeft">
                {{patientInfo.patientName}}&nbsp;&nbsp;&nbsp;&nbsp;
                {{patientInfo.sex}}&nbsp;&nbsp;&nbsp;&nbsp;
                {{patientInfo.age}}
                <br>
                <br>
                {{consultDetail.caseTypeName}}
              </div>
              <div class="floatLeft" style="width:100%;">
                <el-row>
                  <el-col :span="10">
                    <el-form label-width="120px">
                      <el-form-item label="原病理号：">{{patientInfo.mzNum}}</el-form-item>
                      <el-form-item label="临床诊断：">{{consultDetail.clinicalDiagnosis}}</el-form-item>
                      <el-form-item label="会诊目的：">{{consultDetail.purpose}}</el-form-item>
                      <el-form-item label="病情介绍：">{{consultDetail.casePresentation}}</el-form-item>
                    </el-form>
                  </el-col>
                  <el-col :span="10">
                    <el-form label-width="120px">
                      <el-form-item label="住院号/门诊号：">{{patientInfo.mzNum}}</el-form-item>
                      <el-form-item label="原病理诊断：">{{consultDetail.oldDiagnosis}}</el-form-item>
                      <el-form-item label="备注：">{{consultDetail.remake}}</el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
                <el-row style="margin-left:38px;">
                  <el-col :span="20">
                    <el-form>
                      <el-form-item label="病理切片：" label-width="120px;">
                        
                        <div
                          class="slides"
                          v-for="(item) in consultDetail.hzSlides"
                          :key="item.uuid"
                        > <viewer :images="consultDetail.hzSlides">
                          <img style="width:100px;height:100px;" :src="item.clientSlidePath">
                          </viewer>
                        </div>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
                <el-row style="height:20px;"></el-row>
              </div>

            </div>
            
          </el-collapse-item>
          <el-collapse-item v-if="[6,8,9].indexOf(consultDetail.consultStatus)>=0||consultDetail.supplementSlideType==2" name="2">
            <template slot="title">
              <i class="el-icon-document" style="margin-left:20px;">会诊报告</i>
            </template>

            <div style="width:90%;padding:10px;margin:20px;margin-bottom:0px;">
              <el-row>
                <el-col :span="10">
                  <el-form label-width="120px">
                    <el-form-item label="镜下所见：">{{form.mirrorView}}</el-form-item>
                    <el-form-item label="专家意见：">{{form.diagnose}}</el-form-item>
                    <el-form-item label="切片质量：">{{slideEstimates[form.slideEstimate-1]}}</el-form-item>
                    <el-form-item label="出诊质量：">{{diagnosisEstimates[form.diagnosisEstimate-1]}}</el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
          <el-collapse-item v-if="[6,9].indexOf(consultDetail.consultStatus)>=0" name="3">
            <template slot="title">
              <i class="el-icon-document" style="margin-left:20px;">补充检查信息</i>
            </template>
            <div style="width:90%;padding:10px;margin:20px;margin-bottom:0px;">
              <el-row>
                <el-col>
                  <el-form label-width="120px">
                    <el-form-item label="补充切片：">
                      <div v-if="!bcjcRes.hzSlideList">暂无切片信息</div>
                      <div
                        v-else
                        class="slides"
                        v-for="(item) in bcjcRes.hzSlideList"
                        :key="item.uuid"
                      >
                        <img style="width:100px;height:100px;" :src="item.clientSlidePath">
                      </div>
                    </el-form-item>
                    <el-form-item label="补充检查项：">{{form.immuneTag}}</el-form-item>
                    <el-form-item v-if="consultDetail.supplementSlideType==1" label="初步判定：">{{bcjcRes.initialJudgement}}</el-form-item>
                    <el-form-item v-if="consultDetail.supplementSlideType==1" label="备注：">{{bcjcRes.remarkDoctor}}</el-form-item>
                    <el-form-item label="结果判定：" v-if="consultDetail.consultStatus==6" style="margin-top:10px;">
                        {{bcjcForm.ultimateJudgement}}
                    </el-form-item>
                    <el-form-item label="补充意见：" v-if="consultDetail.consultStatus==6" style="margin-top:10px;">
                        {{bcjcForm.supplymentaryOpinion}}
                    </el-form-item>
                    </el-form>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>

          <div
            v-if="doctorType==1&&[4,9].indexOf(consultDetail.consultStatus)>=0"
            style="width:90%;padding:10px;margin:0 auto;"
          >
            <el-button v-if="[4].indexOf(consultDetail.consultStatus)>=0" @click="dialogInit">写诊断</el-button>
            <el-button v-else @click="expectDocBCJC">补充检查</el-button>
          </div>
          <div
            v-if="doctorType==0&&[6,8,9].indexOf(consultDetail.consultStatus)>=0"
            style="width:90%;padding:10px;margin:0 auto;"
          >
            <el-button @click="goToPdf(true)">打印报告</el-button>
            <el-button v-if="consultDetail.supplementSlideType" @click="goToPdf(false)">打印补充检查报告</el-button>
            <el-button v-if="consultDetail.consultStatus==8" @click="showBCJC()">补充检查</el-button>
          </div>
        </el-collapse>
      </el-col>
      <el-col :span="5" :push="3" class="module" style="height:150px;">
        <div style="width:100%;padding-left:30px;margin-top:20px;">我的工作量</div>
        <div
          style="width:40%;float:left;border-right:1px solid rgba(47,58,92,.1);margin-left:10%;margin-top:20px;text-align:center;cursor:pointer;"
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
    </el-row>

    <div style="background-color:#374266;height:50px;margin-top:20px;width:100%;"></div>
    <el-dialog
      title="补充检查"
      :visible.sync="additional"
      width="50%"
      @close="dialogVisible=true;additional=false;"
    >
      <el-form :model="form">
        <el-form-item label="补充检查项目" label-width="100px" style="margin-top:10px;">
          <el-tag
            v-for="(item,index) in form.immuneTag"
            :key="index"
            style="margin-left:10px;width:80px;text-align:center;"
            closable
            @close="handleClose(index)"
          >{{item}}</el-tag>
          <el-tag v-if="form.immuneTag&&form.immuneTag.length==0">{{tips}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            style="width:80px;margin-left:10px;"
          >+</el-button>
        </el-form-item>
        <el-checkbox style="margin-left:37px;" v-model="isMaterial">白片</el-checkbox>
        <el-input-number
          size="mini"
          :disabled="!isMaterial"
          v-model="form.materialNum"
          :min="1"
          :max="10"
          style="margin-left:10px;"
        ></el-input-number>
      </el-form>
      <el-checkbox style="margin-left:37px;" v-model="form.isCandle">蜡块</el-checkbox>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=true;additional=false;">取 消</el-button>
        <el-button type="primary" @click="confirm(false)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="写诊断" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form">
        <el-form-item label="切片质量" label-width="70px">
          <el-radio v-model="form.slideEstimate" :label="1">质量不合格</el-radio>
          <el-radio v-model="form.slideEstimate" :label="2">质量基本合格</el-radio>
          <el-radio v-model="form.slideEstimate" :label="3">质量合格</el-radio>
          <el-radio v-model="form.slideEstimate" :label="4">质量优秀</el-radio>
        </el-form-item>
        <el-form-item label="出诊质量" label-width="70px">
          <el-radio v-model="form.diagnosisEstimate" :label="1">诊断不正确</el-radio>
          <el-radio v-model="form.diagnosisEstimate" :label="2">诊断基本正确</el-radio>
          <el-radio v-model="form.diagnosisEstimate" :label="3">诊断完全正确</el-radio>
          <el-radio v-model="form.diagnosisEstimate" :label="4">诊断不明确</el-radio>
        </el-form-item>
        <el-form-item label="镜下所见" label-width="70px" style="margin-top:10px;">
          <el-input type="textarea" v-model="form.mirrorView"></el-input>
        </el-form-item>
        <el-form-item label="专家意见" label-width="70px" style="margin-top:10px;">
          <el-input type="textarea" v-model="form.diagnose"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bcjc">补充检查</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm(true)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog class="report" :visible.sync="reportVisible" width="50%" top="0" :modal="false">
      <report :consultDetail="consultDetail" :form="form" :bcjcForm="bcjcForm"></report>
      <span slot="footer" class="dialog-footer">
        <el-button @click="finallyConfirm">{{confirmText}}</el-button>
        <el-button type="primary" @click="returnToEdit">返回修改</el-button>
      </span>
    </el-dialog>

    <el-dialog title="补充检查" :visible.sync="bcjcVisible" class="bcjc" @close="closeBCJC">
      <bcjc-dialog ref="initDialog" :clickItem="clickItem" @successClose="successClose"></bcjc-dialog>
    </el-dialog>

    <el-dialog title="补充检查" :visible.sync="expectDocBcjc" width="40%">
      <el-form>
        <el-form-item label="结果判定：" label-width="100px" style="margin-top:10px;" required>
          <el-input type="textarea" v-model="bcjcForm.ultimateJudgement"></el-input>
        </el-form-item>
        <el-form-item label="补充意见：" label-width="100px" style="margin-top:10px;" required>
          <el-input type="textarea" v-model="bcjcForm.supplymentaryOpinion"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="expectDocBcjc = false">取 消</el-button>
        <el-button type="primary" @click="BCJConfirm">确 定</el-button>
      </span>
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
      slideEstimates: ["质量不合格", "质量基本合格", "质量合格", "质量优秀"],
      diagnosisEstimates: [
        "诊断不正确",
        "诊断基本正确",
        "诊断完全正确",
        "诊断不明确"
      ],
      confirmText: "确认结束",
      tips: "检查不规范 亲人两行泪!",
      additional: false,
      expectDoc: "",
      bcjcForm: {},
      form: {},
      dialogVisible: false,
      title1: "首页",
      title2: "我的会诊列表",
      myInfo: {},
      pagename: "",
      isLogin: false,
      done: 0,
      undone: 0,
      doctorType: 0,
      consultId: "",
      consultDetail: [],
      patientInfo: [],
      consultStatus: [
        "",
        "待提交",
        "待支付",
        "待收货",
        "待诊断",
        "已退回",
        "已诊断",
        "已取消",
        "待补充",
        "待二次诊断"
      ],
      inputVisible: false,
      inputValue: "",
      isMaterial: false,
      reportVisible: false,
      bcjcVisible: false,
      clickItem: "",
      bcjcRes: {},
      activeNames: ["1", "2", "3"],
      expectDocBcjc: false
    };
  },
  components: {
    layoutHeader: () => import("@/components/header"),
    consultStatusTag: () => import("@/components/consultStatusTag"),
    report: () => import("@/components/report"),
    bcjcDialog: () => import("@/components/bcjcDialog")
  },
  mounted() {
    this.consultId = this.$route.query.consult_id;
    this.doctorType = this.$route.query.doctorType;
    this.getUserInfo();
    
  },
  methods: {
    returnToEdit(){
      this.consultDetail.consultStatus==4?this.dialogVisible=true:this.expectDocBcjc=true;
      this.reportVisible=false;
    },
    BCJConfirm() {
      this.bcjcForm.consult_id=this.consultId;
      console.log(this.bcjcForm);
      axion.editBCJCByConsultId(this.bcjcForm).then(res => {
        if(res.data.code="SUCCESS"){
          this.expectDocBcjc=false;
          this.reportVisible=true;
        }
      });
    },
    successClose() {
      this.bcjcVisible = false;
      this.consultDetail.consultStatus = 9;
    },
    showBCJC(val) {
      this.bcjcVisible = true;
      this.clickItem = this.consultId;
      setTimeout(() => {
        this.$refs.initDialog.init();
      }, 1000);
    },
    goToPdf(val) {
      if(val){
        window.open(this.form.pdf);
      }else{
        window.open(this.bcjcRes.reportPath);
      }
    },
    finallyConfirm() {
      var consultStatus;
      var type;
      if(this.consultDetail.consultStatus==4){
        type=0;
        this.$confirm("是否需要补充检查", {
        confirmButtonText: "需要",
        cancelButtonText: "不需要",
        callback: action => {
           consultStatus= `${action}` == "confirm" ? 8 : 6;
           this.dosth(consultStatus,type);
        }
      });
      }else {
        type=1;
        consultStatus=6;
        this.dosth(consultStatus,type);
      }
    },
    dosth(consultStatus,type){
      axion
            .deleteConsult({
              token: getCookie("token"),
              consultNo: this.consultId,
              consultStatus: consultStatus
            })
            .then(res => {
              if ((res.data.code = "SUCCESS")) {
                this.consultDetail.consultStatus=consultStatus;
                this.confirmText = "正在生成pdf";
                axion
                  .createPdf({ consult_id: this.consultId, type: type })
                  .then(res => {
                    this.reportVisible = false;
                    if ((res.data.code = "SUCCESS")) {
                      this.$message({
                        type: "info",
                        message: `诊断成功!`
                      });
                    } else {
                      this.$message({
                        type: "error",
                        message: `生成pdf失败!`
                      });
                    }
                  });
              }
            });

    },
    handleClose(index) {
      this.form.immuneTag.splice(index, 1);
      console.log(this.form.immuneTag);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    closeBCJC() {
      this.$refs.initDialog.loading = true;
    },
    expectDocBCJC() {
      this.expectDocBcjc = true;
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.immuneTag.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    bcjc() {
      this.additional = true;
      this.dialogVisible = false;
    },
    dialogInit() {
      axion
        .getDiagnoseDetail({
          consultId: this.consultId,
          token: getCookie("token")
        })
        .then(res => {
          this.form = res.data.data;
          this.form.immuneTag = this.form.immuneTag
            ? this.form.immuneTag.split(",")
            : [];
          this.isMaterial = this.form.materialNum ? true : false;
          this.form.isCandle = this.form.isCandle == 1 ? true : false;
          this.dialogVisible = true;
        });
    },
    confirm(val) {
      this.form.consultId = this.consultId;
      this.form.token = getCookie("token");
      if (val) {
        axion
          .expertDiagnose({
            consultId: this.form.consultId,
            slideEstimate: this.form.slideEstimate,
            diagnosisEstimate: this.form.diagnosisEstimate,
            diagnose: this.form.diagnose,
            mirrorView: this.form.mirrorView,
            token: this.form.token
          })
          .then(res => {
            this.dialogVisible = false;
            this.reportVisible = true;
          });
      } else {
        axion
          .expertDiagnoseBCJC({
            consultId: this.form.consultId,
            immuneTag: this.form.immuneTag.join(","),
            isCandle: this.form.isCandle,
            materialNum: this.form.materialNum,
            token: this.form.token
          })
          .then(res => {
            this.additional = false;
          });
      }
    },
    getConsultByConsultId() {
      axion
        .getConsultByConsultId({
          consultId: this.consultId,
          token: getCookie("token")
        })
        .then(res => {
          this.doctorInfo = res.data.data.doctors[1];
          this.consultDetail = res.data.data;
          this.patientInfo = this.consultDetail.consultPatient;
          this.expectDoc = this.consultDetail.doctors[1];
          if (([6, 8, 9].indexOf(this.consultDetail.consultStatus) >= 0)||(this.consultDetail.supplementSlideType==2)) {
            axion
              .getDiagnoseDetail({
                consultId: this.consultId,
                token: getCookie("token")
              })
              .then(res => {
                this.form = res.data.data;
              });
          }
          if ((this.consultDetail.consultStatus == 9||[1,2].indexOf(this.consultDetail.supplementSlideType)>=0)&&this.consultDetail.consultStatus!=3) {
            axion
              .getBCJCsectionByConsId({ consult_id: this.consultId })
              .then(res => {
                this.bcjcRes = res.data.data;
                this.bcjcForm.ultimateJudgement=this.bcjcRes.ultimateJudgement;
                this.bcjcForm.supplymentaryOpinion=this.bcjcRes.supplementaryOpinion;
              });
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
            this.getConsultByConsultId();
          }
        });
      }
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
    }
  }
};
</script>
<style>
.report .el-dialog__header {
  display: none;
}
.report .el-dialog__body {
  padding: 0px 20px;
}
</style>

<style>
.module {
  margin-top: 10px;
  background-color: white;
  border: 1px solid rgba(47, 58, 92, 0.1);
}
i {
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 10px;
}
li {
  margin-bottom: 20px;
}
.el-form-item {
  margin-bottom: 0px;
}
.slides {
  float: left;
  margin-right: 10px;
  width: 100px;
  height: 100px;
  background-color: red;
  margin-top: 10px;
}
.input-new-tag {
  width: 80px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-input-number input {
  width:130px;
}
.viewer-footer {
  display:none;
}
</style>
