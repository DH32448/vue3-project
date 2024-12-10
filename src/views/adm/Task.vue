<template>
  <div style="height: 80vh; border: 1px solid blue">
    <h3>教务处-教学安排</h3>
    <hr>
    <div style="display: flex; justify-content: space-between;">
      <div style="width: 67%; border: 1px solid red">
        <h3>已有的教学安排</h3>
        <el-table :data="tasks" style="width: 95%; margin: 0 auto;" border>
          <el-table-column prop="user.uid" label="任课教师编号" width="150"></el-table-column>
          <el-table-column prop="user.uname" label="任课教师姓名" width="150"></el-table-column>
          <el-table-column prop="clz.clzno" label="所在班级编号" width="150"></el-table-column>
          <el-table-column prop="clz.clzname" label="所在班级名称" width="150"></el-table-column>
          <el-table-column prop="course.cno" label="课程编号" width="150"></el-table-column>
          <el-table-column prop="course.cname" label="课程名称" width="150"></el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button type="danger" @click="del(scope.row.kid)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 32%; border: 1px solid blue">
        <h3>添加新的课程安排</h3>
        <el-form :model="formTask" label-width="80px">
          <el-form-item label="教师">
            <el-select v-model="formTask.user.uid" placeholder="请选择教师">
              <el-option v-for="tea in teas" :key="tea.uid" :label="tea.uname" :value="tea.uid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级">
            <el-select v-model="formTask.clz.clzno" placeholder="请选择班级">
              <el-option v-for="clz in clzs" :key="clz.clzno" :label="clz.clzname" :value="clz.clzno"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程">
            <el-select v-model="formTask.course.cno" placeholder="请选择课程">
              <el-option v-for="course in courses" :key="course.cno" :label="course.cname" :value="course.cno"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="add">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { $get, $postj } from '@/ajax/index.js';

const clzs = ref([]);
const courses = ref([]);
const teas = ref([]);
const formTask = ref({
  user: {},
  clz: {},
  course: {}
});
const tasks = ref([]);

const del = (kid) => {
  $get("/api/adm/task/del/" + kid).then((resp) => {
    console.log(resp.data);
    tasks.value = resp.data.data;
  });
};

const add = () => {
  $postj("/api/adm/task/add", formTask.value).then((resp) => {
    console.log(resp.data);
    tasks.value = resp.data.data;
  });
};

onMounted(() => {
  $get("/api/adm/task/findAll").then((resp) => {
    console.log(resp.data.data);
    tasks.value = resp.data.data;
  });

  $get("/api/public/getClzs").then((resp) => {
    console.log(resp.data.data);
    clzs.value = resp.data.data;
  });

  $get("/api/public/getCourses").then((resp) => {
    console.log(resp.data.data);
    courses.value = resp.data.data;
  });

  $get("/api/public/getTeachers").then((resp) => {
    console.log(resp.data.data);
    teas.value = resp.data.data;
  });
});
</script>

<style scoped>
</style>
