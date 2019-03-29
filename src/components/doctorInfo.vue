<template>
    <router-link :to="'expertInfo?doctorId=' + doctorInfo.userId">
    <div class="floatLeft board" id="emmm" style="width:20%;margin-left:2.5%;height:150px;">
        <img class="floatLeft" v-if="doctorInfo.photo!=null" :src="doctorInfo.photo" alt="头像">
        <img class="floatLeft" v-else src="../assets/img/default.jpg" alt="头像">
        <div style="margin-top:20px;color:#333;font-size:12px;">
            <span style="color:#2f7ce1;">&nbsp;&nbsp;{{doctorInfo.name}}&nbsp;&nbsp;</span>
            <span>{{doctorInfo.position}}</span><br><br>
            <span>&nbsp;&nbsp;{{doctorInfo.hospitalName}}</span><br><br>
            <span>&nbsp;&nbsp;个人介绍：{{doctorInfo.description?doctorInfo.description:"暂无信息"}}</span></div>
    </div></router-link>
</template>

<script>
import "@/assets/css/default.css";
export default {
  data() {
    return {
      
    };
  },
  props: ["doctorInfo"],
  mounted() {},
  methods: {
    
  }
};
</script>

<style scoped>
img { 
    float: left;
    width: 100px;
    height: 100px;
    margin: 8px 0;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    -ms-border-radius: 100px;
    -o-border-radius: 100px;
    border-radius: 100px;
}
.board:hover {
    /* border:1px solid black; */
    box-shadow: 1px 1px 1px 1px #aaa;
}
</style>

