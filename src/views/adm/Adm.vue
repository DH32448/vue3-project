<template>
  <el-container style="height: 80vh; border: 1px solid blue;">
    <!-- Menu -->
    <el-aside width="20%">
      <el-menu default-active="/adm/clz" router>
        <el-menu-item index="/adm/clz">
          <span slot="title">班级管理</span>
        </el-menu-item>
        <el-menu-item index="/adm/course">
          <span slot="title">课程管理</span>
        </el-menu-item>
        <el-menu-item index="/adm/tea">
          <span slot="title">教师管理</span>
        </el-menu-item>
        <el-menu-item index="/adm/stu">
          <span slot="title">学生管理</span>
        </el-menu-item>
        <el-menu-item index="/adm/task">
          <span slot="title">教学安排</span>
        </el-menu-item>
        <el-menu-item index="/adm/head">
          <span slot="title">更新头像</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup>
</script>

<style scoped>
.el-menu-item.is-active {
  background-color: lightblue !important;
}
</style>
