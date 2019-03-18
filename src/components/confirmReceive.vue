<template>
    <div v-loading="loading">
        <el-row>
            <el-col :span="14">
            <el-form label-width="120px">
                    <el-form-item label="病理编号：">
                        {{clickItem.consultNo}}
                    </el-form-item>
                    <el-form-item label="添加切片：">
                        <span>
							<div class="slides" v-for="(item, index) in successSlidesInfo" :key="item.uuid" >
								<img style="width:50px;height:50px;" :src="item.path">
                                <i class="el-icon-delete delete" @click="deleteSlide(index)"></i>
							</div>
							<div class="upload floatLeft" @click="openFileSelect">
                                <i class="el-icon-plus avatar-uploader-icon" style="font-size:20px;margin:15px;"></i>
							</div>
						</span>
                    </el-form-item>
                    <el-form-item class="fuzf" label="建议补充检查：">
                        {{res.immuneTag}}
                    </el-form-item>
                    <el-form-item label="建议寄送内容：">
                        建议寄送白片<span style="font-weight:bold;">{{res.materialNum}}</span>张;
                                <span v-if="res.isCandle==1">建议寄送蜡块;</span>
                    </el-form-item>
                    <el-form-item label="寄件信息：">
                        {{addressInfo.mailProvince}}{{addressInfo.mailCity}}{{addressInfo.mailAddress}}<br>
                        <span style="font-weight:bold;">{{addressInfo.mailName}}&nbsp;寄</span><br>
                        {{addressInfo.mailCompany}}---{{addressInfo.mailNumber}}
                    </el-form-item>
                </el-form>
                <input type="file" name="file" id="file" style="display: none;" @change='uploads'>
                </el-col>
                <el-col :span="10">
                    <viewer>
                    <img :src="addressInfo.mailPdf" style="width:220px;height:auto;">
                    </viewer>
                </el-col>
                <el-button type="primary" @click="confirm()">确 定</el-button>
        </el-row>
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
            loading:true,
            successSlidesInfo:[],
            res:[],
            addressInfo:[],
        }
    },
    props:["clickItem"],
    methods:{
        confirm(){
            var form=[];
            form.consult_id=this.clickItem.consult_id;
            form.type=1;
            form.uploadList=JSON.stringify(this.successSlidesInfo);
            axion.confirmRecevie(form).then(res=>{
                if(res.data.data=="good job!"){
                    this.$message.success("上传成功!");
                    this.$emit("adminGetConsultList")
                }
            })
        },
        changeLoading(){
            this.loading=true;
        },
        deleteSlide(val){
            this.successSlidesInfo.splice(val,1);
        },
        uploads(e){
            const file = e.target.files[0];
            let formData = new FormData();
            formData.append("file", file);
            axion.uploadPic(formData).then(res=>{
                this.successSlidesInfo.push(res.data.data);
            });
        },
        openFileSelect() {
            document.querySelector('#file').click()
        },
        init(){
           this.loading=true;
           axion.getDiagnoseDetail({consultId:this.clickItem.consult_id,token:getCookie("token")}).then(res=>{
               this.res=res.data.data;
               this.loading=false;
           })
           axion.getAddressByConsultId({consultId:this.clickItem.consult_id,type:this.clickItem.supplementSlideType==2?1:0}).then(res=>{
               this.addressInfo=res.data.data;
           })
        }
    }
}
</script>
<style scoped>
.distpicker-address-wrapper select{
    padding: 0;
    font-size: 12px;
    width: 80px;
    height: 30px;
}
.el-input--mini {
    width: auto;
}
.el-input--mini input {
    width: 200px;
}
.el-radio__label {
    font-size: 12px;
}
.upload {
    width:50px !important;
    height:50px !important;
    border:1px dashed #ccc;
    cursor:pointer;  
}
.upload:hover {
    border:1px dashed #1d68ca;
}
.slides:hover .delete{
    display: block;
}
.delete {
    display: none;
    margin-left: 35px;
    margin-top: -60px;
}
.slides {
    float:left;
    margin-right:10px;
    width:50px;
    height:50px;
}
.fuzf label {
    width:132px;
}
</style>



