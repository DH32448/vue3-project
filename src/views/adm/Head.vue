<template>
  <div style="height: 80vh; border: 1px solid blue">
    <h3>头像修改</h3>
    <hr>
    <div style="display: flex;">
      <!-- menu -->
      <div style="width: 25%; height: 100%;">
        <h3>当前我的图片</h3>
        <el-image
          :src="`${imgurl}/api/public/showimg/${pic}`"
          fit="cover"
          style="width: 10vw; height: 10vw;"
        ></el-image>
      </div>
      <div style="width: 74%; height: 100%;">
        <h3>上传新的图片</h3>
        <el-upload
          ref="upload"
          action="/api/user/updatePic"
          :auto-upload="false"
          :on-change="handleChange"
          :before-upload="beforeUpload"
          :http-request="uploadFile"
        >
          <template #trigger>
            <el-button slot="trigger" type="primary">选取文件</el-button>
          </template>
          <el-button type="success" @click="submitUpload">更新我的图片</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { $postf } from '@/ajax/index.js';

const store = useStore();
const imgurl = ref("http://localhost:9000");
const pic = computed(() => store.state.pic);
const upload = ref(null);

const handleChange = (file, fileList) => {
  if (fileList.length > 1) {
    fileList.shift();
  }
};

const beforeUpload = (file) => {
  const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPGorPNG) {
    ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
  }
  return isJPGorPNG && isLt2M;
};

const uploadFile = (options) => {
  const fd = new FormData();
  fd.append("mypic", options.file);
  $postf(options.action, fd).then((resp) => {
    store.commit("show", resp.data.msg);
    store.state.pic = resp.data.data + "?x=" + (new Date().getMilliseconds());
    ElMessage.success('图片更新成功!');
  }).catch((error) => {
    ElMessage.error('图片更新失败!');
  });
};

const submitUpload = () => {
  upload.value.submit();
};
</script>

<style scoped>
</style>
