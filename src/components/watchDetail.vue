<template>
    <div v-loading="loading">
        <el-collapse style="width:100%;border-top:0px;padding-bottom:20px;" v-model="activeNames" class="emmm">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="el-icon-document" style="margin-left:20px;">申请单</i>
            </template>
            <div style="width:90%;margin-bottom:0px;height:320px;">
              <img style="float:left;" width="10%" src="../assets/img/default.jpg">
              <div style="color:#425b77;font-size:14px;margin-top:15px;margin-left:15px;" class="floatLeft">
                {{clickItem.consultPatient.patientName}}&nbsp;&nbsp;&nbsp;&nbsp;
                {{clickItem.consultPatient.sex}}&nbsp;&nbsp;&nbsp;&nbsp;
                {{clickItem.consultPatient.age}}
                <br>
                <br>
                {{clickItem.caseTypeName}}
              </div>
              <div v-if="clickItem.consultStatus==10||clickItem.consultStatus==5" style="color:#425b77;font-size:14px;margin-top:15px;margin-left:15px;" class="floatRight">
                  退回理由：<span style="color:red;">{{clickItem.reason}}</span>
              </div>
              <div v-if="clickItem.consultStatus==11||clickItem.consultStatus==7" style="color:#425b77;font-size:14px;margin-top:15px;margin-left:15px;" class="floatRight">
                  取消理由：<span style="color:red;">{{clickItem.reasonCancel}}</span>
              </div>
              <div class="floatLeft" style="width:100%;">
                <el-row>
                  <el-col :span="12">
                    <el-form label-width="120px">
                      <!-- <el-form-item label="原病理号：">{{patientInfo.mzNum}}</el-form-item> -->
                      <el-form-item label="临床诊断：">{{clickItem.clinicalDiagnosis}}</el-form-item>
                      <el-form-item label="会诊目的：">{{clickItem.purpose}}</el-form-item>
                      <el-form-item label="病情介绍：">{{clickItem.casePresentation}}</el-form-item>
                    </el-form>
                  </el-col>
                  <el-col :span="12">
                    <el-form label-width="120px">
                      <!-- <el-form-item label="住院号/门诊号：">{{patientInfo.mzNum}}</el-form-item> -->
                      <el-form-item label="原病理诊断：">{{clickItem.oldDiagnosis}}</el-form-item>
                      <el-form-item label="备注：">{{clickItem.remake}}</el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
                <el-row style="margin-left:38px;">
                  <el-col :span="20">
                    <el-form>
                      <el-form-item label="病理切片：" label-width="120px;">
                        <div
                          class="slides"
                          v-for="(item) in hzSlides"
                          :key="item.uuid"
                          v-if="item.type==0"
                        > <viewer :images="hzSlides">
                          <img style="width:100px;height:100px;" :src="item.clientSlidePath">
                          </viewer>
                        </div>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
              </div>

            </div>
          </el-collapse-item>
           <el-collapse-item v-if="[6,8,9].indexOf(clickItem.consultStatus)>=0||clickItem.supplementSlideType==2" name="2">
            <template slot="title">
              <i class="el-icon-document" style="margin-left:20px;">会诊报告</i>
            </template>
            <div style="width:90%;margin-bottom:0px;">
              <el-row>
                <el-col>
                  <el-form label-width="120px">
                    <el-form-item label="镜下所见：">{{res.mirrorView}}</el-form-item>
                    <el-form-item label="专家意见：">{{res.diagnose}}</el-form-item>
                    <el-form-item label="切片质量：">{{slideEstimates[res.slideEstimate-1]}}</el-form-item>
                    <el-form-item label="出诊质量：">{{diagnosisEstimates[res.diagnosisEstimate-1]}}</el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
          <el-collapse-item v-if="[6,9].indexOf(clickItem.consultStatus)>=0 && !!clickItem.supplementSlideType" name="3">
            <template slot="title">
              <i class="el-icon-document" style="margin-left:20px;">补充检查信息</i>
            </template>
            <div style="width:90%;margin-bottom:0px;">
              <el-row>
                <el-col>
                  <el-form label-width="120px">
                    <el-form-item label="补充切片：">
                      <div
                          class="slides"
                          v-for="(item) in hzSlides"
                          :key="item.uuid"
                          v-if="item.type==1"
                        > <viewer :images="hzSlides">
                          <img style="width:100px;height:100px;" :src="item.clientSlidePath">
                          </viewer>
                        </div>
                    </el-form-item>
                    <el-form-item label="补充检查项：">{{res.immuneTag}}</el-form-item>
                    <el-form-item v-if="clickItem.supplementSlideType==1" label="初步判定：">{{bcjcRes.initialJudgement}}</el-form-item>
                    <el-form-item v-if="clickItem.supplementSlideType==1" label="备注：">{{bcjcRes.remarkDoctor}}</el-form-item>
                    <el-form-item label="结果判定：" v-if="clickItem.consultStatus==6" style="margin-top:10px;">
                        {{bcjcRes.ultimateJudgement}}
                    </el-form-item>
                    <el-form-item label="补充意见：" v-if="clickItem.consultStatus==6" style="margin-top:10px;">
                        {{bcjcRes.supplementaryOpinion}}
                    </el-form-item>
                    </el-form>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
          <el-collapse-item name="4" v-if="clickItem.consultStatus==6">
              <template slot="title">
                <i class="iconfont" style="margin-left:20px;font-size:12px">&#xe61f;评价</i>
              </template>
              <div style="width:90%;margin-bottom:0px;">
              <el-row>
              <el-col>
              <el-form label-width="120px">
                  <el-form-item label="评价：">
                      <span v-if="evaluate.evaluateText">{{evaluate.evaluateText}}</span>
                      <span v-else>暂无任何评价</span>
                  </el-form-item>

                  <el-form-item label="评分：" v-if="evaluate.evaluateText">
                      <div style="height:40px;"><span style="float:left;">整体性评价：</span><el-rate v-model="evaluate.evaluateWhole" show-text :texts=rates disabled></el-rate></div>
                      <div style="height:40px;"><span style="float:left;">专业性评价：</span><el-rate v-model="evaluate.evaluateProfession" show-text :texts=rates disabled></el-rate></div>
                      <div style="height:40px;"><span style="float:left;">及时性评价：</span><el-rate v-model="evaluate.evaluateIntime" show-text :texts=rates disabled></el-rate></div>
                  </el-form-item>

                  <el-form-item v-if="evaluate.evaluateText">
                      <el-switch v-model="value" :active-text="value?'公开':'隐藏'"></el-switch>
                  </el-form-item>
              </el-form>
              </el-col>
              </el-row>
              </div>
              
          </el-collapse-item>
          <el-collapse-item name="5" v-if="type!=3&&!(clickItem.consultStatus==6&&clickItem.isSettlement==1)">
              <template slot="title">
                <i class="iconfont" style="margin-left:20px;font-size:13px;">&#xe70f;操作</i>
              </template>
              <el-button v-if="clickItem.consultStatus==10" @click="dosthElse(true)">同意退回</el-button>
              <el-button v-if="clickItem.consultStatus==10" @click="dosthElse(false)">取消退回</el-button>
              <el-button v-if="clickItem.consultStatus==6&&!(clickItem.isSettlement==1)" @click="dosth(true)">结算通过</el-button>
              <el-button v-if="clickItem.consultStatus==6&&clickItem.isSettlement==null" @click="dosth(false)">结算不通过</el-button>
          </el-collapse-item>
        </el-collapse>
    </div> 
</template>
<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
import VDistpicker from 'v-distpicker'
import "@/assets/css/iconfont.css";
import "@/assets/css/default.css"
export default {
    data(){
        return{
            rates:["非常不满意", "不满意", "一般", "非常满意", "满意"],
            evaluate:{},
            loading:true,
            successSlidesInfo:[],
            res:[],
            activeNames:["1"],
            hzSlides:[],
            slideEstimates: ["质量不合格", "质量基本合格", "质量合格", "质量优秀"],
            diagnosisEstimates: ["诊断不正确","诊断基本正确","诊断完全正确","诊断不明确"],
            bcjcRes:[],
            value:true,
        }
    },
    props:["clickItem","type"],
    methods:{
        dosthElse(flag){
            axion.backToUnDiagnose({consult_id:this.clickItem.consult_id,type:flag}).then(res=>{
                if(res.data.code=="SUCCESS"){
                    this.$message({
                            type: "info",
                            message: `操作成功!`
                        });
                }else {
                    this.$message({
                            type: "info",
                            message: `操作失败!`
                        });
                }
                this.$emit("adminGetConsultList");
            })
        },
        dosth(flag){
            axion.isSettlement({consult_id:this.clickItem.consult_id,type:flag}).then(res=>{
                if(res.data.code=="SUCCESS"){
                    this.$message({
                            type: "info",
                            message: `操作成功!`
                        });
                }else {
                    this.$message({
                            type: "info",
                            message: `操作失败!`
                        });
                }
                this.$emit("adminGetConsultList");
            })
        },
        changeLoading(){
            this.loading=true;
            if(this.value!=(this.evaluate.evaluateStatus==0?true:false)){
                axion.evaluateShowToggle({status:this.value,evaluateId:this.evaluate.evaluate_id}).then(res=>{
                    console.log("我变了");
                })
            }
        },
        init(){
           this.loading=true;
           if(this.clickItem.consultStatus==6){
                 axion.selectEvaluateByConsultId({consultId:this.clickItem.consult_id}).then(res=>{
                    this.evaluate=res.data.data?res.data.data:{};
                    this.value=this.evaluate.evaluateStatus==0?true:false;
                 })
            }
           axion.getDiagnoseDetail({consultId:this.clickItem.consult_id,token:getCookie("token")}).then(res=>{
               this.res=res.data.data;
               this.loading=false;
           });
           axion.getSlidesByConsultId({consult_id:this.clickItem.consult_id}).then(res=>{
               this.hzSlides=res.data.data;
           });
           if ((this.clickItem.consultStatus == 9||[1,2].indexOf(this.clickItem.supplementSlideType)>=0)&&this.clickItem.consultStatus!=3) {
            axion
              .getBCJCsectionByConsId({ consult_id: this.clickItem.consult_id })
              .then(res => {
                this.bcjcRes = res.data.data;
              });
          }
        }
    }
}
</script>
<style scoped>
.el-rate{
    width:50%;
    float: left;
    line-height: 2.5;
}
.el-form-item {
    margin-bottom: 0px;
}
.slides {
  float: left;
  margin-right: 10px;
  width: 100px;
  height: 100px;
  margin-top: 10px;
}
</style>



