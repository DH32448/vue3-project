<template>
  <div style="height: 80vh; border: blue 1px solid">
    <h3>登分管理</h3>
    <hr>
    <el-table :data="tasks" style="width: 90%">
      <el-table-column prop="clz.clzno" label="班级编号" width="180"></el-table-column>
      <el-table-column prop="clz.clzname" label="班级名称" width="180"></el-table-column>
      <el-table-column prop="course.cno" label="课程号" width="180"></el-table-column>
      <el-table-column prop="course.cname" label="课程名称" width="180"></el-table-column>
      <el-table-column label="请选择" width="200">
        <template #default="scope">
          <el-button type="primary" @click="go2Add(scope.row.clz.clzno, scope.row.course.cno)">
            班级学生登分/修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { $get } from '@/ajax/index.js';

const tasks = ref([]);

const router = useRouter();

const go2Add = (clzno, cno) => {
  console.log("go2Add=clzno" + clzno + "   cno=" + cno);
  router.push({
    path: '/tea/domark',
    query: {
      clzno: clzno,
      cno: cno
    }
  });
};

onMounted(() => {
  $get("/api/fore/tea/findMyTask")
    .then((resp) => {
      console.log(resp.data.data);
      tasks.value = resp.data.data;
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
});
</script>

<style scoped>
</style>
