<template>
  <div style="height: 100%; display: flex; border: 1px solid blue">
    <!-- Menu -->
    <el-menu
      default-active="/stu/course"
      class="el-menu-vertical-demo"
      style="width: 20%; height: 100%; border-right: 1px solid #ebeef5"
      router
    >
      <div style="border-bottom: 2px solid darkkhaki; padding: 10px;">
        <h4>学生菜单</h4>
      </div>
      <el-menu-item index="/stu/pwd">
        <i class="el-icon-setting"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
      <el-menu-item index="/stu/head">
        <i class="el-icon-picture-outline-round"></i>
        <span slot="title">更改头像</span>
      </el-menu-item>
      <el-menu-item index="/stu/course">
        <i class="el-icon-document"></i>
        <span slot="title">我的课程</span>
      </el-menu-item>
      <el-menu-item index="/stu/mark">
        <i class="el-icon-star-off"></i>
        <span slot="title">我的分数</span>
      </el-menu-item>
    </el-menu>
    <div style="width: 78%; height: 100%; padding: 20px;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
</style>
