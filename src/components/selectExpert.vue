<template>
<el-dialog @close="chosedExpertFun" :visible.sync="childVisible" width="550px" title="选择专家" top="5vh">
    <div>
        <div style="margin-top: -70px; margin-right: 40px;width:50%;float:right;">
            <el-input style="width: 100%" v-model.trim="expertName" placeholder="请输入专家姓名" @keyup.enter.native="searchExpertList">
            </el-input>
        </div>
        <ul style="height:350px;overflow-y:scroll;margin:0;padding:0px;" class="scroll-ui" v-scroll="loadMore">
            
            <li v-for="item in doctorsInfo" :key="item.userId" style="list-style:none;height:125px;">
                <div @click="chosedExpertFun(item)">
                    <el-col :span="4">
                        <img src="../assets/img/default.jpg" style="width:100%;" class="floatLeft">
                    </el-col>
                    <el-col :span="16" style="margin-top:20px;">
                        <span style="font-weight:bold;">{{item.name}}&nbsp;&nbsp;</span>
                        <span>{{item.position}}&nbsp;&nbsp;</span>
                        <span>{{item.hospitalName}}&nbsp;&nbsp;</span><br><br>
                        <span>擅长：{{item.description?item.description:"暂无擅长信息"}}</span>
                    </el-col>
                    <el-col :span="4" style="margin-top:20px;">
                        <span style="color:#ff9948;font-size:20px;">￥{{(item.price/100).toFixed(2)}}</span><br><br>
                        <span>会诊量：{{item.totalConsulation}}</span>
                    </el-col>
                </div>
            </li>
            <li style="text-align:center;"><div v-if="doctorsInfo.length==amount">没有更多数据</div></li>
        </ul>
    </div>
        </el-dialog>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
    props: {
        canVisible: {
            default: false,
            type: Boolean
        },
        caseTypeId:'',
    },
    data() {
        return{
            expertName:'',
            doctorsInfo:[],
            pageNo:1,
            canFetch: false,
            amount:'',
            childVisible: false,
        }       
    },
     mounted() {
        this.getExpertsInfo();
     },
     directives: {
        scroll: {
            bind: function (el, binding, vnode) {
                let scrollWrap = vnode.elm
                scrollWrap.addEventListener('scroll', function() {
                    if(scrollWrap.scrollTop + scrollWrap.clientHeight  >= scrollWrap.scrollHeight) {
                        binding.value();
                    }
                })
            }
        }
        },
     methods:{
        loadMore() {
            this.pageNo=this.pageNo+1;
            setTimeout(() => {
                if(this.expertName!=''&&this.doctorsInfo.length<this.amount){
                    axion.getExpertsInfoByName({name:this.expertName,pageNo:this.pageNo,caseTypeId:this.caseTypeId}).then(res=>{
                        this.doctorsInfo=this.doctorsInfo.concat(res.data.data);
                    })
                }else if(this.expertName == ''&&this.doctorsInfo.length<this.amount) {
                    axion.getExpertsInfo({pageNo:this.pageNo,caseTypeId:this.caseTypeId}).then(res=>{
                        this.doctorsInfo=this.doctorsInfo.concat(res.data.data);
                })
                }

            }, 500)
        },
        chosedExpertFun(item) {
            if (item) {
                this.$emit('chosedExpertFun', item)
            } else {
                this.$emit('chosedExpertFun')
            }
            this.doctorsInfo.length = 0
        },
        clearData() {
            this.doctorsInfo.length = 0
        },
        getExpertsInfo(){
            axion.getExpertsInfo({pageNo:this.pageNo,caseTypeId:this.caseTypeId}).then(res=>{
                this.doctorsInfo=res.data.data;
                this.amount=res.data.message;
            })
        },
        
         searchExpertList(){
             this.pageNo=1;
             if(this.expertName==''||this.expertName==null){
                 this.getExpertsInfo();
             }
             axion.getExpertsInfoByName({name:this.expertName,pageNo:this.pageNo,caseTypeId:this.caseTypeId}).then(res=>{
                  this.doctorsInfo=res.data.data;
                  this.amount=res.data.message;
             })

         }
     },
     watch: {
         canVisible(val) {
             this.childVisible  = this.canVisible
             if (val) {
                 this.pageNo = 1
                 this.getExpertsInfo()
             }
         }
     }
    
}
</script>
