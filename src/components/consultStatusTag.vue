<template>
    <div>
        <div id="jianjiao"></div>
        <div class="Tag">{{consultStatuss[consultStatus.consultStatus]}}</div>
        <div class="background" v-if="doctorType==0">{{typeZeroTags[consultStatus.consultStatus]}}
            <div class="upload floatRight" style="margin:10px;" @click="openFileSelect">
                <i class="el-icon-plus avatar-uploader-icon" style="font-size:20px;margin:40px;"></i>
		    </div>
        </div>
        <div class="background" v-if="doctorType==1">{{typeOneTags[consultStatus.consultStatus]}}</div>
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
        typeZeroTags:['','','请及时支付...','请及时上传快递单号...',"您的病理切片正在等待专家会诊，请稍后等待...",'订单已退回.','诊断完成,如有疑问,请及时咨询会诊医生.','订单已取消.','请及时填写补充检查信息...','您的病理切片正在等待专家二次会诊，请稍后等待...'],
        typeOneTags:['','','','等待管理员收货并上传切片...',"病理切片正在等待专家会诊，请尽快处理...",'','已完成诊断,等待申请医生验收...','','等待申请医生填写补充检查信息...','补充检查信息已提交，请尽快处理...'],
        consultStatuss:['','待提交','待支付','待收货','待诊断','已退回','已诊断','已取消','待补充','待二次诊断'],
    };
  },
  props:["consultStatus","doctorType"],
  methods: {
      openFileSelect() {
            document.querySelector('#file').click()
      },
      uploads(e){
            const file = e.target.files[0];
            let formData = new FormData();
            formData.append("file", file);
            debugger;
            axion.uploadExpress(formData,this.consultStatus.consult_id,0).then(res=>{
                
            });
        },
  }
};
</script>

<style>
.upload {
    width:100px;
    height:100px;
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
</style>

