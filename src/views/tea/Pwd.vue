<template>
  <div style="height: 80vh; border: blue 1px solid">
    <el-card shadow="always">
      <h3>密码修改-教师学生同页面组件</h3>
      <el-form :model="form" label-width="120px">
        <el-form-item label="旧密码">
          <el-input v-model="form.oldPwd" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码第一次">
          <el-input v-model="form.newPwd1" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码第二次">
          <el-input v-model="form.newPwd2" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update">确认修改密码</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const form = ref({
  oldPwd: '',
  newPwd1: '',
  newPwd2: ''
});

const update = () => {
  if (form.value.newPwd1 !== form.value.newPwd2) {
    store.commit("show", "两次新密码不一致");
    return;
  }
  let objPwd = { oldPwd: form.value.oldPwd, newPwd: form.value.newPwd1 };
  console.log(objPwd);
  this.$postx("/api/user/updatePwd", objPwd).then((resp) => {
    store.commit("show", resp.data.msg);
  });
};
</script>

<style scoped>

</style>
