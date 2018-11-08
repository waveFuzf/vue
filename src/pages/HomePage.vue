<template>
    <el-container>
        <img src="">
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">会议申请审核</template>
                    <el-menu-item index="2-1">未审核</el-menu-item>
                    <el-menu-item index="2-2">已审核</el-menu-item>
                    <el-menu-item index="2-3">审核统计</el-menu-item>
                </el-submenu>
                <el-menu-item index="3">数据统计</el-menu-item>
            </el-menu>
            <div class="userInfo">你好,{{username}}!   
            </div> 
            <el-button type="primary" size="mini" :v-on="exit()">退出</el-button>
            <!-- <div class="line"></div> -->
        </el-header>
        <el-container>
            <el-aside width="150px">Aside</el-aside>
            <el-container>
                <el-main>Main</el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data() {
      return {
        username:"fuzf",
        activeIndex: '1',
      };
    },
    methods: {
      exit(){
          alert("111")
      }
      
    }
  }
</script>
<style>
.el-header {
    line-height: 60px;
}
.el-menu-demo {
    width: (418-96)px;
    margin: 0 150px;
    float: left;
}
.userInfo {
    font-size: 14px;
    float: left;
}
.el-button {
    margin: 0 50px;
}
</style>
