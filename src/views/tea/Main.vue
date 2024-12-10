<template>
  <div style="height: 100%; display: flex;">
    <!-- menu -->
    <el-menu default-active="/tea/pwd" class="el-menu-vertical-demo" style="width: 20%; height: 100%;">
      <el-menu-item index="/tea/pwd">
        <router-link to="/tea/pwd" active-class="active">修改密码</router-link>
      </el-menu-item>
      <el-menu-item index="/tea/head">
        <router-link to="/tea/head" active-class="active">更改头像</router-link>
      </el-menu-item>
      <el-menu-item index="/tea/mark">
        <router-link to="/tea/mark" active-class="active">登分管理</router-link>
      </el-menu-item>
    </el-menu>
    <div style="width: 78%; height: 100%;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.active {
  font-weight: bold;
  color: red;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
