<template>
    <div>
        <el-row style="width:800px;">
            <el-button style="width:10%;float:right;" type="primary" @click="editHospital=true;"><i class="iconfont">&#xe61e;</i>&nbsp;&nbsp;新增</el-button>
        </el-row>
        <el-row v-for="(item,index) in hospitals" :key="item.hohospitalId" style="width:800px;height:120px;border-bottom:1px solid #cec5c5;">
            <el-col :span="4" style="margin:20px;">
                <img :src="item.footLogo" style="width:80px;" class="floatLeft">
            </el-col>
            <el-col :span="6" style="margin-top:20px;">
                <el-form label-width="80px">
                    <el-form-item label="机构代码" style="margin-bottom:0px;height:40px;">
                        {{item.hospitalId}}
                    </el-form-item>
                    <el-form-item label="医院全称" style="margin-bottom:0px;height:40px;">
                        {{item.name}}
                    </el-form-item>
                    
                </el-form>
            </el-col>
            
            <el-col :span="10" style="margin-top:20px;">
                <el-form label-width="80px">
                    <el-form-item label="行政区域" style="margin-bottom:0px;height:40px;">
                        {{item.address}}
                    </el-form-item>                
                    <el-form-item label="联系方式" style="margin-bottom:0px;height:40px;">
                        {{item.tel}}
                        <span class="edit"  @click="deleteHospital(item,index)">删除</span>
                        <span class="edit"  @click="change(item)" style="margin-right:30px;">修改</span>
                    </el-form-item> 
                </el-form>

            </el-col>
        </el-row>

        <el-dialog :title="title" :visible.sync="editHospital" width="40%">
            <el-form label-width="120px">
                <el-form-item label="机构代码" required>
                    <el-input v-model="hospitalInfo.hospitalId" size="mini" style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="医院全称" required>
                    <el-input v-model="hospitalInfo.name" size="mini" style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="行政区域" required>
                    <el-input v-model="hospitalInfo.address" size="mini" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" required>
                    <el-input v-model="hospitalInfo.tel" size="mini" style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="医院logo">
                     <div class="upload" @click="openFileSelect">
                            <i v-if="!this.hospitalInfo.footLogo" class="el-icon-plus avatar-uploader-icon" style="font-size:20px;margin:40px;"></i>
                            <img v-else :src="hospitalInfo.footLogo" style="width:100px;height:100px;">
					 </div>
                </el-form-item>

                <el-button @click="saveHospital" v-if="!hospitalInfo.id">添加</el-button>
                <el-button @click="updateHospital" v-else>更新</el-button>
                <input type="file" name="file" id="file" style="display: none;" @change='uploads'>

            </el-form>

        </el-dialog>



        
    </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
    components: {
       
    },
    data() {
        return{
           addHospital:false,
           hospitalInfo:{
               hospitalId:null,
               name:null,
               tel:null,
               address:null,
               footLogo:null,
           },
           demo:{
               hospitalId:null,
               name:null,
               tel:null,
               address:null,
               footLogo:null,
           },
           editHospital:false,
           title:'新增医院',
           hospitals:[],
           hospitalName:'',
           clickItem:[],
        }       
    },
     mounted() {
         this.init();
         
     },
     methods:{
         change(val){
            this.editHospital=true;
            this.hospitalInfo=val;
         },
         updateHospital(){
             axion.updateHospital(this.hospitalInfo).then(res=>{
                if(res.data.code=="SUCCESS"){
                    this.$message.success("更新成功!");
                    this.init();
                    this.hospitalInfo=this.demo;
                    this.editHospital=false;
                }
             })
         },
         saveHospital(){
             axion.saveHospital(this.hospitalInfo).then(res=>{
                if(res.data.code=="SUCCESS"){
                    this.$message.success("添加成功!");
                    this.hospitals=this.hospitals.concat(this.hospitalInfo);
                    this.hospitalInfo=this.demo;
                    this.editHospital=false;
                }
             })
         },
         uploads(e){
            const file = e.target.files[0];
            let formData = new FormData();
            formData.append("file", file);
            axion.uploadPic(formData).then(res=>{
                // if(res.data.message)
                debugger;
                var path=res.data.data.path;
                if(path){
                    path="http://129.204.205.30:8080/logo/company.png";
                }
                this.hospitalInfo.footLogo=path;
            });
         },
         openFileSelect() {
             document.querySelector('#file').click()
         },
         edit(){
             this.editHospital=true;
             this.title='编辑医院'
         },
         deleteHospital(item,index){
             this.$confirm("确定删除该医院", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                callback: action => {
                    if(`${action}` == "confirm"){
                        axion.deleteHospital({hospitalId:item.hospitalId}).then(res=>{
                            debugger;
                            if(res.data.code=="SUCCESS"){
                                this.hospitals.splice(index,1);
                            }
                            this.$message({
                            type: "info",
                            message: res.data.data
                        });
                        })
                    }
                }
             });
         },
         init(){
             axion.getHospitals({hospitalName:this.hospitalName}).then(res=>{
                 this.hospitals=res.data.data;
             })
         }

     }
    
}
</script>

<style>
.edit {
    color:#1296db;
    cursor: pointer;
    float: right;
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
</style>

