<template>
    <div style="background-color:#f8f7f7;">
        <!-- <el-dialog @close="closeSelectExpert" @chosedExpert="chosedExpertFun" :visible.sync="ifSelectExpert" width="40%" title="选择专家">
        </el-dialog>  -->
        <div>
            <dialog-select-expert  :canVisible="ifSelectExpert" @chosedExpertFun="chosedExpertFun" :caseTypeId="info.caseTypeId"></dialog-select-expert>
        </div> 
        
        <layout-header pagename="申请会诊" :myInfo="myInfo" :isLogin="isLogin" @getUserInfo="getUserInfo"></layout-header>
        <el-row>
            <el-col :span="15" :push="2" style="margin-top:50px;font-size:14px;padding-left:20px;">
                首页 > 我的会诊列表 > 申请会诊
            </el-col>
        </el-row>
        <el-row>
        <el-col :span="15" :push="2" style="margin-top:20px;background-color:white;border:1px solid #e6e6e6;padding-bottom:30px;">
        <div style="margin-left:2.5%;margin-top:40px;width:95%;float:left;">
            <div class="floatLeft" :class="{done:done==1}">
                <span class="bigCircle">1</span>
                <div class="rectangle"><div @click="clear(null)">选择会诊方式</div></div>
            </div>
            <div class="floatLeft" :class="{done:done==2}">
                <span class="bigCircle">2</span>
                <div class="rectangle"><div @click="clear(2)">选择病理类型</div></div>
            </div>
            <div class="floatLeft" :class="{done:done==3}">
                <span class="bigCircle">3</span>
                <div class="rectangle"><div @click="clear(3)">填写申请表单</div></div>
            </div>
            <div class="floatLeft" :class="{done:done==4}">
                <span class="bigCircle">4</span>
                <div class="rectangle"><div @click="clear(4)">提交订单</div></div>
            </div>
        </div>
        <div style="margin-top: 40px;width:95%;float:left;margin-left:2.5%;">
            <el-row v-if="done==1">
                <el-row>
                <el-col :span="4" :push="3*(index+1)" v-for="(slideTypeInfo,index) in slideTypesInfo" :key="slideTypeInfo.index">
                    <img :src="slideTypeInfo.icon" width="125" height="125" @click="changeSlideType(slideTypeInfo)">
                    <p style="margin-top:20px;margin-left:17px;">{{slideTypeInfo.title}}</p>
                </el-col>
                </el-row>
                温馨提示
                <div style="border:0.5px solid #ebebeb;margin:10px 0px;"></div>
                <div style="font-size:12px;">
                数字切片会诊：
仅限与平台做过对接的扫描设备，支持与麦克奥迪，江丰，优纳等厂商设备对接，并支持上传Aperio，罗氏，滨松，3D histech等厂家格式的切片；快速扫描切片上传，专家移动会诊，降低会诊时长。
<br><br>
寄送切片会诊：
寄送病理切片及其他临床病历至会诊中心，经数字化后再进行会诊。</div>
            </el-row>
            <el-row v-if="done==2">
                <el-col :span="4" :push="3*(index+1)" v-for="(caseTypeInfo,index) in caseTypesInfo" :key="caseTypeInfo.index">
                    <div v-if="!(caseTypeInfo.caseType == '303' && info.slideType == '1')">
                        <img :src="caseTypeInfo.icon" width="125" height="125" @click="changeCaseType(caseTypeInfo)">
                        <p style="margin-top:20px;margin-left:17px;">{{caseTypeInfo.title}}</p>
                    </div>
                </el-col>
            </el-row>
            <el-row v-if="done==3">
                <el-col :push="2">
                <el-form :model="consultInfo" label-width="120px">
                    <el-row type="flex">
                        <div style="font-weight:normal;">患者信息</div>
                        <div style="color:#425b77;font-size:12px;margin-left:500px;line-height:21px;">送检医生：<span>{{myInfo.name}}</span></div>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-col :xs="10" :sm="8" :lg="12">
                            <el-form-item label="住院/门诊号：" prop="number">
                                <el-input v-model="consultInfo.paramId"  :maxlength="32" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row style="margin-top:20px;">
                        <el-col :xs="10" :sm="8" :lg="12">
                            <el-form-item label="患者姓名：" prop="name">
                                <el-input v-model="consultInfo.name"  :maxlength="32" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :xs="10" :sm="8" :lg="12">
                            <el-form-item label="性别：" prop="gender">
                                <el-radio v-model="consultInfo.sex" label="男">男</el-radio>
                                <el-radio v-model="consultInfo.sex" label="女">女</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :xs="10" :sm="8" :lg="12">
                            <el-form-item label="年龄：" prop="age">
                                <el-input  placeholder="请输入年龄" v-model="consultInfo.age" :maxlength="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :xs="10" :sm="8" :lg="12">
                            <el-form-item label="送检部位：" prop="position">
                                <el-input placeholder="请输入内容" v-model="consultInfo.parts"  :maxlength="11">
                                    <el-select v-model="consultInfo.subspecialityName" slot="prepend" placeholder="请选择" style="width: 120px" @change="changeBysubspecialityId">
                                        <el-option v-for="item in yzkList" :key="item.value" :label="item.name" :value="item.name"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row style="margin-top:20px;">
                        <el-col :xs="10" :sm="8" :lg="12">
                            <el-form-item label="联系电话：" prop="phone">
                                <el-input v-model="consultInfo.phone"  :maxlength="32" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row style="margin-top:20px;">
                        <el-col :xs="10" :sm="8" :lg="12">
                            <el-form-item label="临床诊断：" prop="clinicalDiagnosis">
                                <el-input v-model="consultInfo.clinicalDiagnosis"  :maxlength="32"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :xs="10" :sm="8" :lg="12">
                            <el-form-item label="病情介绍：">
                                <el-input v-model="consultInfo.casePresentation" type="textarea" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>原病理检查信息</el-row>

                    <el-row>
                        <el-col :xs="10" :sm="8" :lg="12">
                            <el-form-item label="原病理诊断：" prop="oldDiagnosis">
                                <el-input v-model="consultInfo.oldDiagnosis" :maxlength="256"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-form-item label="添加切片：" prop="slicePhotos">
                            <span>
							    <div class="slides" v-for="(item, index) in successSlidesInfo" :key="item.uuid" >
								    <img style="width:100px;height:100px;" :src="item.path">
                                    <i class="el-icon-delete" @click="deleteSlide(index)"></i>
							    </div>
							    <div class="upload floatLeft" @click="openFileSelect">
                                    <i class="el-icon-plus avatar-uploader-icon" style="font-size:20px;margin:40px;"></i>
							    </div>
						    </span>
                        </el-form-item>
                    </el-row>


                    <el-row>会诊信息</el-row>

                    <el-row>
                        <el-col :xs="10" :sm="8" :lg="12">
                            <el-form-item label="会诊目的：" prop="purpose">
                                <el-checkbox-group v-model="consultInfo.purpose">
                                    <el-checkbox v-for="item in purposes" :key="item.key" :label="item.key">{{item.value}}</el-checkbox>
                                </el-checkbox-group>
                            <el-input v-show="isotherpurpose" v-model="consultInfo.otherpurpose"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row type="flex" align="middle">
                        <el-form-item label="选择专家：" prop="exptPhoto">
						    <span @click="openSelectExpert">
							    <div v-if="chosedExpert.userId">
								    <img style="width:100px;height:100px;" src="../assets/img/default.jpg">
							    </div>
							    <div class="upload" v-else>
                                    <i class="el-icon-plus avatar-uploader-icon" style="font-size:20px;margin:40px;"></i>
							    </div>
						    </span>
                        </el-form-item>
            
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-col :xs="10" :sm="8" :lg="12">
                            <el-form-item label="备注:" prop="remake">
                                <el-input v-model="consultInfo.patientRemark"  :maxlength="32" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <div>
				    <el-button  @click="saveAndCommit('commit')">提交并支付</el-button>
				    <el-button @click="saveAndCommit('save')">保存</el-button>
			    </div>
                </el-col>
                
            </el-row>
        </div>
        
        </el-col>
        <el-col :span="5" :push="3" style="margin-top:20px;background-color:white;border:1px solid #e6e6e6;padding:30px;color:#415b77;font-size:20px">

             会诊流程
             <el-steps direction="vertical" :active="0" space="50px" style="margin-top:10px;">
                <el-step title="填写会诊申请单"></el-step>
                <el-step title="线上支付会诊费用"></el-step>
                <el-step title="专家阅片并编辑诊断意见"></el-step>
                <el-step title="打印报告"></el-step>
            </el-steps>
        </el-col>
        </el-row>
        <input type="file" name="file" id="file" style="display: none;" @change='uploads'>
        <div style="background-color:#374266;height:50px;margin-top:71px;width:100%;"></div>
    </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
    components: {
        layoutHeader: () => import("@/components/header"),
        dialogSelectExpert: () => import("@/components/selectExpert"),
    },
    computed: {
        'isotherpurpose': function() {
            if(!this.consultInfo.purpose.indexOf("其他")) {
                return true
            }
        }
    },
    data() {
        return{
            consultId:null,
            purposes: [
                {key: '明确诊断', value: '明确诊断'},
                {key: '治疗方案', value: '治疗方案'},
                {key: '手术', value: '手术'},
                {key: '其他', value: '其他'}
            ],
            done:1,
            info:{
                slideType:"",
                caseTypeId:"",
                caseTypeName:"",
            },
            myInfo: {},
            pagename: "个人中心",
            isLogin:false,
            successSlidesInfo:[],
            slideTypesInfo:[
                {icon:require("../assets/img/icon-digitalslice.png"),title:"数字切片会诊",slideType:"0"},
                {icon:require("../assets/img/icon-frozen.png"),title:"寄送切片会诊",slideType:"1"},
                {icon:require("../assets/img/icon-sendslice.png"),title:"冰冻预约会诊",slideType:"2"}
                ],
            caseTypesInfo:[
                {icon:require("../assets/img/icon-cgbl.png"),title:"常规病理会诊",caseType:"301"},
                {icon:require("../assets/img/icon-xbbl.png"),title:"细胞病理会诊",caseType:"302"},
                {icon:require("../assets/img/icon-szbd.png"),title:"术中冰冻会诊",caseType:"303"}
                ],
            yzkList : [
                {name:"头颈病理",value:"101"},{name:"乳腺病理",value:"102"},{name:"甲状腺病理",value:"103"},{name:"皮肤病理",value:"104"},
                {name:"神经系统",value:"105"},{name:"消化系统",value:"106"},{name:"呼吸系统",value:"107"},{name:"泌尿系统",value:"108"},
                {name:"内分泌系统",value:"109"},{name:"女性生殖系统",value:"110"},{name:"男性生殖系统",value:"111"},{name:"妇产科病理",value:"112"},
                {name:"软组织病理",value:"113"},{name:"骨和关节",value:"114"},{name:"淋巴造血系统",value:"115"},{name:"宫颈细胞",value:"116"},
                {name:"穿刺细胞",value:"117"},{name:"脱落细胞",value:"118"},{name:"其他",value:"119"}
                ],
            ifSelectExpert:false,
            chosedExpert:{},
            consultInfo : {
              purpose: [],
              otherpurpose: '',
              slideType : 1,
              consultStatus : 0,
              caseTypeId : '',
              caseTypeName : '',
              subspecialityName : '',
              subspecialityId: '',    //亚专科id
              paramId : '',
              name : '',
              parts: '',
              sex : '男',
              age : '',
              phone : '',
              clinicalDiagnosis : '',
              casePresentation : '',
              expertDoc : '',
              patientRemark: '',
              oldDiagnosis:'',
              applyDoc:''
            },
        }       
    },
     mounted() {
         this.getUserInfo();
         this.consultId=this.$route.query.consult_id;
         if(this.consultId!=null){
             axion.getConsultByConsultId({consultId:this.consultId,token:getCookie("token")}).then(res=>{

             });
         }
     },
     methods:{
        deleteSlide(val){
            this.successSlidesInfo.splice(val,1);
        },
        uploads(e){
            const file = e.target.files[0];
            let formData = new FormData();
            formData.append("file", file);
            axion.uploadPic(formData).then(res=>{
                // if(res.data.message)
                this.successSlidesInfo.push(res.data.data);
            });
        },
        openFileSelect() {
            document.querySelector('#file').click()
        },
        saveAndCommit(val){
            this.consultInfo.caseTypeId=this.info.caseTypeId;
            this.consultInfo.caseTypeName=this.info.caseTypeName;
            this.consultInfo.slideType=this.info.slideType;
            this.consultInfo.uploadSlidesList=this.successSlidesInfo;
            this.consultInfo.applyDoc=this.myInfo;
            if(val ==  'commit'){
                this.consultInfo.consultStatus = 2;

            }else if (val == 'save'){
                return;
                // this.consultInfo.consultStatus = 1;
            }
            console.log(this.consultInfo);
            axion.applyBlRequest(this.consultInfo,getCookie("token")).then(res=>{
                // console.log(res);
                if(res.data.code!="SUCCESS"){
                    return;
                }
                this.$router.push("/payOnline?consultId="+res.data.data);
            })
            
        },
        chosedExpertFun(item){
            if (item) {
                this.chosedExpert = item;
                this.consultInfo.expertDoc = item;
            }
            this.closeSelectExpert();
        },
        closeSelectExpert() {
            this.ifSelectExpert = false;
        },
        openSelectExpert() {
            this.ifSelectExpert = true
        },
        changeBysubspecialityId(obj){
            this.consultInfo.subspecialityId = obj.value;
        },
        changeSlideType(val) {
            this.info.slideType=val.slideType;
            this.changeDone();
        },
        changeCaseType(val) {
            this.info.caseTypeId=val.caseType;
            this.info.caseTypeName=val.title;
            this.changeDone();
        },
        changeDone(){
             if(this.info.caseTypeId == ""){
                 if(this.info.slideType != "2"){
                     this.done=2;
                 }else {
                     this.info.caseTypeId="302";
                     this.done=3;
                 }
                 return;
             }
             this.done=3;
         },
        clear(val){
            if(!val){
                this.done = 1;
                this.info.caseTypeId="";
                this.info.slideType = "";
                return;
            }
            this.done = val;         
        },
        getUserInfo() {
            var token = getCookie("token");
            if (token != null) {
                axion.getUserInfo({ token: getCookie("token") }).then(res => {
                 if(res.data.data!=null){
                    this.myInfo = res.data.data;
                    this.isLogin=true;  
                }
                });
            }
         },

     }
    
}
</script>

<style scoped>
.bigCircle {
    top: 0;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background: #fff;
    z-index: 2;
    float: left;
    font-size: 24px;
    color: #999;
    text-align: center;
    line-height: 52px;
    border: 2px white solid;
    background-color: #f4f4f4;
}
.done {
    width: 24.4%;
}
.done .bigCircle {
    color: #fff;
    background: #008BFD;
}
.done .rectangle div{
    color: #fff;
    background: #008BFD;
    height: 44px;
    line-height: 44px;
    padding-left: 50px;
    margin: 5px;
    font-size: 12px;
}
.done .rectangle {
    margin-left: 33px;
    margin-right: -20px;
}
.rectangle div{
    font-size: 12px;
    height: 44px;
    line-height: 44px;
    padding-left: 50px;
    margin: 5px;
}
.rectangle {
    margin-left: 33px;
    margin-right: -20px;
    background-color: #f4f4f4;
}
.floatLeft {
    width: 24.4%;
}
.upload {
    width:100px;
    height:100px;
    border:1px dashed #ccc;
    cursor:pointer;  
}
.upload:hover {
    border:1px dashed #1d68ca;
}
/* .slides .delete {
    display: none;
} */
.slides:hover .el-icon-delete{
    display: block;
}
.el-icon-delete {
    display: none;
    margin-left: 80px;
    margin-top: -110px;
}
.slides {
    float:left;
    margin-right:10px;
    width:100px;
    height:100px;
    background-color:red;
}
.is-process{
    font-size: 14px;
}
</style>

