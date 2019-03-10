<template>
    <div>
        <div style="margin:10px auto;text-align:center;font-size:24px;font-weight:bold;">{{consultDetail.doctors[1].hospitalName}}</div>
        <div style="margin:10px auto;text-align:center;font-size:16px;">远程病理诊断咨询报告单</div>
        <div style="position:relative;float:right;margin-top:-30px;margin-right:20px;">
            会诊编号：{{consultDetail.consultNo}}
        </div>
        <div style="border:1px solid #ebebeb;margin:0 auto;"></div>
        <el-row>
            <el-col :span="8">
                     <el-form label-width="120px">
                          <el-form-item label="患者姓名">
                                {{consultDetail.consultPatient.patientName}}
                          </el-form-item>
                          <el-form-item label="门诊号/住院号">
                                {{consultDetail.consultPatient.mzNum}}
                          </el-form-item>
                          <el-form-item label="申请医生">
                                {{consultDetail.doctors[0].doctorName}}
                          </el-form-item>
                     </el-form>
            </el-col>
            <el-col :span="8">
                     <el-form label-width="120px">
                          <el-form-item label="性别">
                                 {{consultDetail.consultPatient.sex}}
                          </el-form-item>
                          <el-form-item label="原病理号">
                                 {{consultDetail.consultPatient.mzNum}}
                          </el-form-item>
                          <el-form-item label="申请科室">
                                 {{consultDetail.doctors[1].doctorDepartment}}
                          </el-form-item>
                     </el-form>
            </el-col>
            <el-col :span="8">
                     <el-form label-width="120px">
                          <el-form-item label="年龄">
                                {{consultDetail.consultPatient.age}}
                          </el-form-item>
                          <el-form-item label="部位">
                                {{consultDetail.parts}}
                          </el-form-item>
                          <el-form-item label="申请医院">
                                {{consultDetail.doctors[1].hospitalName}}
                          </el-form-item>
                     </el-form>
            </el-col>
        </el-row>
        <i class="el-icon-document" style="margin-left:20px;">显微图片</i>
        <div style="border:1px solid #ebebeb;margin:5px auto;"></div>
        <el-row>
              <img style="width:40%;margin:20px 4.8%;" src="../assets/img/default.jpg">
              <img style="width:40%;margin:20px 4.8%;" src="../assets/img/default.jpg">
        </el-row>

        <i class="el-icon-document" style="margin-left:20px;">会诊意见</i>
        <div style="border:1px solid #ebebeb;margin:5px auto;"></div>
        <el-row>
            <el-form label-width="120px">
                  <el-form-item label="镜下所见" v-if="consultDetail.consultStatus==4">
                        {{form.mirrorView}}
                  </el-form-item>
                  <el-form-item label="专家意见" v-if="consultDetail.consultStatus==4">
                        {{form.diagnose}}
                  </el-form-item>
                  <el-form-item label="结果判定" v-if="consultDetail.consultStatus==9">
                        {{bcjcForm.ultimateJudgement}}
                  </el-form-item>
                  <el-form-item label="补充意见" v-if="consultDetail.consultStatus==9">
                        {{bcjcForm.supplymentaryOpinion}}
                  </el-form-item>
                  <el-form-item label="会诊专家" style="float:left;">
                                {{consultDetail.doctors[1].doctorName}}
                  </el-form-item>
                  <el-form-item label="报告日期" style="float:right;margin-right:20px;">
                                {{getDate(date)}}
                  </el-form-item>
            </el-form>
        </el-row>
        <div style="border:1px solid #ebebeb;margin:5px auto;"></div>
        <div style="margin:10px auto;width:90%;font-size:12px;"><i class="el-icon-info"></i>注：本报告仅对送检数字切片负责，此会诊结果仅供临床医生或提供送检切片单位的病理医师
              参考，如临床医生或病理医师对本报告有疑问，请及时与会诊专家联系！
        </div>

    </div>
    
</template>
<script>
export default {
      data(){
            return{
                  date:new Date(),
            }
      },
      methods:{
            getDate(time){
                  return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+(time.getDate()+1);
            }
      },
      props:["consultDetail","form","bcjcForm"]
    
}
</script>
<style>
.el-form-item{
    margin-bottom:0px;
}

</style>


