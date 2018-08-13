<template>
  <div>
    <input type="file" name="file" @change="uploads">
    <p></p>
    <img :src="imgUrl">
  </div>
</template>
<script>
import axion from "@/util/http_url.js";
import axios from "axios";
export default {
  data() {
    return {
      imgUrl: ""
    };
  },
  methods: {
    uploads(e) {
      const file = e.target.files[0]; //获取到当前文件对象
      console.log(file);

      this.imgUrl = URL.createObjectURL(file); // 这是为了显示图片而已， 与上传没有关系（可选）

      // 传递一个 FormData 对象 即可
      let formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      // let config = {
      //   baseURL: 'http://127.0.0.1:8080',
      //   headers: {
      //     "Content-Type": "multipart/form-data" 
      //   }
      // };
      // axios.post('/file/upload', formData, config);
      axion.uploadPic(formData);

    }
  }
};
</script>
