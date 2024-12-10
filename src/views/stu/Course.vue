<template>
  <div style="height: 80vh;">
    <h3>我的课程表</h3>
    <hr>
    <el-table :data="tasks" style="width: 90%; margin: 0 auto;" border>
      <el-table-column prop="user.uid" label="任课教师编号" width="150"></el-table-column>
      <el-table-column prop="user.uname" label="任课教师姓名" width="150"></el-table-column>
      <el-table-column prop="clz.clzno" label="所在班级编号" width="150"></el-table-column>
      <el-table-column prop="clz.clzname" label="所在班级名称" width="150"></el-table-column>
      <el-table-column prop="course.cno" label="课程编号" width="150"></el-table-column>
      <el-table-column prop="course.cname" label="课程名称" width="150"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { $get } from '@/ajax/index.js';

const tasks = ref([]);

const fetchCourses = () => {
  $get("/api/fore/stu/findMyCourse")
    .then((resp) => {
      console.log(resp.data.data);
      tasks.value = resp.data.data;
    })
    .catch((error) => {
      console.error("课程错误:", error);
    });
};

onMounted(() => {
  fetchCourses();
});
</script>

<style scoped>
</style>
