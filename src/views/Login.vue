<template>
  <div>
    <!-- 登录 -->
    <div class="login-container">
      <el-card class="box-card">
        <h3 align="center">登录</h3>
        <el-form :model="user" label-width="80px" @submit.prevent="login">
          <el-form-item label="手机号">
            <el-input v-model="user.username" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="user.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">登录</el-button>
          </el-form-item>
        </el-form>
        <h4 class="error-message">{{ err }}</h4>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { $postx, $get } from '@/ajax/index.js';

const store = useStore();
const router = useRouter();
const user = ref({ username: '', password: '' });
const err = ref('');

const login = () => {
  $postx("/api/login", user.value).then((resp) => {
    console.log(resp.data);
    store.commit("show", resp.data.msg);
    console.log("token=" + resp.data.data.token);
    window.localStorage.setItem("token", resp.data.data.token);

    // 获取用户信息
    $get("/api/user/info").then((resp) => {
      console.log(resp.data);
      window.localStorage.setItem("role", resp.data.data.role);
      window.localStorage.setItem("name", resp.data.data.uname);
      window.localStorage.setItem("pic", resp.data.data.pic);
      store.state.name = resp.data.data.uname;
      store.state.pic = resp.data.data.pic;

      if (resp.data.data.role == 'adm') {
        store.state.roleName = "管理员";
        router.push("/adm");
      } else if (resp.data.data.role == 'tea') {
        store.state.roleName = "教师";
        router.push("/tea");
      } else if (resp.data.data.role == 'stu') {
        store.state.roleName = "学生";
        router.push("/stu");
      }

      window.localStorage.setItem("roleName", store.state.roleName);
    }).catch((error) => {
      console.error("获取用户失败:", error);
      err.value = "获取用户失败";
    });
  }).catch((error) => {
    console.error("登录失败:", error);
    err.value = "登录失败，账号或密码错误";
  });
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.box-card {
  width: 40%;
  min-height: 300px;
}

.error-message {
  color: red;
  text-align: center;
}
</style>
