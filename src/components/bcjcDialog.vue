<template>
    <div v-loading="loading">
        <el-dialog title="选择地址" :visible.sync="editAddress" append-to-body width="30%">
            <div style="overflow-y:scroll;height:240px;">
                <div v-for="(item,index) in addressList" :key="index" style="border-bottom:1px dashed  #e6e6e6;height:80px;margin:0 auto;">
                        <br><i class="iconfont" @click="dosth(item)">&#xe6c1;{{item.province}}{{item.city}}{{item.address}}</i><br>
                            <i class="iconfont" @click="dosth(item)">&#xe663;{{item.name}}</i>&nbsp;&nbsp;&nbsp;
                            <i class="iconfont" style="float:right;margin-right:120px;">&#xe60d;{{item.phone}}</i><br>
                            <el-radio style="font-size:120x;" v-model="radio" :label="item.id">设置为默认地址</el-radio>
                </div>
                
            </div>
        <el-button style="width:100%;margin:20px auto;" @click="addAddress=true;"><i class="iconfont">&#xe61e;</i>&nbsp;&nbsp;新增寄件地址</el-button>
        </el-dialog>

        <el-dialog class="addAddress" title="新增地址" :visible.sync="addAddress" append-to-body width="30%">
            <el-form  label-width="80px">
                <el-form-item label="所在地" required style="margin-bottom:0px;">
                    <v-distpicker :province="form.province" :city="form.city" :area="form.area" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
                </el-form-item>

                <el-form-item label="详细地址" required style="margin-bottom:0px;">
                    <el-input v-model="form.address"  size="mini"></el-input>
                </el-form-item>

                <el-form-item label="联系人" required style="margin-bottom:0px;">
                    <el-input v-model="form.name"  size="mini"></el-input>
                </el-form-item>

                <el-form-item label="联系电话" required style="margin-bottom:10px;">
                    <el-input v-model="form.phone"  size="mini"></el-input>
                </el-form-item>

                <div style="height:40px;margin-left:50%;" class="dialog-footer">
                    <el-button @click="addAddress = false" size="mini">取 消</el-button>
                    <el-button type="primary" size="mini" @click="addAddress1">确 定</el-button>
                </div>


            </el-form>
        </el-dialog>

        <el-tabs v-model="activeName">
            <el-tab-pane label="送检申请" name="first">
                <el-form>
                    <el-form-item label="建议补充检查的项目：" required style="margin-bottom:0px;">
                        <span style="font-weight:bold;">{{res.immuneTag}}</span>
                    </el-form-item>
                </el-form>
                <div style="margin-left:10px;">
                    建议寄送白片<span style="font-weight:bold;">{{res.materialNum}}</span>张;
                    <span v-if="res.isCandle==1">建议寄送蜡块;</span>
                </div>
                <el-row style="margin-top:50px;">
                    <el-col :span="10" :push="1">
                        寄件信息 <span style="color:#3060a1;cursor:pointer;" @click="addressClick">切换地址</span>
                        <div v-if="selectAddress" style="margin-top:10px;border:1px solid #ebebeb;height:100px;padding:10px;">
                            <br><i class="el-icon-location-outline">{{selectAddress.province}}{{selectAddress.city}}{{selectAddress.address}}</i><br><br>
                            <i class="iconfont">&#xe663;</i>{{selectAddress.name}}&nbsp;&nbsp;&nbsp;
                            <i class="iconfont">&#xe60d;</i>{{selectAddress.phone}}
                        </div>
                        <div v-else style="margin-top:10px;border:1px solid #ebebeb;height:100px;padding:10px;text-align:center;line-height:100px;">
                            <i class="iconfont" style="font-size:40px;" @click="addAddress=true;">&#xe61e;</i>
                        </div>
                    </el-col>
                    <el-col :span="10" :push="2">
                        收件信息
                        <div style="margin-top:10px;border:1px solid #ebebeb;height:100px;padding:10px;">
                            <br><i class="el-icon-location-outline">杭州市江干区天城路68号万事利大厦A座8楼</i><br><br>
                            <i class="iconfont">&#xe663;</i>病理会诊中心&nbsp;&nbsp;&nbsp;
                            <i class="iconfont">&#xe60d;</i>17826863260
                        </div>
                    </el-col>
                </el-row>
                <div style="margin:20px;width:30%;">
                    <el-button type="primary" @click="confirm(false)">提交</el-button>
                </div>
            </el-tab-pane>



            <el-tab-pane class="slidesForm" label="添加切片" name="second" >
                <el-form label-width="100px">
                    <el-form-item label="监察机构：" required>
                        <el-input v-model="slideForm.censorate"  size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="添加切片：" required>
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
                    <el-form-item class="fuzf" label="专家补充检查项:" required label-width="200px;">
                        <span style="color:#409EFF;">{{res.immuneTag}}</span>
                    </el-form-item>
                    <el-form-item label="初步判定：" required>
                        <el-input v-model="slideForm.initialJudgement"  size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" required>
                        <el-input v-model="slideForm.remark"  size="mini"></el-input>
                    </el-form-item>
                </el-form>
                <div style="margin:20px;width:30%;">
                    <el-button type="primary" @click="confirm(true)">提交</el-button>
                </div>

            </el-tab-pane>
        </el-tabs>
        <input type="file" name="file" id="file" style="display: none;" @change='uploads'>
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
            slideForm:{
                censorate:"",
                initialJudgement:"",
                remark:"",
                uploadSlidesList:"",
            },

            form: { 
                province: '',
                city: '', 
                area: '',
                address:'',
                name:'',
            },
            addAddress:false,
            radio:0,
            res:'',
            activeName:"first",
            loading:true,
            selectAddress:null,
            editAddress:false,
            addressList:[],
            successSlidesInfo:[],
        }
    },
    components: { VDistpicker },
    watch:{
        radio:function(){
            axion.editDefault({addressId:this.radio});
        },
    },
    props:["clickItem"],
    methods:{
        
        confirm(val){
            debugger;
            if(val){
                this.slideForm.isCandel=this.res.isCandel;
                this.slideForm.materialNum=this.res.materialNum;
                this.slideForm.uploadSlidesList=this.successSlidesInfo;
                this.slideForm.consult_id=this.clickItem;
                axion.setBCJCByConsultId(this.slideForm).then(res=>{
                    if(res.data.code=="SUCCESS"){
                        this.$message({
                            type: "info",
                            message: res.data.data
                        });
                        this.$emit("successClose");
                    }
                });
            }else{
                axion.applyBCJCByExpress({consultId:this.clickItem,addressId:this.selectAddress.id}).then(res=>{
                    if(res.data.code=="SUCCESS"){
                        this.$router.push("payOnline?consultId="+this.clickItem+"&doctorType=0)");
                    }
                })

            }
        },
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
        onChangeProvince(data) {
        this.form.province = data.value
        },
        onChangeCity(data) {
        this.form.city = data.value
        },
        onChangeArea(data) {
        this.form.area = data.value
        },
        addAddress1(){
            this.form.token=getCookie("token");
            axion.editAddress(this.form).then(res=>{
                this.addAddress=false;
                if(res.data.code="SUCCESS"){
                    this.$message({
                    type: "info",
                    message: `添加成功!`
                  });
                  if(!this.selectAddress){
                      this.getAddress();
                  }
                  axion.getAddress().then(res=>{
                    if(res.data.code=="SUCCESS"&&res.data.data){
                    this.addressList=res.data.data;
                    this.radio=this.addressList[0].id;
                    }
                });
                }else {
                    this.$message({
                    type: "info",
                    message: `添加失败!`
                });
                }
            });
        },
        dosth(val){
            this.selectAddress=val;
            this.editAddress=false;
        },
        getAddress(){
            axion.getAddress().then(res=>{
                if(res.data.code=="SUCCESS"){
                    if(res.data.data){
                        this.selectAddress=res.data.data[0];
                    }
                }else {

                }
            });
        },
        addressClick(){
            this.editAddress=true;
            axion.getAddress().then(res=>{
                if(res.data.code=="SUCCESS"&&res.data.data){
                    this.addressList=res.data.data;
                    this.radio=this.addressList[0].id;
                }
            });
        },
        init(){
           this.loading=true;
           this.getAddress();
           axion.getDiagnoseDetail({consultId:this.clickItem,token:getCookie("token")}).then(res=>{
               this.res=res.data.data;
               this.loading=false;
           })
        }
    }
}
</script>
<style>
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
    background-color:red;
}
.fuzf label {
    width:132px;
}
</style>



