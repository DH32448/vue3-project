<template>
  <div style="height: 80vh; border: blue 1px solid">
    <h3>头像修改-教师学生同页面组件</h3>
    <hr>
    <div style="display: flex;">
      <!-- menu -->
      <div style="width: 25%; height: 100%; padding-left: 5%;">
        <h3>
          当前我的图片
        </h3>
        <el-image
          :src="`${imgurl}/api/public/showimg/${$store.state.pic}`"
          fit="cover"
          style="width: 10vw; height: 10vw; border: 2px solid gray;"
        />
      </div>
      <div style="width: 74%; height: 100%;">
        <h3>
          上传新的图片
        </h3>
        <el-upload
          action="/api/user/updatePic"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :show-file-list="false"
        >
          <el-button type="primary">更新我的图片</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const imgurl = ref("http://localhost:9000")

const handleSuccess = (response) => {
  store.state.pic = response.data.data + "pic" + (new Date().getMilliseconds());
  store.commit("show", response.data.msg)
}

const beforeUpload = (file) => {
  const formData = new FormData();
  formData.append("mypic", file);
  $postf("/api/user/updatePic", formData).then((resp) => {
    handleSuccess(resp)
  })
  return false;
}
</script>

<style scoped>
</style>
