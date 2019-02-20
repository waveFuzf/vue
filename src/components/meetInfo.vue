<template>
  <div style="height:80px;width:100%;">
    <div class="floatLeft" style="background-color:#83a2cc;width:60px;height:60px;color:white;padding-top:10px;">
        <span style="font-size:24px;text-align:center;display:block">{{getDate(meetInfo.beginTime)}}</span>
        <span style="font-size:16px;text-align:center;display:block">{{getDay(meetInfo.beginTime)}}</span>
    </div>
    <span style="margin-left:10px;">{{meetInfo.theme}}</span><br><br>
    <span style="margin-left:10px;color:#666666;font-size:14px;">{{getTime(meetInfo)}}&nbsp;&nbsp;{{meetInfo.roomName}}</span>
  </div>
</template>

<script>
import "@/assets/css/default.css";
export default {
  data() {
    return {
      days:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
    };
  },
  props: ["meetInfo"],
  mounted() {},
  methods: {
    getDate(val) {
      var date = new Date(val);
      return date.getDate();
    },
    getDay(val) {
      var date = new Date(val);
      return this.days[date.getDay()];   
    },
    getTime(val) {
        var begindate = new Date(val.beginTime);
        var enddate   = new Date(val.endTime);
        return begindate.getHours() + ":" + begindate.getMinutes() + "~" + enddate.getHours() + ":" + enddate.getMinutes();
        
    }
  }
};
</script>
