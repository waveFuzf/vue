<template>
    <div>{{doctorId}}</div>
</template>

<script>
import axion from "@/util/http_url.js";
import { saveCookie, getCookie } from "@/util/cookie.js";

export default {
    data(){
        return {
            doctorId:'',
        }
    },
    mounted() {
        this.doctorId=this.$route.query.doctorId;
        this.getExpertInfoById();
    },
    methods:{
        getExpertInfoById(){
            axion.getExpertInfoById({doctorId:this.doctorId}).then(res=>{
                console.log(res);
            });
        },
    }
}
</script>

