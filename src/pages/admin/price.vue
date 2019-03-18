<template>
    <div>
        <el-tabs v-model="activeName" style="float:left;width:600px;">
            <el-tab-pane label="常规" name="301"></el-tab-pane>
            <el-tab-pane label="细胞" name="302"></el-tab-pane>
            <el-tab-pane label="冰冻" name="303"></el-tab-pane>
            <el-tab-pane label="补充检查" name="304"></el-tab-pane>
        </el-tabs>
        <el-button style="width:120px;" @click="addPrice">添加价格类型</el-button>
        <el-table
          class="price"
          :data="res"
          v-loading="loading"
          stripe
          style="width:700px;height:500px;"
        >
          <!-- <el-table-column prop="index" label="序号" width="53"></el-table-column> -->
          <el-table-column label="序号" width="80">
              <template slot-scope="scope">
                {{scope.$index+1}} 
              </template>
          </el-table-column>
          <el-table-column label="价格类型" width="150">
              <template slot-scope="scope">
                  <span v-if="!!scope.row.positionName&&scope.row.price_id">{{scope.row.positionName}}</span>
                  <el-select v-else v-model="scope.row.positionName" placeholder="请选择">
                    <el-option v-for="item in positions" :key="item.index" :label="item" :value="item"></el-option>
                  </el-select>
              </template>
          </el-table-column>
          <el-table-column  label="价格(元)" width="130">
              <template slot-scope="scope">
                  <span v-if="!scope.row.edit">{{(scope.row.price/100).toFixed(2)}}</span>
                  <input style="width:100px;height:20px;" v-model="scope.row.price" v-else> 
              </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
                <i class="iconfont" v-if="!scope.row.edit"  @click="edit(scope.$index)">&#xe64b;修改</i>
                <i class="el-icon-delete" v-if="!scope.row.edit"  @click="deletePrice(scope.$index,scope.row)">删除</i>
                <i class="iconfont" v-if="scope.row.edit"  @click="save(scope.row,scope.$index)">&#xe722;保存</i>
                <i class="iconfont" v-if="scope.row.edit" @click="edit(scope.$index)">&#xe723;取消</i>
            </template>
          </el-table-column>

        </el-table>

    </div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";
export default {
    components: {
       
    },
    watch:{
        activeName:function(){
            this.loading=true;
            axion.selectPriceList({priceTypeId:this.activeName}).then(res=>{
                this.res=res.data.data;
                this.res.forEach(v=>{  
                    v.edit=false;
                });
                this.loading=false;
            })
        }
    },
    data() {
        return{
           loading:true,
           activeName:"301",
           res:[],
           positions:["主任医师","副主任医师","主治医师","副主治医师","住院医师","执行医师","主任护师","副主任护师"],
        }       
    },
     mounted() {
         this.selectPriceList();
     },
     methods:{
         selectPriceList(){
            axion.selectPriceList({priceTypeId:this.activeName}).then(res=>{
                this.res=res.data.data;
                this.res.forEach(v=>{  
                    v.edit=false;
                });
                this.loading=false;
         }) 
         },
         
         addPrice(){
             var params={};
             params.edit=true;
             this.res.push(params);
         },
         save(val,index){
             if(val.price_id){
                 axion.updatePriceList({id:val.price_id,price:val.price}).then(res=>{
                 if(res.data.code="SUCCESS"){
                     this.$message({
                            type: "info",
                            message: res.data.data
                     });
                     
                 }else {
                     this.$message({
                            type: "info",
                            message: `价格修改失败！`
                     });
                 }
                this.edit(index);
             })
             }else {
                 val.priceTypeId=this.activeName;
                 axion.addPriceList(val).then(res=>{
                     if(res.data.code="SUCCESS"){
                     this.$message({
                            type: "info",
                            message: res.data.data
                     });
                     
                    }else {
                     this.$message({
                            type: "info",
                            message: `价格添加失败！`
                     });
                    }
                    this.selectPriceList();
                 })
                 

             }
             
         },
         edit(val){
             this.res[val].edit=!this.res[val].edit;
             this.res[val].positionName=this.res[val].positionName+" ";
         },
         deletePrice(index,val){
             axion.deletePriceConfig({id:val.price_id}).then(res=>{
                 if(res.data.code=="SUCCESS"){
                     this.res.splice(index,1);
                 }
                 this.$message({
                    type: "info",
                    message: res.data.data
                });
             })
         }

     }
    
}
</script>

<style>
i {
    cursor: pointer;
    font-size:13px;
}
.cell input {
    height: 30px;
}
.el-input__suffix {
    top: 5px !important;
}
</style>

