<template>
  <div style="height: 80vh;">
    <h3>我的分数表</h3>
    <hr>
    <el-table :data="marks" style="width: 90%; margin-top: 20px;">
      <el-table-column prop="user.uid" label="学生编号" width="120"></el-table-column>
      <el-table-column prop="user.uname" label="学生姓名" width="120"></el-table-column>
      <el-table-column prop="user.clz.clzno" label="班级编号" width="120"></el-table-column>
      <el-table-column prop="user.clz.clzname" label="班级名称" width="120"></el-table-column>
      <el-table-column prop="course.cno" label="课程编号" width="120"></el-table-column>
      <el-table-column prop="course.cname" label="课程名称" width="120"></el-table-column>
      <el-table-column label="课程成绩" width="120">
        <template #default="scope">
          <span style="font-weight: 700;">{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="录入时间" width="150">
        <template #default="scope">
          {{ formatDate(scope.row.tpost, 'yyyy-M-d') }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { $get } from '@/ajax/index.js';
import { ElTable, ElTableColumn } from 'element-plus';

const marks = ref([]);
//日期
const formatDate = (value, args) => {
  var dt = new Date(value);
  if (args === 'yyyy-M-d') {
    let year = dt.getFullYear();
    let month = dt.getMonth() + 1;
    let date = dt.getDate();
    return `${year}-${month}-${date}`;
  }
  return value;
};

onMounted(() => {
  $get("/api/fore/stu/findMyMark")
    .then((resp) => {
      console.log(resp.data.data);
      marks.value = resp.data.data;
    })
    .catch((error) => {
      console.error("Error fetching marks:", error);
    });
});
</script>

<style scoped>
</style>
