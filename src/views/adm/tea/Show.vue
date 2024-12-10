<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3>教师管理</h3>
      <el-button type="primary" @click="go2Add">添加新教师</el-button>
    </div>
    <el-divider />
    <el-table :data="teas" style="width: 100%">
      <el-table-column prop="uid" label="UID" width="180" />
      <el-table-column prop="uname" label="姓名" width="180" />
      <el-table-column prop="phone" label="电话" width="180" />
      <el-table-column label="头像" width="180">
        <template #default="scope">
          <el-image
            style="width: 4vw; height: 4vw"
            :src="`${imgurl}/api/public/showimg/${scope.row.pic}`"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="go2Update(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { $get } from '@/ajax/index.js';

const router = useRouter();
const teas = ref([]);
const imgurl = 'http://localhost:9000';

const del = (uid) => {
  $get(`/api/adm/tea/del/${uid}`)
    .then((resp) => {
      console.log(resp.data);
      teas.value = resp.data.data;
    });
};

const go2Add = () => {
  router.push({
    path: '/adm/addtea',
    query: {
      uid: 0,
    },
  });
};

const go2Update = (e) => {
  console.log(e);
  router.push({
    path: '/adm/addtea',
    query: {
      uid: e.uid,
    },
  });
};

onMounted(() => {
  $get('/api/adm/tea/findAll')
    .then((resp) => {
      console.log(resp.data);
      teas.value = resp.data.data;
    });
});
</script>

<style scoped>
</style>
