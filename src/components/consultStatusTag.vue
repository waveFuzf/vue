<template>
    <div>
        <div id="jianjiao"></div>
        <div class="Tag">{{consultStatuss[consultStatus.consultStatus]}}</div>
        <div class="background" v-if="doctorType==0">
            {{consultStatus.consultStatus!=3?typeZeroTags[consultStatus.consultStatus]:typeZeroTags[consultStatus.consultStatus][index]}}
            <div v-if="(!mailInfo.mailPdf)&&consultStatus.consultStatus==3" class="upload floatRight" style="margin:10px;" @click="openFileSelect">
                <i class="el-icon-plus avatar-uploader-icon" style="font-size:20px;margin:40px;"></i>
		    </div>
            <div v-if="mailInfo.mailPdf&&consultStatus.consultStatus==3" class="upload floatRight" style="margin:10px;border:0px;">
                <viewer>
                    <img :src="mailInfo.mailPdf" style="width:100px;height:100px;" key="快递单">
	            </viewer>
                
            </div>
        </div>
        <div class="background" v-if="doctorType==1">{{typeOneTags[consultStatus.consultStatus]}}</div>
        <el-dialog
      title="添加邮寄信息"
      :visible.sync="editMailInfo"
      width="30%"
      @close="editMailInfo=false;"
    >
    <el-form ref="form" label-width="80px" size="mini" style="width:80%;">
        <el-form-item label="快递公司">
          <el-select v-model="form.mailCompany" filterable placeholder="请选择快递公司">
            <el-option v-for="item in options" :key="item" :label="item" :value="item">
            </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="快递编号">
          <el-input v-model="form.mailCode"></el-input>
        </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editMailInfo=false;">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
        <input type="file" name="file" id="file" style="display: none;" @change='uploads'>
    </div>
</template>


<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
import '@/assets/css/default.css';
export default {
  data() {
    return {
        mailInfo:{},
        form:{
            mailCode:"",
            mailCompany:"",
        },
        index:0,
        options: ["圆通快递","韵达快递","中通速递","顺丰速运","百世汇通","申通快递","德邦快递","EMS"],
        editMailInfo:false,
        typeZeroTags:['','','请及时支付...',['请及时上传快递单号...','请及时填写快递信息...','等待管理员收货并上传切片'],"您的病理切片正在等待专家会诊，请稍后等待...",'订单已退回.','诊断完成,如有疑问,请及时咨询会诊医生.','订单已取消.','请及时填写补充检查信息...','您的病理切片正在等待专家二次会诊，请稍后等待...'],
        typeOneTags:['','','','等待管理员收货并上传切片...',"病理切片正在等待专家会诊，请尽快处理...",'','已完成诊断,等待申请医生验收...','','等待申请医生填写补充检查信息...','补充检查信息已提交，请尽快处理...'],
        consultStatuss:['','待提交','待支付','待收货','待诊断','已退回','已诊断','已取消','待补充','待二次诊断'],
    };
  },
  props:["consultStatus","doctorType"],
   watch:{
      consultStatus:function(){
          if(this.consultStatus.consultStatus==3&&this.doctorType==0){
          var type;
          type=this.consultStatus.supplementSlideType==2?1:0;
          axion.getAddressByConsultId({consultId:this.consultStatus.consult_id,type:type}).then(res=>{
              this.mailInfo=res.data.data;
              if(this.mailInfo.mailNumber&&this.mailInfo.mailCompany){
                  this.index=2
              }else if(this.mailInfo.mailPdf){
                  this.index=1;
                  this.editMailInfo=true;
              }
          })
      }
    
      }
  },
  methods: {
      confirm(){
          this.form.address_id=this.mailInfo.addressId;
          axion.editMailInfo(this.form).then(res=>{
              this.editMailInfo=false;
              this.index=2;
          })
      },
      openFileSelect() {
            document.querySelector('#file').click()
      },
      uploads(e){
            const file = e.target.files[0];
            let formData = new FormData();
            formData.append("file", file);
            axion.uploadExpress(formData,this.consultStatus.consult_id,1).then(res=>{
                if(res.data.code="SUCCESS"){
                    this.mailInfo.mailPdf=res.data.data;
                    this.editMailInfo=true;
                }
            });
        },
  }
};
</script>

<style>
.upload {
    width:100px !important;
    height:100px !important;
    border:1px dashed #ccc;
    cursor:pointer;
    line-height: 0px;
}
.upload:hover {
    border:1px dashed #1d68ca;
}
/* #FF6565 */
.Tag {
    z-index: 10;
    position: relative;
    background-color: #e96769;
    width: 120px;
    height: 40px;
    border-radius: 3px;
    box-shadow: 2px 2px 2px #ebebeb;;
    border-top-left-radius: 0px;
    color: white;
    text-align: center;
    line-height: 40px;
}
#jianjiao {
    position: relative;
    z-index:10;
    height:0;
    width:0;
    overflow: hidden;
    font-size: 0;
    line-height: 0;
    border-color:white #c52222 transparent transparent;
    border-style:solid solid dashed dashed;
    border-width:4px 8px 0 0 ;
}
.background{
    padding-left: 25px;
    z-index: 5;
    position: relative;
    width: 95%;
    height:120px;
    background-color: #f8f7f7;
    margin-left: 8px;
    margin-top: -60px;
    border:1px solid #ebebeb;
    line-height: 180px;
    color: #425b77;
}
.el-dialog__body {
    padding: 0 20px;
}
</style>

