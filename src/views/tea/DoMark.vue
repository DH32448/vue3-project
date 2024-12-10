<template>
  <div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid green;">
      <h3>登分管理 - 批量登分</h3>
      <p>当前班级：{{ clz.clzno }}--{{ clz.clzname }} &nbsp;&nbsp; 当前课程：{{ course.cno }}-{{ course.cname }}</p>
      <el-button type="primary" @click="save">批量保存成绩....</el-button>
    </div>
    <el-table :data="markInfos" style="width: 98%; margin-top: 20px;">
      <el-table-column prop="sno" label="学号电话" width="180"></el-table-column>
      <el-table-column prop="user.uname" label="学生姓名" width="180"></el-table-column>
      <el-table-column prop="user.clz.clzname" label="班级名称" width="180"></el-table-column>
      <el-table-column prop="course.cname" label="课程名称" width="180"></el-table-column>
      <el-table-column label="分数" width="180">
        <template #default="scope">
          <el-input v-model="scope.row.score" placeholder="请输入分数"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { $get, $postj } from '@/ajax/index.js';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();

const clz = ref({});
const course = ref({});
const markInfos = ref([]);

const save = () => {
  let mks = markInfos.value.map(x => ({
    id: x.id,
    sno: x.sno,
    cno: x.course.cno,
    score: x.score
  }));
  console.log(mks);
  $postj("/api/fore/tea/addMark", mks)
    .then((resp) => {
      store.commit("show", "提交成绩成功");
    })
    .catch((error) => {
      console.error("等分错误:", error);
    });
};

onMounted(() => {
  clz.value.clzno = route.query.clzno;
  course.value.cno = route.query.cno;
  console.log("/api/fore/tea/findMark?clzno=" + clz.value.clzno + "&cno=" + course.value.cno);
  $get("/api/fore/tea/findMark", { clzno: clz.value.clzno, cno: course.value.cno })
    .then((resp) => {
      console.log(resp.data.data);
      markInfos.value = resp.data.data;
    })
    .catch((error) => {
      console.error("登分错误:", error);
    });
});
</script>

<style scoped>
</style>
